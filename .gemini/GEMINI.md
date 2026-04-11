# GEMINI.md — Thobe Platform

> This file is the root context for Gemini CLI. It is automatically loaded with every prompt.
> Sub-context files live in `apps/backend/GEMINI.md` and `apps/frontend/GEMINI.md`.
> Run `/memory reload` after editing any GEMINI.md file.

---

## Project Overview

**Thobe Platform** is a premium full-stack web application for customizing and ordering traditional Saudi thobes online. Users configure a thobe (color, fabric, accessories) through an interactive multi-step builder with a live CSS-driven SVG preview, receive AI-powered style recommendations, and place orders as guests. An admin dashboard manages order status and exports data, requiring administrator login.

This is a **portfolio project** — code quality, architecture clarity, and documentation matter as much as functionality.

---

## Monorepo Structure

```
thobe-platform/              ← repo root (you are here)
├── GEMINI.md                ← this file (root context)
├── README.md
├── docs/
│   ├── ERD_Thobe_Platform_v2.docx
│   ├── Implementation_Plan_Thobe_v2.docx
│   ├── PRD_Thobe_Platform_v2.docx
│   └── phase0-tasks.md
└── apps/
    ├── frontend/            ← Next.js 14 React app
    │   └── GEMINI.md        ← frontend sub-context
    └── backend/             ← NestJS API
        └── GEMINI.md        ← backend sub-context
```

---

## CRITICAL — Terminal Directory Rule

**Before running ANY command, you must confirm you are in the correct directory.**

| Task | Required directory |
|---|---|
| Install frontend deps, run dev server, run frontend tests | `apps/frontend/` |
| Install backend deps, run API, run backend tests | `apps/backend/` |
| Root-level scripts (e.g. lint all) | repo root |

**Always prepend a `cd` to every shell command you suggest or execute.**

```bash
# CORRECT
cd apps/backend && npm run test

# WRONG — never run bare commands without cd
npm run test
```

If you are unsure of the current directory, run `pwd` first. Never assume the terminal is already in the right place.

---

## Tech Stack

### Frontend — `apps/frontend/`

| Concern | Tool |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| State | Zustand |
| HTTP client | Axios (with interceptors for JWT refresh) |
| Testing | Playwright (E2E) |

### Backend — `apps/backend/`

| Concern | Tool |
|---|---|
| Framework | NestJS (modular, feature-based) |
| Language | TypeScript (strict mode) |
| ORM | TypeORM |
| Database | PostgreSQL via Supabase |
| Auth | JWT — access token (15 min) + refresh token (7 days) |
| Validation | `class-validator` + global `ValidationPipe` |
| Documentation | Compodoc + JSDoc |
| Testing | Jest (unit) + Supertest (E2E) |
| AI | Anthropic Claude API (`claude-haiku` model) |

---

## Architecture

```
Next.js (Vercel)
     │
     │  REST over HTTPS
     ▼
NestJS (Render)
     │
     ├── Auth Module         JWT access + refresh tokens, role guards (primarily for admin authentication)
     ├── Users Module        User entity, profile (primarily for admin management)
     ├── Customization Module Colors, fabrics, accessories, recommendation engine
     ├── Orders Module       Order CRUD, status transitions (supports guest orders)
     ├── Chat Module         Claude API proxy, stateless conversation
     ├── Analytics Module    Aggregated usage queries
     └── Admin Module        Protected dashboard endpoints
     │
     ▼
PostgreSQL (Supabase)
```

---

## Coding Standards — Apply to ALL Code

### TypeScript

- Always use `strict: true` — no implicit `any`, no untyped returns
- Prefer `interface` over `type` for object shapes
- Prefix interfaces with `I` (e.g. `IUserService`, `IOrderRepository`)
- Use `readonly` on DTO properties that must not be mutated
- Never use `as any` — use proper type narrowing or generics
- Use `===` and `!==` always (never `==` or `!=`)
- `async/await` everywhere — never raw `.then()` chains
- 2 spaces for indentation
- Single quotes for strings
- Trailing commas on all multi-line structures

### Naming

| Thing | Convention | Example |
|---|---|---|
| Files | kebab-case | `order-summary.service.ts` |
| Classes | PascalCase | `OrderSummaryService` |
| Interfaces | `I` + PascalCase | `IOrderSummaryService` |
| Methods / variables | camelCase | `getOrderById` |
| Constants | SCREAMING_SNAKE | `MAX_RETRY_COUNT` |
| Database columns | snake_case | `created_at`, `user_id` |
| Enums | PascalCase values | `OrderStatus.PENDING` |

### General

- No magic numbers — extract to named constants
- No commented-out code committed to the repo
- Keep functions focused — single responsibility
- Maximum function length: ~30 lines. If longer, extract helpers
- Handle all errors explicitly — no silent `catch` blocks
- All environment secrets in `.env` — never hardcode

---

## JSDoc Standards — Backend (NestJS)

**Every file in `apps/backend/src/` must have a file-level JSDoc comment at the top.**
**Every class method (service, controller, guard, pipe) must have a JSDoc comment.**

### File-level comment (top of every `.ts` file in backend)

```typescript
/**
 * @file order.service.ts
 * @module OrdersModule
 * @description Service layer for order creation, retrieval, and status management.
 *              Handles business logic and interacts with the TypeORM Order repository.
 * @author Thobe Platform
 */
```

### Class-level comment

```typescript
/**
 * Service responsible for all order-related business logic.
 * Communicates with {@link OrderRepository} and {@link CustomizationService}.
 *
 * @class OrderService
 * @injectable
 */
@Injectable()
export class OrderService {}
```

### Method-level comment

```typescript
/**
 * Creates a new order for the given user and customization.
 * Calculates the total price by summing base price, fabric multiplier, and accessory extras.
 *
 * @param {string} userId - UUID of the authenticated user (nullable for guest checkout)
 * @param {CreateOrderDto} dto - Validated order creation payload
 * @returns {Promise<Order>} The persisted Order entity with generated ID
 * @throws {NotFoundException} If the customization_id does not exist
 * @throws {BadRequestException} If total_price calculation results in a non-positive value
 */
async createOrder(userId: string | null, dto: CreateOrderDto): Promise<Order> {}
```

### Required JSDoc tags

| Tag | When to use |
|---|---|
| `@file` | Top of every file |
| `@module` | Top of every file — NestJS module name |
| `@description` | Top of every file and every class |
| `@param` | Every method parameter |
| `@returns` | Every method that returns a value |
| `@throws` | Every known exception the method can throw |
| `@deprecated` | Any method or class being phased out |
| `@see` | Cross-references to related classes or methods |

---

## Test-Driven Development (TDD)

**The TDD cycle is mandatory for all backend features:**

```
RED   → Write a failing test first
GREEN → Write the minimum code to make it pass
REFACTOR → Clean up without breaking the test
```

### TDD workflow per feature

1. Write the spec file (`*.spec.ts` for unit, `*.e2e-spec.ts` for E2E) **before** the implementation file
2. Run `cd apps/backend && npm run test:watch` to confirm it fails (RED)
3. Implement the minimum code to make the test pass (GREEN)
4. Refactor and re-run until clean (REFACTOR)
5. Move to the next test case

### Unit test pattern (NestJS + Jest)

```typescript
/**
 * @file order.service.spec.ts
 * @module OrdersModule
 * @description Unit tests for OrderService — covers createOrder, findByUser, updateStatus
 */
describe('OrderService', () => {
  let service: OrderService;
  let mockOrderRepo: jest.Mocked<Repository<Order>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: getRepositoryToken(Order),
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    mockOrderRepo = module.get(getRepositoryToken(Order));
  });

  describe('createOrder', () => {
    it('should create and return an order with correct total price', async () => {
      // Arrange
      // Act
      // Assert
    });

    it('should throw NotFoundException if customization does not exist', async () => {
      // Arrange → mock returns null
      // Act + Assert
      await expect(service.createOrder(null, dto)).rejects.toThrow(NotFoundException);
    });
  });
});
```

### E2E test pattern (NestJS + Supertest)

```typescript
/**
 * @file orders.e2e-spec.ts
 * @module OrdersModule
 * @description End-to-end tests for the /orders endpoints
 */
describe('Orders (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /orders', () => {
    it('should return 201 and an order ID on valid payload', () => {
      return request(app.getHttpServer())
        .post('/orders')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ customization_id: 'uuid-here', total_price: 250.00 })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.status).toBe('PENDING');
        });
    });

    it('should return 401 without a token', () => {
      return request(app.getHttpServer())
        .post('/orders')
        .send({ customization_id: 'uuid-here' })
        .expect(401);
    });
  });
});
```

### Test commands

```bash
# Always cd first

cd apps/backend && npm run test              # run all unit tests once
cd apps/backend && npm run test:watch        # watch mode during development
cd apps/backend && npm run test:cov          # coverage report (target: >80%)
cd apps/backend && npm run test:e2e          # run E2E tests

cd apps/frontend && npx playwright test      # run frontend E2E tests
cd apps/frontend && npx playwright test --ui # Playwright interactive UI
```

### Coverage targets

| Layer | Target |
|---|---|
| Services (business logic) | ≥ 90% |
| Controllers | ≥ 80% |
| Guards / Pipes | ≥ 80% |
| Overall | ≥ 80% |

---

## Backend Module Structure

Each NestJS module follows this layout:

```
src/modules/<feature>/
├── <feature>.module.ts          ← module definition
├── <feature>.controller.ts      ← HTTP layer, no business logic
├── <feature>.service.ts         ← business logic
├── <feature>.repository.ts      ← DB queries (optional, for complex queries)
├── dto/
│   ├── create-<feature>.dto.ts  ← validated input
│   └── update-<feature>.dto.ts
├── entities/
│   └── <feature>.entity.ts      ← TypeORM entity
├── guards/                      ← feature-specific guards (if any)
├── <feature>.service.spec.ts    ← unit tests
└── <feature>.controller.spec.ts ← controller unit tests
```

```
test/
└── <feature>.e2e-spec.ts        ← Supertest E2E tests
```

### Modules in this project

| Module | Responsibility |
|---|---|
| `AuthModule` | Register, login, JWT access + refresh token flow |
| `UsersModule` | User entity, profile read |
| `CustomizationModule` | Colors, fabrics, accessories, recommendation engine |
| `OrdersModule` | Create order, list user orders, admin status update |
| `ChatModule` | Proxy to Anthropic Claude API, stateless conversation |
| `AnalyticsModule` | Aggregated queries: popular colors, fabrics, order counts |
| `AdminModule` | Protected order management, CSV export |

---

## Database Schema Summary

### Key entities

- `users` — id, email, password (hashed), role (user|admin), phone_number, created_at
- `refresh_tokens` — id, user_id FK, token_hash, expires_at, created_at
- `colors` — id, name, hex_code
- `fabrics` — id, name, description, price_multiplier, texture_class
- `accessories` — id, name, type, extra_price
- `customizations` — id, color_id FK, fabric_id FK, recommendation_label, created_at
- `customization_accessories` — junction: customization_id FK + accessory_id FK (UNIQUE constraint)
- `orders` — id, user_id FK (nullable), customization_id FK, status, total_price, created_at

### Indexes (required — do not omit)

- `orders`: INDEX on `user_id`, `status`, `created_at DESC`
- `customizations`: INDEX on `color_id`, `fabric_id`
- `refresh_tokens`: INDEX on `user_id`, `expires_at`

---

## API Contract

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/x-auth/login` | Public | Admin Login, returns access + refresh tokens |
| POST | `/x-auth/refresh` | Refresh token | Admin: Get new access token |
| GET | `/customization/options` | Public | All colors, fabrics, accessories |
| POST | `/customization` | Public | Save config, returns recommendation label |
| POST | `/orders` | Public | Create order (supports guest users) |
| PATCH | `/orders/:id/status` | Admin | Update order status |
| GET | `/x-admin/orders` | Admin | All orders with filter + export |
| POST | `/chat/message` | Public | Send message, returns Claude response |
| GET | `/x-admin/analytics/summary` | Admin | Popular colors, fabrics, order stats |

---

## Environment Variables

### Backend `.env`

```
DATABASE_URL=postgresql://...
JWT_SECRET=
JWT_REFRESH_SECRET=
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
ANTHROPIC_API_KEY=sk-ant-...
NODE_ENV=development
PORT=3001
```

### Frontend `.env.local`

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## Git Conventions

### Branch naming

```
feat/<short-description>      # new feature
fix/<short-description>       # bug fix
test/<short-description>      # adding/fixing tests
refactor/<short-description>  # refactor, no behavior change
docs/<short-description>      # docs only
```

### Commit message format (Conventional Commits)

```
feat(orders): add CSV export endpoint for admin dashboard
fix(auth): handle expired refresh token gracefully
test(customization): add unit tests for recommendation engine
docs(readme): update local setup instructions
```

---

## Local Development Setup

```bash
# 1. Clone and install
git clone <repo-url>

# 2. Backend
cd apps/backend
cp .env.example .env          # fill in values
npm install
npm run migration:run
npm run start:dev             # runs on http://localhost:3001

# 3. Frontend (new terminal)
cd apps/frontend
cp .env.example .env.local    # set NEXT_PUBLIC_API_URL
npm install
npm run dev                   # runs on http://localhost:3000
```

---

## What NOT to Build (MVP scope — do not add)

- Stripe or any payment integration
- 3D thobe visualization (Three.js)
- WebSocket real-time chat
- Multi-language (i18n) support
- Mobile app

If asked to implement any of the above, decline and note it is out of scope for the MVP.

---

## Sub-context imports

@./apps/backend/GEMINI.md
@./apps/frontend/GEMINI.md