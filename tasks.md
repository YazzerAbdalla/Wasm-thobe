# Phase 0 Tasks — Thobe Platform Frontend

> **Sprint goal:** Implement core Thobe Builder functionality and essential user authentication to enable the primary use case of customizing and ordering thobes.

---

## Progress Tracker

| Section | Tasks | Status |
|---|---|---|
| 2. Thobe Builder Feature | 5 tasks | `[ ] [ ] [ ] [ ] [ ]` |
| 3. Order Creation & Summary | 2 tasks | `[ ] [ ]` |
| 4. Chatbot Integration *(optional)* | 2 tasks | `[ ] [ ]` |

**Total: 9 tasks — 7 required, 2 optional**

---

## Current Implementation Summary

- **App structure:** React + `react-router-dom` for navigation
- **Pages:** Home, Story, Contact, Track — routed with basic content
- **Global components:** `LuxuryHeader` consistently displayed
- **UI primitives:** `Button`, `SectionTitle`, `useIsMobile` hook available
- **Styling:** Tailwind CSS configured

---



---

## Section 2 — Thobe Builder Feature

### Task 2.1 — Create Thobe Builder Route & Page
- [ ] Add `/builder` route in `App.tsx`
- [ ] Create `Builder.tsx` page component with layout scaffold
- [ ] Add CTA button on Home page linking to `/builder`
- [ ] Add builder link in `LuxuryHeader` nav

**Route:** `/builder`
**Component:** `src/features/builder/Builder.tsx`

---

### Task 2.2 — Implement Multi-Step Wizard Structure
- [ ] Build step container with progress indicator (Step 1 of 4 etc.)
- [ ] Implement step components: `ColorStep`, `FabricStep`, `AccessoriesStep`, `ReviewStep`
- [ ] Manage wizard state with Zustand store (`useBuilderStore`)
- [ ] Add back/next navigation with validation before advancing
- [ ] Animate step transitions with Framer Motion

**Store:** `src/features/builder/builderStore.ts`
**Steps:** Color → Fabric → Accessories → Review

---

### Task 2.3 — Fetch Customization Options
- [ ] Call `GET /customization/options` on builder mount
- [ ] Store colors, fabrics, and accessories in Zustand or local state
- [ ] Show skeleton loaders while fetching
- [ ] Handle fetch error with retry button

**Endpoint:** `GET /customization/options`
**Returns:** `{ colors: [], fabrics: [], accessories: [] }`

---

### Task 2.4 — Implement Live SVG Preview
- [ ] Create `ThobePreview.tsx` component with SVG illustration
- [ ] Define CSS custom properties: `--thobe-color`, `--thobe-texture`
- [ ] On color selection → update `--thobe-color` on the SVG element
- [ ] On fabric selection → apply texture class (e.g. `.fabric-wool`, `.fabric-linen`)
- [ ] Preview updates must be instant — no PNG swapping, no server calls

**Component:** `src/features/builder/ThobePreview.tsx`
**Pattern:**
```css
.thobe-body { fill: var(--thobe-color, #ffffff); }
.thobe-body.fabric-wool { /* wool texture pattern */ }
```

---

### Task 2.5 — Integrate Smart Recommendation Engine
- [ ] After fabric selection, call `POST /customization` with current selections
- [ ] Display returned `recommendation_label` as an animated badge
- [ ] Handle no-match case gracefully (show neutral label)
- [ ] Update badge when user changes fabric or color

**Endpoint:** `POST /customization`
**Returns:** `{ id, recommendation_label }` e.g. `"Royal Classic"`
**Component:** `src/features/builder/RecommendationBadge.tsx`
**Auth:** Public

---

## Section 3 — Order Creation & Summary

### Task 3.1 — Create Order Summary Component
- [ ] Display selected color (with hex swatch), fabric name, and accessories list
- [ ] Show itemized price breakdown:
  - Base price
  - Fabric multiplier (e.g. +20% for Premium Wool)
  - Accessory extras (line items)
  - **Total**
- [ ] Show thobe SVG preview thumbnail

**Component:** `src/features/orders/OrderSummary.tsx`

---

### Task 3.2 — Implement Order Confirmation
- [ ] Add "Confirm Order" button in the Review step
- [ ] Call `POST /orders` with `customization_id` and calculated `total_price`
- [ ] Show loading spinner on button during request
- [ ] Surface API errors as toast notifications (not inline)
- [ ] On success → navigate to order success screen

**Endpoint:** `POST /orders`
**Body:** `{ customization_id, total_price }`
**Auth:** Public

---

### Task 3.3 — Display Order ID & Success Screen
- [ ] Create order success screen component
- [ ] Display generated Order ID prominently (copyable)
- [ ] Show summary of what was ordered

- [ ] Add "Customize another" CTA back to builder

**Route:** `/orders/success/:orderId`
**Component:** `src/features/orders/OrderSuccess.tsx`

---

## Section 4 — Chatbot Integration *(optional — implement if time permits)*

### Task 4.1 — Create Chatbot UI Component
- [ ] Build floating chat button (bottom-right corner)
- [ ] Chat panel opens on click with message history area
- [ ] Distinguish user messages (right-aligned) from bot (left-aligned)
- [ ] Text input + send button at the bottom
- [ ] "Talk to Human" button → redirect to `https://wa.me/<number>`

**Component:** `src/features/chat/ChatWidget.tsx`

---

### Task 4.2 — Integrate with Claude API via Backend
- [ ] On send, call `POST /chat/message` with message + full conversation history
- [ ] Conversation history sent per-request (backend is stateless)
- [ ] Show typing indicator while waiting for response
- [ ] Handle API errors without crashing the chat UI
- [ ] Scope chatbot context to Thobe platform (system prompt handled by backend)

**Endpoint:** `POST /chat/message`
**Body:** `{ message: string, history: { role, content }[] }`

---

## Definition of Done

A task is complete when:

1. Feature works correctly against the running backend
2. Loading and error states are handled (no blank screens or silent failures)
3. Component is typed (no `any` in TypeScript)
4. Responsive on mobile (`useIsMobile` hook or Tailwind breakpoints)
5. Code committed on a feature branch with a descriptive name (e.g. `feat/auth-login-page`)

---

## File Structure Reference

```
src/
├── features/
│   ├── auth/
│   │   └── AuthContext.tsx        # (Admin Auth Context - potentially for admin frontend only)
│   ├── builder/
│   │   ├── Builder.tsx            # Task 2.1
│   │   ├── builderStore.ts        # Task 2.2
│   │   ├── steps/
│   │   │   ├── ColorStep.tsx
│   │   │   ├── FabricStep.tsx
│   │   │   ├── AccessoriesStep.tsx
│   │   │   └── ReviewStep.tsx
│   │   ├── ThobePreview.tsx       # Task 2.4
│   │   └── RecommendationBadge.tsx # Task 2.5
│   ├── orders/
│   │   ├── OrderSummary.tsx       # Task 3.1
│   │   └── OrderSuccess.tsx       # Task 3.3
│   └── chat/
│       └── ChatWidget.tsx         # Task 4.1 + 4.2
├── components/
│   └── ProtectedRoute.tsx         # (For admin routes only)
└── services/
    └── api.ts                     # Shared Axios instance + interceptors
```

---

## API Endpoints Summary

| Task | Method | Endpoint | Auth |
|---|---|---|---|
| 2.3 | `GET` | `/customization/options` | Public |
| 2.5 | `POST` | `/customization` | Public |
| 3.2 | `POST` | `/orders` | Public |
| 4.2 | `POST` | `/chat/message` | Public |