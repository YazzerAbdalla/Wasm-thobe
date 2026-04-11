# GEMINI.md — Backend (`apps/backend/`)

> Sub-context for the NestJS backend. Loaded automatically when Gemini accesses any file under `apps/backend/`.
> Root context is at the repo root `GEMINI.md`.

---

## Directory Rule

**You are in `apps/backend/`. All commands below are relative to this directory.**
**Never run a command without confirming the terminal is here first.**

```bash
pwd   # must return .../apps/backend
```

---

## Framework: NestJS + TypeORM + PostgreSQL

- NestJS version: latest stable
- Node.js: 18+
- TypeScript: strict mode, `"strictNullChecks": true`, `"noImplicitAny": true`
- ORM: TypeORM with migrations (never use `synchronize: true` in production)
- Database: PostgreSQL (Supabase in deployed env, local PG for dev/test)

---

## File Header — Required on Every File

Every `.ts` file under `src/` must begin with this block:

```typescript
/**
 * @file <filename>.ts
 * @module <ModuleName>Module
 * @description <One or two sentences describing what this file does.>
 */
```

Example:

```typescript
/**
 * @file auth.service.ts
 * @module AuthModule
 * @description Handles user registration, login, JWT token issuance,
 *              and refresh token rotation. Delegates password hashing to bcrypt.
 */
```

---

## Method JSDoc — Required on Every Public Method

```typescript
/**
 * Validates user credentials and issues a JWT access token and refresh token.
 *
 * @param {LoginDto} dto - Validated login payload containing email and password
 * @returns {Promise<IAuthTokens>} Object containing accessToken and refreshToken strings
 * @throws {UnauthorizedException} If the email is not found or password does not match
 */
async login(dto: LoginDto): Promise<IAuthTokens> {}
```

Private helper methods may use a shorter single-line comment if self-evident:

```typescript
/** Hashes a plaintext password using bcrypt with 12 salt rounds. */
private async hashPassword(plain: string): Promise<string> {}
```

---

## TDD Workflow (strictly enforced)

1. Create `<feature>.service.spec.ts` **before** `<feature>.service.ts`
2. Run tests in watch mode: `cd apps/backend && npm run test:watch`
3. RED → GREEN → REFACTOR
4. Do not implement a method without a test for it first

### Test file naming

| File type | Convention |
|---|---|
| Unit test | `<name>.spec.ts` next to the source file |
| E2E test | `test/<feature>.e2e-spec.ts` |

### Unit test structure (Arrange / Act / Assert)

```typescript
it('should throw UnauthorizedException when password is wrong', async () => {
  // Arrange
  mockUsersService.findByEmail.mockResolvedValue(mockUser);
  jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);

  // Act & Assert
  await expect(service.login({ email: 'a@b.com', password: 'wrong' }))
    .rejects.toThrow(UnauthorizedException);
});
```

---

## Controller Rules

- Controllers are **HTTP adapters only** — zero business logic
- Delegate everything to the service layer
- Always use `@ApiTags`, `@ApiOperation`, `@ApiResponse` decorators (Swagger)
- Always validate with DTOs — never accept `any` body

```typescript
/**
 * @file orders.controller.ts
 * @module OrdersModule
 * @description HTTP controller for order endpoints. Delegates all logic to OrderService.
 */
@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  /**
   * Creates a new order for the authenticated user.
   *
   * @param {JwtPayload} user - Injected from JWT guard
   * @param {CreateOrderDto} dto - Validated request body
   * @returns {Promise<Order>} The newly created order
   */
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'Order created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(
    @CurrentUser() user: JwtPayload,
    @Body() dto: CreateOrderDto,
  ): Promise<Order> {
    return this.ordersService.createOrder(user.sub, dto);
  }
}
```

---

## Entity Rules

- All PKs are UUID: `@PrimaryGeneratedColumn('uuid')`
- All timestamps use `timestamptz`: `@CreateDateColumn()`, `@UpdateDateColumn()`
- Add `@Index()` decorator on all FK columns and frequently queried columns
- Use `@Column({ nullable: false })` explicitly — never rely on defaults

```typescript
/**
 * @file order.entity.ts
 * @module OrdersModule
 * @description TypeORM entity representing a customer order.
 *              Maps to the `orders` table in PostgreSQL.
 */
@Entity('orders')
@Index(['userId'])
@Index(['status'])
@Index(['createdAt'])
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: true })
  userId: string | null;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  totalPrice: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
```

---

## DTO Rules

- Always use `class-validator` decorators
- Mark all properties `readonly`
- Use `@ApiProperty()` for Swagger visibility

```typescript
/**
 * @file create-order.dto.ts
 * @module OrdersModule
 * @description Validated payload for creating a new order.
 */
export class CreateOrderDto {
  @ApiProperty({ description: 'UUID of the saved customization' })
  @IsUUID()
  readonly customizationId: string;

  @ApiProperty({ description: 'Calculated total price in SAR' })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  readonly totalPrice: number;
}
```

---

## Error Handling

- Use NestJS built-in exceptions: `NotFoundException`, `UnauthorizedException`, `BadRequestException`, `ForbiddenException`, `ConflictException`
- Never throw raw `Error` — always use a typed NestJS exception
- Log errors at service level with NestJS `Logger`
- Return consistent error shapes via a global `HttpExceptionFilter`

```typescript
/** Retrieves a single order by ID, throwing if not found. */
async findById(id: string): Promise<Order> {
  const order = await this.orderRepo.findOne({ where: { id } });
  if (!order) {
    throw new NotFoundException(`Order ${id} not found`);
  }
  return order;
}
```

---

## Auth Flow Summary (Admin Only)

```
Admin Login (POST /x-auth/login)
  → validate credentials
  → issue accessToken (JWT, 15 min, signed with JWT_SECRET)
  → issue refreshToken (JWT, 7 days, signed with JWT_REFRESH_SECRET)
  → save hash of refreshToken to refresh_tokens table

Admin Authenticated request
  → JwtAuthGuard extracts Bearer token
  → validates against JWT_SECRET
  → injects payload as @CurrentUser()

Admin Token refresh (POST /x-auth/refresh)
  → validate refreshToken signature and expiry
  → look up token hash in DB
  → rotate: delete old, issue new pair
  → return new accessToken + refreshToken

Admin Logout
  → delete refresh_tokens row for this user
```

---

## Recommendation Engine

Rules are defined in `src/modules/customization/recommendation.config.json`.

```json
[
  { "colorName": "Black", "fabricName": "Premium Wool", "label": "Royal Classic" },
  { "colorName": "White", "fabricName": "Egyptian Cotton", "label": "Heritage Formal" },
  { "colorName": "Navy", "fabricName": "Linen", "label": "Modern Casual" }
]
```

`RecommendationService` loads this file at startup. Adding a new rule requires editing the JSON only — no service code changes.

---

## Claude API Integration (ChatModule)

```typescript
/**
 * Sends a user message to the Anthropic Claude API with the full conversation history.
 * The backend is stateless — history is provided by the client per request.
 *
 * @param {ChatMessageDto} dto - Contains message string and history array
 * @returns {Promise<string>} Claude's text response
 * @throws {ServiceUnavailableException} If the Anthropic API call fails
 */
async sendMessage(dto: ChatMessageDto): Promise<string> {}
```

- Model: `claude-haiku-4-5` (fast, cost-efficient for chat)
- Max tokens: 1000 per response
- System prompt: scoped to Thobe platform context (defined in `chat.constants.ts`)
- Never expose the `ANTHROPIC_API_KEY` in responses or logs

---

## Commands Reference

```bash
# Always cd first
cd apps/backend

npm run start:dev          # development server with hot reload (port 3001)
npm run build              # compile TypeScript to dist/
npm run start:prod         # run compiled build

npm run test               # all unit tests
npm run test:watch         # watch mode (use during TDD)
npm run test:cov           # coverage report
npm run test:e2e           # Supertest E2E suite

npm run migration:generate -- --name=<MigrationName>   # generate migration from entity changes
npm run migration:run                                   # apply pending migrations
npm run migration:revert                                # revert last migration

npm run lint               # ESLint check
npm run format             # Prettier format
```

---

## What to Avoid

- `synchronize: true` in TypeORM config — migrations only
- `any` type — use generics or proper interfaces
- Business logic in controllers
- Direct `console.log` — use NestJS `Logger`
- Hardcoded secrets — always use `ConfigService`
- Silent catch blocks: `catch(e) {}` — always log or rethrow
- Running commands without `cd apps/backend` first