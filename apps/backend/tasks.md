# Backend Tasks — Thobe Platform (`apps/backend/`)

> **Stack:** NestJS · TypeORM · PostgreSQL (Supabase) · JWT · Claude API
> **Rule:** `cd apps/backend` before every command. TDD is mandatory — write the test before the implementation.

---

## Progress Tracker

| Section | Tasks | Status |
|---|---|---|
| 0. Project Setup | 6 tasks | `[x] [x] [x] [x] [x] [x]` |
| 1. Auth Module | 6 tasks | `[x] [x] [x] [x] [x] [x]` |
| 2. Users Module | 2 tasks | `[x] [x]` |
| 3. Customization Module | 6 tasks | `[x] [x] [x] [x] [x] [ ]` |
| 4. Recommendation Engine | 4 tasks | `[x] [x] [x] [ ]` |
| 5. Orders Module | 3 tasks | `[ ] [ ] [ ]` |
| 6. Chat Module | 4 tasks | `[ ] [ ] [ ] [ ]` |
| 7. Admin Module | 4 tasks | `[ ] [ ] [ ] [ ]` |
| 8. Analytics Module | 3 tasks | `[ ] [ ] [ ]` |
| 9. Global Infrastructure | 5 tasks | `[ ] [ ] [ ] [ ] [ ]` |

**Total: 44 tasks**

---

## Section 0 — Project Setup

### Task 0.1 — Initialize NestJS project

- [ ] Run `cd apps/backend && nest new . --package-manager npm --skip-git`
- [ ] Delete the default `src/app.controller.ts`, `src/app.controller.spec.ts`, `src/app.service.ts`
- [ ] Keep `src/app.module.ts` as the root module — clean it up
- [ ] Verify: `cd apps/backend && npm run start:dev` starts on port 3001

**Expected result:** Clean NestJS scaffold with no placeholder files.

---

### Task 0.2 — Configure TypeScript (strict mode)

- [ ] Open `tsconfig.json` and set:
  ```json
  {
    "compilerOptions": {
      "strict": true,
      "noImplicitAny": true,
      "strictNullChecks": true,
      "strictFunctionTypes": true
    }
  }
  ```
- [ ] Run `cd apps/backend && npm run build` — must compile with zero errors

---

### Task 0.3 — ESLint + Prettier

- [ ] Confirm `.eslintrc.js` has `@typescript-eslint/recommended` rules
- [ ] Add rule: `"@typescript-eslint/explicit-function-return-type": "error"` — forces return type annotations
- [ ] Add rule: `"@typescript-eslint/no-explicit-any": "error"` — bans `any`
- [ ] Configure `.prettierrc`:
  ```json
  { "singleQuote": true, "trailingComma": "all", "tabWidth": 2, "semi": true }
  ```
- [ ] Run `cd apps/backend && npm run lint` — must pass with zero warnings

---

### Task 0.4 — Environment config (`ConfigModule`)

- [ ] Install: `cd apps/backend && npm install @nestjs/config joi`
- [ ] Create `.env` and `.env.example`:
  ```
  DATABASE_URL=postgresql://user:pass@localhost:5432/thobe_dev
  JWT_SECRET=
  JWT_REFRESH_SECRET=
  JWT_EXPIRES_IN=15m
  JWT_REFRESH_EXPIRES_IN=7d
  ANTHROPIC_API_KEY=sk-ant-...
  NODE_ENV=development
  PORT=3001
  ```
- [ ] Register `ConfigModule.forRoot({ isGlobal: true, validationSchema: JoiSchema })` in `AppModule`
- [ ] Add Joi validation schema — all vars above are required except `PORT` (default 3001)
- [ ] Verify: app fails to start if `JWT_SECRET` is missing from `.env`

**Files:** `src/app.module.ts`, `.env`, `.env.example`

---

### Task 0.5 — TypeORM + Database connection

- [ ] Install: `cd apps/backend && npm install @nestjs/typeorm typeorm pg`
- [ ] Register `TypeOrmModule.forRootAsync()` in `AppModule` — reads `DATABASE_URL` from `ConfigService`
- [ ] Set `synchronize: false` — migrations only, never auto-sync
- [ ] Set `logging: true` in development env, `false` in production
- [ ] Create `src/database/` directory for migrations
- [ ] Add migration scripts to `package.json`:
  ```json
  "migration:generate": "typeorm migration:generate src/database/migrations/$npm_config_name -d src/database/data-source.ts",
  "migration:run": "typeorm migration:run -d src/database/data-source.ts",
  "migration:revert": "typeorm migration:revert -d src/database/data-source.ts"
  ```
- [ ] Create `src/database/data-source.ts` with standalone TypeORM `DataSource` for CLI use
- [ ] Verify: `cd apps/backend && npm run start:dev` connects to DB without errors

**Files:** `src/app.module.ts`, `src/database/data-source.ts`

---

### Task 0.6 — Global pipes, filters, and interceptors

- [ ] Register `ValidationPipe` globally in `main.ts`:
  ```typescript
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,        // strip unknown properties
    forbidNonWhitelisted: true,
    transform: true,        // auto-transform payloads to DTO instances
  }));
  ```
- [ ] Create `src/common/filters/http-exception.filter.ts` — standardizes all error responses:
  ```json
  { "statusCode": 404, "message": "Order not found", "error": "Not Found", "timestamp": "..." }
  ```
- [ ] Register filter globally in `main.ts`
- [ ] Set global prefix: `app.setGlobalPrefix('api')`
- [ ] Enable CORS for `http://localhost:3000` in development
- [ ] Write unit test for `HttpExceptionFilter` — verify it shapes the response correctly

**Files:** `src/main.ts`, `src/common/filters/http-exception.filter.ts`, `src/common/filters/http-exception.filter.spec.ts`

---

## Section 1 — Auth Module

> **TDD:** Write `auth.service.spec.ts` before `auth.service.ts`.

### Task 1.1 — Auth module scaffold

- [ ] Run: `cd apps/backend && nest generate module modules/auth`
- [ ] Run: `cd apps/backend && nest generate controller modules/auth --no-spec`
- [ ] Run: `cd apps/backend && nest generate service modules/auth --no-spec`
- [ ] Create manually: `src/modules/auth/auth.service.spec.ts` (empty describe block)
- [ ] Install: `cd apps/backend && npm install @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt`
- [ ] Install types: `cd apps/backend && npm install -D @types/passport-jwt @types/bcrypt`

**Module path:** `src/modules/auth/`

---

### Task 1.2 — User entity

- [ ] Create `src/modules/users/entities/user.entity.ts`:

```typescript
/**
 * @file user.entity.ts
 * @module UsersModule
 * @description TypeORM entity for the users table.
 *              Stores authentication credentials and role for route guards.
 */
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false, select: false }) // never returned by default
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({ nullable: true })
  phoneNumber: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
```

- [ ] Create `src/modules/users/enums/user-role.enum.ts` with `USER` and `ADMIN` values
- [ ] Generate migration: `cd apps/backend && npm run migration:generate --name=CreateUsersTable`
- [ ] Run migration: `cd apps/backend && npm run migration:run`
- [ ] Verify: `users` table exists in DB with correct columns

---

### Task 1.3 — Refresh token entity

- [ ] Create `src/modules/auth/entities/refresh-token.entity.ts`:

```typescript
/**
 * @file refresh-token.entity.ts
 * @module AuthModule
 * @description Stores hashed refresh tokens. One row per active session.
 *              Deleted on logout or token rotation.
 */
@Entity('refresh_tokens')
@Index(['userId'])
@Index(['expiresAt'])
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @Column({ nullable: false })
  tokenHash: string; // bcrypt hash of the raw token

  @Column({ type: 'timestamptz', nullable: false })
  expiresAt: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
```

- [ ] Generate and run migration: `cd apps/backend && npm run migration:generate --name=CreateRefreshTokensTable && npm run migration:run`

---



---

### Task 1.5 — Admin Login endpoint + JWT issuance

**Write the test first.**

- [ ] In `auth.service.spec.ts`, write tests:
  - `should return accessToken and refreshToken on valid credentials`
  - `should throw UnauthorizedException if email not found`
  - `should throw UnauthorizedException if password does not match`
- [ ] Implement `AuthService.login(dto: LoginDto): Promise<IAuthTokens>`
  - Find user by email (explicitly select password column)
  - Compare with `bcrypt.compare`
  - Sign access token (payload: `{ sub: userId, email, role }`, expires: `JWT_EXPIRES_IN`)
  - Sign refresh token (expires: `JWT_REFRESH_EXPIRES_IN`)
  - Hash refresh token and save to `refresh_tokens` table
  - Return `{ accessToken, refreshToken }`
- [ ] Create `src/modules/auth/dto/login.dto.ts`
- [ ] Create `src/modules/auth/interfaces/auth-tokens.interface.ts`
- [ ] Add `POST /x-auth/login` route to controller
- [ ] Run tests: `cd apps/backend && npm run test`

**Endpoint:** `POST /api/x-auth/login`
**Returns:** `200` with `{ accessToken, refreshToken }`

---

### Task 1.6 — Admin Refresh token endpoint

**Write the test first.**

- [ ] Write tests:
  - `should return new token pair on valid refresh token`
  - `should throw UnauthorizedException if token is expired`
  - `should throw UnauthorizedException if token hash not found in DB`
- [ ] Implement `AuthService.refresh(refreshToken: string): Promise<IAuthTokens>`
  - Verify token with `JWT_REFRESH_SECRET`
  - Look up token hash in `refresh_tokens` table
  - Delete old row (rotation — one-time use)
  - Issue and store new token pair
- [ ] Add `POST /x-auth/refresh` route (no auth guard — uses raw token from body)
- [ ] Run tests: `cd apps/backend && npm run test`

**Endpoint:** `POST /api/x-auth/refresh`
**Body:** `{ refreshToken: string }`

---

### Task 1.7 — JWT guard + roles guard

- [ ] Create `src/common/guards/jwt-auth.guard.ts` — extends `AuthGuard('jwt')`
- [ ] Create `src/common/guards/roles.guard.ts` — checks `user.role` against `@Roles()` decorator
- [ ] Create `src/common/decorators/roles.decorator.ts` — `@Roles(UserRole.ADMIN)`
- [ ] Create `src/common/decorators/current-user.decorator.ts` — `@CurrentUser()` extracts JWT payload
- [ ] Register `JwtModule` and `PassportModule` in `AuthModule`
- [ ] Write unit tests for `RolesGuard`:
  - `should allow access when user has required role`
  - `should deny access when user role does not match`
- [ ] Apply `JwtAuthGuard` to protected *admin* routes — verify with `cd apps/backend && npm run test:e2e`

**Files:** `src/common/guards/`, `src/common/decorators/`

---

## Section 2 — Users Module

### Task 2.1 — Users module scaffold + service

- [ ] Run: `cd apps/backend && nest generate module modules/users`
- [ ] Run: `cd apps/backend && nest generate service modules/users --no-spec`
- [ ] Create manually: `src/modules/users/users.service.spec.ts`
- [ ] Implement `UsersService`:
  - `findById(id: string): Promise<User>`
  - `findByEmail(email: string, includePassword?: boolean): Promise<User | null>`
- [ ] Write unit tests for both methods (mock `UserRepository`)

---



---

### Task 2.3 — Export UsersModule for use in AuthModule

- [ ] Export `UsersService` from `UsersModule`
- [ ] Import `UsersModule` in `AuthModule`
- [ ] Verify no circular dependency warning on startup

---

## Section 3 — Customization Module

### Task 3.1 — Module scaffold

- [ ] Run: `cd apps/backend && nest generate module modules/customization`
- [ ] Run: `cd apps/backend && nest generate controller modules/customization --no-spec`
- [ ] Run: `cd apps/backend && nest generate service modules/customization --no-spec`
- [ ] Create manually: `src/modules/customization/customization.service.spec.ts`

---

### Task 3.2 — Color, Fabric, Accessory entities

- [ ] Create `src/modules/customization/entities/color.entity.ts`:
  - `id` (uuid PK), `name` (varchar), `hexCode` (varchar 7)

- [ ] Create `src/modules/customization/entities/fabric.entity.ts`:
  - `id`, `name`, `description` (nullable), `priceMultiplier` (decimal 4,2, default 1.00), `textureClass` (nullable varchar — CSS class for SVG preview)

- [ ] Create `src/modules/customization/entities/accessory.entity.ts`:
  - `id`, `name`, `type` (varchar: collar | button | cuff), `extraPrice` (decimal 8,2, default 0)

- [ ] Create `src/modules/customization/entities/customization.entity.ts`:
  - `id`, `colorId` (FK), `fabricId` (FK), `recommendationLabel` (nullable varchar), `createdAt`
  - `@ManyToOne` to Color and Fabric
  - `@ManyToMany` to Accessory via `customization_accessories` junction table

- [ ] Generate and run migration: `cd apps/backend && npm run migration:generate --name=CreateCustomizationTables && npm run migration:run`

---

### Task 3.3 — Seed data

- [ ] Create `src/database/seeds/customization.seed.ts` with sample data:
  - Colors: Black `#000000`, White `#FFFFFF`, Navy `#1B2A4A`, Beige `#F5F0E8`
  - Fabrics: Premium Wool (×1.4, `.fabric-wool`), Egyptian Cotton (×1.2, `.fabric-cotton`), Linen (×1.1, `.fabric-linen`), Polyester (×1.0, `.fabric-polyester`)
  - Accessories: Gold Buttons (collar, +45 SAR), Silver Buttons (collar, +35 SAR), Mandarin Collar (collar, +60 SAR), French Cuffs (cuff, +80 SAR)
- [ ] Add `npm run seed` script to `package.json`
- [ ] Run seed: `cd apps/backend && npm run seed`

---

### Task 3.4 — GET /customization/options endpoint

**Write the test first.**

- [ ] Write tests in `customization.service.spec.ts`:
  - `should return all colors, fabrics, and accessories`
  - `should return empty arrays if no data seeded`
- [ ] Implement `CustomizationService.getOptions(): Promise<ICustomizationOptions>`
  - Returns `{ colors, fabrics, accessories }` in a single response
- [ ] Add `GET /customization/options` route — public, no auth
- [ ] Write E2E test: `should return 200 with colors, fabrics, accessories arrays`

**Endpoint:** `GET /api/customization/options`

---

### Task 3.5 — POST /customization endpoint

**Write the test first.**

- [ ] Create `src/modules/customization/dto/create-customization.dto.ts`:
  - `colorId`: `@IsUUID()`
  - `fabricId`: `@IsUUID()`
  - `accessoryIds`: `@IsArray() @IsUUID('all', { each: true }) @IsOptional()`
- [ ] Write tests:
  - `should save customization and return it with recommendation label`
  - `should throw NotFoundException if colorId does not exist`
  - `should throw NotFoundException if fabricId does not exist`
- [ ] Implement `CustomizationService.create(dto): Promise<Customization>`
  - Validate color and fabric exist
  - Save customization + junction rows for accessories
  - Call `RecommendationService.getLabel()` and set `recommendationLabel`
- [ ] Add `POST /customization` route — protected by `JwtAuthGuard`
- [ ] Write E2E test: `POST /api/customization` with valid payload returns `201`

**Endpoint:** `POST /api/customization`

---

### Task 3.6 — Customization module tests

- [ ] Run full unit test suite: `cd apps/backend && npm run test`
- [ ] Run coverage: `cd apps/backend && npm run test:cov`
- [ ] Ensure `CustomizationService` coverage ≥ 90%
- [ ] Fix any failing tests before moving to next section

---

## Section 4 — Recommendation Engine

### Task 4.1 — Rule config file

- [ ] Create `src/modules/customization/recommendation.config.json`:
  ```json
  [
    { "colorName": "Black", "fabricName": "Premium Wool", "label": "Royal Classic" },
    { "colorName": "Black", "fabricName": "Egyptian Cotton", "label": "Royal Formal" },
    { "colorName": "White", "fabricName": "Egyptian Cotton", "label": "Heritage Formal" },
    { "colorName": "White", "fabricName": "Linen", "label": "Summer Elegance" },
    { "colorName": "Navy", "fabricName": "Linen", "label": "Modern Casual" },
    { "colorName": "Navy", "fabricName": "Premium Wool", "label": "Executive Classic" },
    { "colorName": "Beige", "fabricName": "Linen", "label": "Desert Breeze" },
    { "colorName": "Beige", "fabricName": "Egyptian Cotton", "label": "Refined Casual" }
  ]
  ```
- [ ] Rules must be the single source of truth — no label strings hardcoded in service code

---

### Task 4.2 — RecommendationService

**Write the test first.**

- [ ] Create `src/modules/customization/recommendation.service.spec.ts`
- [ ] Write tests:
  - `should return correct label for Black + Premium Wool`
  - `should return null when no rule matches the combination`
  - `should be case-insensitive when matching color and fabric names`
- [ ] Create `src/modules/customization/recommendation.service.ts`
- [ ] Implement `getLabel(colorName: string, fabricName: string): string | null`
  - Load rules from JSON config at service instantiation
  - Match case-insensitively
  - Return `null` if no match (caller decides default label)
- [ ] Run tests: `cd apps/backend && npm run test`

---

### Task 4.3 — Wire RecommendationService into CustomizationService

- [ ] Inject `RecommendationService` into `CustomizationService`
- [ ] Call `getLabel()` inside `create()` before saving
- [ ] If label is `null`, set `recommendationLabel` to `'Classic Look'` as fallback
- [ ] Update existing unit tests to mock `RecommendationService`

---

### Task 4.4 — Recommendation engine tests

- [ ] Run: `cd apps/backend && npm run test -- --testPathPattern=recommendation`
- [ ] All unit tests must pass
- [ ] Coverage for `RecommendationService` must be 100% (it is pure logic — no DB)

---

## Section 5 — Orders Module

### Task 5.1 — Module scaffold + Order entity

- [ ] Run: `cd apps/backend && nest generate module modules/orders`
- [ ] Run: `cd apps/backend && nest generate controller modules/orders --no-spec`
- [ ] Run: `cd apps/backend && nest generate service modules/orders --no-spec`
- [ ] Create manually: `src/modules/orders/orders.service.spec.ts`
- [ ] Create `src/modules/orders/enums/order-status.enum.ts`:
  ```typescript
  export enum OrderStatus { PENDING = 'PENDING', PROCESSING = 'PROCESSING', DELIVERED = 'DELIVERED' }
  ```
- [ ] Create `src/modules/orders/entities/order.entity.ts`:
  - `id` (uuid), `userId` (uuid nullable), `customizationId` (uuid FK), `status` (enum, default PENDING), `totalPrice` (decimal 10,2), `createdAt`
  - `@Index(['userId'])`, `@Index(['status'])`, `@Index(['createdAt'])`
- [ ] Generate and run migration: `cd apps/backend && npm run migration:generate --name=CreateOrdersTable && npm run migration:run`

---

### Task 5.2 — POST /orders (create order)

**Write the test first.**

- [ ] Create `src/modules/orders/dto/create-order.dto.ts`:
  - `customizationId`: `@IsUUID()`
  - `totalPrice`: `@IsNumber() @IsPositive()`
- [ ] Write tests:
  - `should create order and return it with PENDING status`
  - `should throw NotFoundException if customizationId does not exist`
  - `should allow null userId for guest checkout`
- [ ] Implement `OrdersService.createOrder(userId: string | null, dto: CreateOrderDto): Promise<Order>`
- [ ] Add `POST /orders` route — public (supports guest checkout)
- [ ] Write E2E test: `test/orders.e2e-spec.ts`
  - `POST /api/orders` with valid payload returns `201` with `id` and `status: PENDING`

**Endpoint:** `POST /api/orders`

---



---

### Task 5.4 — PATCH /orders/:id/status (admin only)

**Write the test first.**

- [ ] Create `src/modules/orders/dto/update-order-status.dto.ts`:
  - `status`: `@IsEnum(OrderStatus)`
- [ ] Write tests:
  - `should update order status and return updated order`
  - `should throw NotFoundException if order does not exist`
  - `should throw ForbiddenException if caller is not admin`
- [ ] Implement `OrdersService.updateStatus(id: string, dto: UpdateOrderStatusDto): Promise<Order>`
- [ ] Add `PATCH /orders/:id/status` route — protected by `JwtAuthGuard` + `@Roles(UserRole.ADMIN)`
- [ ] Write E2E test:
  - Admin token → `200`
  - User token → `403`
  - No token → `401`

**Endpoint:** `PATCH /api/x-admin/orders/:id/status`

---



---

### Task 5.6 — Orders module tests

- [ ] Run: `cd apps/backend && npm run test -- --testPathPattern=orders`
- [ ] Run: `cd apps/backend && npm run test:e2e`
- [ ] `OrdersService` coverage ≥ 90%
- [ ] All E2E order tests pass

---

## Section 6 — Chat Module

### Task 6.1 — Module scaffold

- [ ] Run: `cd apps/backend && nest generate module modules/chat`
- [ ] Run: `cd apps/backend && nest generate controller modules/chat --no-spec`
- [ ] Run: `cd apps/backend && nest generate service modules/chat --no-spec`
- [ ] Create manually: `src/modules/chat/chat.service.spec.ts`
- [ ] Install: `cd apps/backend && npm install @anthropic-ai/sdk`

---

### Task 6.2 — System prompt constant

- [ ] Create `src/modules/chat/chat.constants.ts`:

```typescript
/**
 * @file chat.constants.ts
 * @module ChatModule
 * @description System prompt that scopes Claude to the Thobe Platform context.
 *              Update this when new fabrics, colors, or features are added.
 */
export const THOBE_SYSTEM_PROMPT = `
You are a helpful style assistant for the Thobe Platform, a premium Saudi thobe customization service.

You help customers choose the right combination of colors, fabrics, and accessories for their thobe.

Available colors: Black, White, Navy, Beige.
Available fabrics: Premium Wool (best for winter, formal), Egyptian Cotton (all-season, formal),
  Linen (best for summer, casual), Polyester (budget-friendly, all-season).
Available accessories: Gold Buttons, Silver Buttons, Mandarin Collar, French Cuffs.

Pricing: base price is 350 SAR. Fabric multipliers and accessory extras are added on top.

Keep responses concise, warm, and professional. If the user asks about anything unrelated
to thobes or the platform, politely redirect them.

If the user wants to speak to a human, tell them to use the "Talk to Human" button in the chat.
`.trim();
```

---

### Task 6.3 — POST /chat/message endpoint

**Write the test first.**

- [ ] Create `src/modules/chat/dto/chat-message.dto.ts`:
  - `message`: `@IsString() @MaxLength(1000)`
  - `history`: `@IsArray() @IsOptional()` — array of `{ role: 'user' | 'assistant', content: string }`
- [ ] Write tests (mock Anthropic SDK):
  - `should return Claude response string on valid message`
  - `should throw ServiceUnavailableException if Anthropic API call fails`
  - `should include conversation history in API call`
- [ ] Implement `ChatService.sendMessage(dto: ChatMessageDto): Promise<string>`
  - Initialize Anthropic client with key from `ConfigService`
  - Build messages array from `dto.history` + new user message
  - Call `anthropic.messages.create()` with system prompt and `max_tokens: 1000`
  - Return the text content of the first response block
  - Wrap in try/catch — throw `ServiceUnavailableException` on failure
- [ ] Add `POST /chat/message` route — public (no auth required)
- [ ] Run tests: `cd apps/backend && npm run test -- --testPathPattern=chat`

**Endpoint:** `POST /api/chat/message`
**Body:** `{ message: string, history?: { role, content }[] }`
**Returns:** `{ response: string }`

---

### Task 6.4 — Chat module tests

- [ ] Anthropic SDK must be fully mocked in unit tests — never make real API calls in tests
- [ ] Use `jest.mock('@anthropic-ai/sdk')` at the top of `chat.service.spec.ts`
- [ ] Run: `cd apps/backend && npm run test:cov`
- [ ] `ChatService` coverage ≥ 80%

---

## Section 7 — Admin Module

### Task 7.1 — Module scaffold

- [ ] Run: `cd apps/backend && nest generate module modules/admin`
- [ ] Run: `cd apps/backend && nest generate controller modules/admin --no-spec`
- [ ] Run: `cd apps/backend && nest generate service modules/admin --no-spec`
- [ ] Create manually: `src/modules/admin/admin.service.spec.ts`
- [ ] All admin routes must be protected by `JwtAuthGuard` + `@Roles(UserRole.ADMIN)`

---

### Task 7.2 — GET /admin/orders (filterable orders list)

**Write the test first.**

- [ ] Create `src/modules/admin/dto/orders-filter.dto.ts`:
  - `status`: `@IsEnum(OrderStatus) @IsOptional()`
  - `startDate`: `@IsDateString() @IsOptional()`
  - `endDate`: `@IsDateString() @IsOptional()`
  - `search`: `@IsString() @IsOptional()` — matches order ID or user email
  - `page`: `@IsInt() @Min(1) @IsOptional()` (default 1)
  - `limit`: `@IsInt() @Min(1) @Max(100) @IsOptional()` (default 20)
- [ ] Write tests:
  - `should return paginated orders`
  - `should filter by status when provided`
  - `should filter by date range when provided`
- [ ] Implement `AdminService.getOrders(filter: OrdersFilterDto): Promise<IPaginatedResult<Order>>`
- [ ] Add `GET /x-admin/orders` route
- [ ] Write E2E test for filter params

**Endpoint:** `GET /api/x-admin/orders?status=PENDING&page=1&limit=20`

---

### Task 7.3 — GET /admin/orders/export (CSV download)

**Write the test first.**

- [ ] Write test:
  - `should return a CSV string with correct headers and rows`
- [ ] Implement `AdminService.exportOrdersCsv(filter: OrdersFilterDto): Promise<string>`
  - Reuse filter logic from Task 7.2
  - Build CSV manually (no library needed for MVP):
    `Order ID,Status,User Email,Total Price,Created At`
- [ ] Add `GET /x-admin/orders/export` route — sets response header `Content-Type: text/csv`
- [ ] Write E2E test: response `Content-Type` header is `text/csv`

**Endpoint:** `GET /api/x-admin/orders/export`

---

### Task 7.4 — Admin module tests

- [ ] Run: `cd apps/backend && npm run test -- --testPathPattern=admin`
- [ ] All unit tests pass
- [ ] E2E: admin routes return `403` for non-admin users

---

## Section 8 — Analytics Module

### Task 8.1 — Module scaffold

- [ ] Run: `cd apps/backend && nest generate module modules/analytics`
- [ ] Run: `cd apps/backend && nest generate controller modules/analytics --no-spec`
- [ ] Run: `cd apps/backend && nest generate service modules/analytics --no-spec`
- [ ] Create manually: `src/modules/analytics/analytics.service.spec.ts`
- [ ] All analytics routes: `JwtAuthGuard` + `@Roles(UserRole.ADMIN)`

---

### Task 8.2 — GET /analytics/summary

**Write the test first.**

- [ ] Write tests:
  - `should return top 5 colors by usage count`
  - `should return top 5 fabrics by usage count`
  - `should return order counts grouped by status`
- [ ] Implement `AnalyticsService.getSummary(): Promise<IAnalyticsSummary>`:

```typescript
interface IAnalyticsSummary {
  topColors: { colorName: string; count: number }[];
  topFabrics: { fabricName: string; count: number }[];
  ordersByStatus: { status: OrderStatus; count: number }[];
}
```

- Queries use TypeORM `QueryBuilder` with `GROUP BY` and `ORDER BY count DESC LIMIT 5`
- [ ] Add `GET /analytics/summary` route
- [ ] Write E2E test: `should return 200 with summary shape`

**Endpoint:** `GET /api/x-admin/analytics/summary`

---

### Task 8.3 — Analytics module tests

- [ ] Run: `cd apps/backend && npm run test -- --testPathPattern=analytics`
- [ ] Queries mocked with `QueryBuilder` spy
- [ ] All tests pass

---

## Section 9 — Global Infrastructure

### Task 9.1 — Swagger / OpenAPI setup

- [ ] Install: `cd apps/backend && npm install @nestjs/swagger swagger-ui-express`
- [ ] Configure in `main.ts`:
  ```typescript
  const config = new DocumentBuilder()
    .setTitle('Thobe Platform API')
    .setDescription('REST API for the Thobe customization platform')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  ```
- [ ] Swagger available at `http://localhost:3001/api/docs` in development only
- [ ] Ensure all DTOs have `@ApiProperty()` decorators
- [ ] Verify all endpoints appear in Swagger UI

---

### Task 9.2 — Logger setup

- [ ] Replace all `console.log` calls with NestJS `Logger`
- [ ] Each service instantiates its own logger: `private readonly logger = new Logger(OrdersService.name)`
- [ ] Log: service method entry (debug), successful operations (log), all exceptions (error/warn)
- [ ] Never log sensitive values: passwords, tokens, API keys

---

### Task 9.3 — Rate limiting

- [ ] Install: `cd apps/backend && npm install @nestjs/throttler`
- [ ] Register `ThrottlerModule` globally in `AppModule`:
  - Default: 100 requests per 60 seconds per IP
  - Apply stricter limit on auth routes: 10 requests per 60 seconds
- [ ] Write test: `POST /api/auth/login` returns `429` after 10 rapid requests

---

### Task 9.4 — Full E2E test suite

- [ ] Create `test/app.e2e-spec.ts` — smoke tests for every module:

```
Auth:
  POST /api/x-auth/login → 200 with tokens (Admin Login)
  POST /api/x-auth/refresh → 200 with new tokens (Admin Refresh)

Customization:
  GET /api/customization/options → 200 with arrays

Orders:
  POST /api/orders (guest) → 201

Admin:
  GET /api/x-admin/orders (admin token) → 200
  GET /api/x-admin/orders (user token) → 403

Chat:
  POST /api/chat/message → 200 with response string (mocked Anthropic)

Analytics:
  GET /api/x-admin/analytics/summary (admin token) → 200
```

- [ ] Run: `cd apps/backend && npm run test:e2e`
- [ ] All smoke tests pass

---

### Task 9.5 — Coverage gate

- [ ] Run: `cd apps/backend && npm run test:cov`
- [ ] Confirm coverage meets minimums:

| Layer | Minimum |
|---|---|
| Services | 90% |
| Controllers | 80% |
| Guards / Pipes | 80% |
| Overall | 80% |

- [ ] Fix any gaps before marking this task done
- [ ] Commit coverage report: `coverage/lcov-report/` (add to `.gitignore` if not wanted in repo)

---

## Commands Reference

```bash
# Always cd first
cd apps/backend

# Development
npm run start:dev                          # hot-reload dev server (port 3001)
npm run build                              # compile to dist/

# Tests
npm run test                               # all unit tests
npm run test:watch                         # TDD watch mode
npm run test:cov                           # coverage report
npm run test:e2e                           # Supertest E2E suite
npm run test -- --testPathPattern=orders   # run single module tests

# Database
npm run migration:generate --name=<Name>   # generate from entity changes
npm run migration:run                      # apply migrations
npm run migration:revert                   # undo last migration
npm run seed                               # seed dev data

# Code quality
npm run lint                               # ESLint
npm run format                             # Prettier
```

---

## Definition of Done

A task is complete when:

1. Test written **before** implementation (TDD — RED → GREEN → REFACTOR)
2. All tests for the task pass: `cd apps/backend && npm run test`
3. Every file has a `@file` JSDoc header
4. Every public method has a JSDoc comment with `@param`, `@returns`, `@throws`
5. No `any` types — `npm run lint` passes with zero errors
6. TypeScript strict mode passes — `npm run build` with zero errors
7. Coverage for the module ≥ 80%
8. Changes committed on a `feat/<name>` or `test/<name>` branch