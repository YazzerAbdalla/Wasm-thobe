# AGENTS.md — Frontend (`apps/frontend/`)

> Sub-context for the Next.js frontend. Loaded automatically when Gemini accesses any file under `apps/frontend/`.
> Root context is at the repo root `AGENTS.md`.

---

## Directory Rule

**You are in `apps/frontend/`. All commands below are relative to this directory.**
**Never run a command without confirming the terminal is here first.**

```bash
pwd   # must return .../apps/frontend
```

---

## Framework: Next.js 14 (App Router) + React + TypeScript

- Next.js 14 with App Router (`src/app/` directory)
- React 18+
- TypeScript strict mode
- Tailwind CSS for all styling
- Framer Motion for animations
- Zustand for global state
- Axios for HTTP (with JWT interceptor)

---

## Folder Structure

```
apps/frontend/src/
├── app/                        ← Next.js App Router pages and layouts
│   ├── layout.tsx              ← Root layout (LuxuryHeader, AuthProvider)
│   ├── page.tsx                ← Home page
│   ├── builder/page.tsx        ← Thobe Builder
│   ├── orders/
│   │   ├── page.tsx            ← Order history
│   │   └── success/[id]/page.tsx
│   └── x-admin/
│       └── page.tsx            ← Admin dashboard (admin role only)
├── components/                 ← Shared UI primitives
│   ├── Button.tsx
│   ├── SectionTitle.tsx
│   ├── LuxuryHeader.tsx
│   └── ProtectedRoute.tsx
├── features/                   ← Feature-sliced modules
│   ├── auth/
│   │   ├── AuthContext.tsx
│   │   ├── LoginForm.tsx
│   │   └── RegisterForm.tsx
│   ├── builder/
│   │   ├── builderStore.ts     ← Zustand store
│   │   ├── steps/
│   │   │   ├── ColorStep.tsx
│   │   │   ├── FabricStep.tsx
│   │   │   ├── AccessoriesStep.tsx
│   │   │   └── ReviewStep.tsx
│   │   ├── ThobePreview.tsx    ← CSS-driven SVG preview
│   │   └── RecommendationBadge.tsx
│   ├── orders/
│   │   ├── OrderSummary.tsx
│   │   └── OrderSuccess.tsx
│   └── chat/
│       └── ChatWidget.tsx
├── hooks/
│   ├── useIsMobile.ts
│   ├── useAuth.ts
│   └── useBuilderStore.ts
└── services/
    ├── api.ts                  ← Axios instance with JWT interceptor
    ├── auth.service.ts
    ├── customization.service.ts
    ├── orders.service.ts
    └── chat.service.ts
```

---

## Coding Rules

### Components

- Functional components only — no class components
- One component per file
- Always export as default
- All props must be typed with an `interface` (prefix with `I` for non-trivial shapes)
- Never use inline styles — Tailwind classes only
- Keep components under ~150 lines — extract sub-components when needed

```typescript
interface IColorStepProps {
  readonly colors: IColor[];
  readonly selectedColorId: string | null;
  readonly onSelect: (colorId: string) => void;
}

export default function ColorStep({ colors, selectedColorId, onSelect }: IColorStepProps) {}
```

### API calls

- All API calls go through `services/api.ts` (Axios instance) — never use `fetch` directly
- Services are plain TypeScript modules (not classes)
- Always type the response

```typescript
// services/orders.service.ts
export async function createOrder(dto: ICreateOrderDto): Promise<IOrder> {
  const { data } = await api.post<IOrder>('/orders', dto);
  return data;
}
```

### State management

- Component-local state: `useState`
- Shared builder state: Zustand (`builderStore.ts`)
- Auth state: React Context (`AuthContext.tsx`)
- Never put server data in Zustand — use component state or React Query if needed

---

## Auth Context Pattern (Primarily for Admin or to be removed if no frontend auth)

```typescript
interface IAuthContext {
  user: IUser | null;
  accessToken: string | null;
  login: (dto: ILoginDto) => Promise<void>; // Admin login
  logout: () => void; // Admin logout
  isAuthenticated: boolean; // Checks admin authentication status
}
```

- Access token stored in memory (not localStorage) for security
- Refresh token stored in `localStorage` (or `httpOnly` cookie if server supports it)
- Axios interceptor automatically refreshes token on 401 response

---

## Thobe SVG Preview — CSS Custom Properties Pattern

The SVG preview updates purely via CSS custom properties — no server calls, no PNG swapping.

```tsx
// ThobePreview.tsx
<svg
  style={{
    '--thobe-color': selectedColor?.hexCode ?? '#FFFFFF',
  } as React.CSSProperties}
  className={`thobe-svg ${selectedFabric?.textureClass ?? ''}`}
>
  {/* SVG paths */}
</svg>
```

```css
/* thobe.css */
.thobe-body {
  fill: var(--thobe-color, #ffffff);
}
.thobe-svg.fabric-wool .thobe-body {
  /* wool texture pattern */
}
.thobe-svg.fabric-linen .thobe-body {
  /* linen texture */
}
```

When adding a new color or fabric, only the CSS needs updating — no component logic changes.

---

## Protected Routes

Wrap any page that requires admin auth in `ProtectedRoute`. For admin pages, pass `requiredRole="admin"`.

```tsx
// app/x-admin/page.tsx (example)
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminDashboard from '@/features/admin/AdminDashboard'; // Assuming such a component exists

export default function Page() {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminDashboard />
    </ProtectedRoute>
  );
}
```

`ProtectedRoute` redirects unauthenticated users (who are trying to access admin pages) to the admin login page and restores the redirect on successful login.

---

## Testing: Playwright E2E

- Test files live in `tests/` directory
- File naming: `<feature>.spec.ts`
- Cover the critical happy path and the most common failure case per feature

```typescript
// tests/builder.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Thobe Builder', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate directly to builder as a guest
    await page.goto('/builder');
  });

  test('should complete full customization flow as a guest', async ({ page }) => {
    // Step 1: select a color
    await page.click('[data-testid="color-black"]');
    await page.click('[data-testid="next-step"]');

    // Step 2: select a fabric
    await page.click('[data-testid="fabric-premium-wool"]');
    await expect(page.locator('[data-testid="recommendation-badge"]'))
      .toContainText('Royal Classic');
    await page.click('[data-testid="next-step"]');

    // Step 3: skip accessories
    await page.click('[data-testid="next-step"]');

    // Step 4: confirm order
    await page.click('[data-testid="confirm-order"]');
    await expect(page.locator('[data-testid="order-id"]')).toBeVisible();
  });
});
```

### Test commands

```bash
cd apps/frontend

npx playwright test           # run all E2E tests headless
npx playwright test --ui      # Playwright interactive mode
npx playwright test --headed  # watch browser during run
npx playwright show-report    # open last HTML report
```

---

## Accessibility

- All interactive elements must have `aria-label` or visible text
- Use semantic HTML: `<button>`, `<nav>`, `<main>`, `<section>`, `<article>`
- Form inputs must have associated `<label>` elements
- Tab order must be logical — do not use `tabIndex > 0`
- Color contrast must meet WCAG AA

---

## Performance Rules

- Use `next/image` for all images — never bare `<img>` tags
- Lazy-load feature modules with `dynamic(() => import(...))` where appropriate
- Memoize expensive computations with `useMemo`
- Memoize stable callback references with `useCallback`
- SVG preview color updates must not trigger component re-renders — use CSS variables on a `ref`

---

## Commands Reference

```bash
# Always cd first
cd apps/frontend

npm run dev          # development server (port 3000, hot reload)
npm run build        # production build
npm run start        # serve production build
npm run lint         # ESLint check
npm run type-check   # TypeScript check without emitting

npx playwright test                  # E2E tests
npx playwright test --ui             # interactive mode
npx playwright codegen localhost:3000 # record new tests
```

---

## What to Avoid

- Inline styles (`style={{ }}`) — use Tailwind classes
- Business logic inside components — move to services or hooks
- `fetch` directly — always use the `api.ts` Axios instance
- `any` type — use generics or proper interfaces
- `localStorage` for access tokens — keep in memory
- Running commands without `cd apps/frontend` first
- Installing UI component libraries (shadcn, MUI, etc.) — build from Tailwind primitives