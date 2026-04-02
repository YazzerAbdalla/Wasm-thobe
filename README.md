# Thobe Platform — Premium Customization Experience

A full-stack web platform for customizing and ordering traditional Saudi thobes with a modern, luxury digital experience.

---

## Architecture Overview

```
┌─────────────────────────────────────────────┐
│              Next.js Frontend               │
│  Tailwind CSS · Framer Motion · Zustand     │
└────────────────────┬────────────────────────┘
                     │ REST API
┌────────────────────▼────────────────────────┐
│              NestJS Backend                 │
│  Auth · Users · Orders · Customization      │
│  Recommendations · Chat (Claude API)        │
└────────────────────┬────────────────────────┘
                     │
┌────────────────────▼────────────────────────┐
│         PostgreSQL via Supabase             │
│  users · orders · customizations           │
│  colors · fabrics · accessories            │
└─────────────────────────────────────────────┘
```

---

## Tech Stack

| Layer      | Technology                     |
|------------|--------------------------------|
| Frontend   | Next.js 14, Tailwind CSS, Framer Motion |
| State      | Zustand                        |
| Backend    | NestJS (modular architecture)  |
| ORM        | TypeORM                        |
| Database   | PostgreSQL via Supabase        |
| Auth       | JWT (access + refresh tokens)  |
| AI         | Anthropic Claude API (chatbot) |
| Deploy     | Vercel (FE) · Render (BE)      |
| Testing    | Supertest (API) · Playwright (E2E) |

---

## Key Features

### Thobe Builder
An interactive multi-step wizard that lets users configure:
- **Color** — live SVG preview updates via CSS variables
- **Fabric** — affects pricing multiplier and recommendation label
- **Accessories** — collar style, button type, cuff options

The live preview is CSS-driven (no PNG swapping). Color and texture changes update an SVG thobe illustration in real time using CSS custom properties.

### Smart Recommendation Engine
A rule matrix (JSON config, not hardcoded if/else) maps combinations of color + fabric + accessories to curated style labels:
- Royal Classic
- Modern Casual
- Heritage Formal

### AI-Powered Chatbot
Powered by the Anthropic Claude API. The assistant is context-aware — it knows the platform, the available fabrics and colors, and can guide users through the customization flow naturally. Falls back to a WhatsApp handoff for human support.

### Order Flow
1. User completes builder → sees order summary with price breakdown
2. Confirms → order persisted with `PENDING` status
3. User receives order ID → can track via profile
4. Admin updates status: `PENDING → PROCESSING → DELIVERED`

### Admin Dashboard
- Filterable, searchable orders table
- Status update actions
- CSV export for order records
- Protected route (JWT guard + admin role check)

---

## Project Structure

```
thobe-platform/
├── backend/
│   └── src/
│       └── modules/
│           ├── auth/          # JWT auth, refresh tokens
│           ├── users/         # User entity + profile
│           ├── orders/        # Order CRUD + status flow
│           ├── customization/ # Colors, fabrics, accessories
│           └── chat/          # Claude API integration
├── frontend/
│   └── src/
│       ├── components/        # Shared UI components
│       ├── features/          # Feature-sliced modules
│       ├── hooks/             # Custom React hooks
│       └── services/          # API service layer
├── docs/
│   ├── ERD.md                 # Database schema
│   ├── PRD.md                 # Product requirements
│   └── implementation-plan.md # Phase breakdown
└── README.md
```

---

## Database Schema

Core entities and relationships:

```
users ──< orders ──> customizations >── colors
                              │
                              └──────> fabrics
                              │
                   customization_accessories
                              │
                              └──────> accessories
```

Indexes on: `orders.user_id`, `orders.status`, `orders.created_at`, `customizations.color_id`, `customizations.fabric_id`

---

## Running Locally

### Prerequisites
- Node.js 18+
- PostgreSQL (or Supabase project)
- Anthropic API key

### Backend

```bash
cd backend
npm install
cp .env.example .env        # fill in DB URL + JWT secret + Anthropic key
npm run migration:run
npm run start:dev
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env.local  # set NEXT_PUBLIC_API_URL
npm run dev
```

### Environment Variables

**Backend `.env`**
```
DATABASE_URL=postgresql://...
JWT_SECRET=your_secret
JWT_REFRESH_SECRET=your_refresh_secret
ANTHROPIC_API_KEY=sk-ant-...
```

**Frontend `.env.local`**
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## API Endpoints

| Method | Endpoint                        | Auth     | Description               |
|--------|---------------------------------|----------|---------------------------|
| POST   | `/auth/register`                | Public   | Create account            |
| POST   | `/auth/login`                   | Public   | Login, returns tokens     |
| POST   | `/auth/refresh`                 | Refresh  | Get new access token      |
| GET    | `/customization/options`        | Public   | Colors, fabrics, accessories |
| POST   | `/customization`                | User     | Save configuration        |
| POST   | `/orders`                       | User     | Create order              |
| GET    | `/orders/my`                    | User     | Get own orders            |
| PATCH  | `/orders/:id/status`            | Admin    | Update order status       |
| GET    | `/admin/orders`                 | Admin    | All orders (filter/export)|
| POST   | `/chat/message`                 | Public   | Send message to AI        |
| GET    | `/analytics/summary`            | Admin    | Popular colors + fabrics  |

---

## Testing

```bash
# API integration tests
cd backend && npm run test:e2e

# Frontend E2E (Playwright)
cd frontend && npx playwright test
```

Core flows covered:
- Full customization → order creation
- Auth (register, login, token refresh)
- Admin status update

---

## Deployment

| Service  | Platform | Notes                          |
|----------|----------|--------------------------------|
| Frontend | Vercel   | Auto-deploy on `main` push     |
| Backend  | Render   | Free tier, ~30s cold start     |
| Database | Supabase | Free tier, 500MB limit         |

---

## Future Enhancements

- 3D thobe preview (Three.js)
- Stripe payment integration
- AI-based personalized recommendations
- Advanced analytics dashboard
- Mobile app (React Native)

---

## Author

Built as a full-stack portfolio project demonstrating NestJS modular architecture, Next.js App Router, PostgreSQL schema design, JWT auth flows, and Claude AI integration.
