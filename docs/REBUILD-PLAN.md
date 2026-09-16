# WASM Thobe — Rebuild Plan (Reference → React)

> **Source:** `apps/frontend/refrence/wasm-thobe-platform.html` (single-file open-design output, 1371 lines, RTL, guest checkout)
> **Target:** `apps/frontend/src` (React + Vite + Tailwind + Zustand + react-router)
> **Goal:** Reset and **remake every page/component exactly from the reference**, pixel-close, keeping React architecture but matching visual tokens, layout, and behavior.

---

## Snapshot — What the Reference Contains

**Single HTML with hash-routing, no build step:**
- **Shell:** fixed topbar (132px logo), desktop nav 40px gap, ghost-gold + guest pill, burger + drawer (80%/336px, overlay 0.7), footer 4-col
- **Home:** hero mobile (full bg + gradient) + hero desktop (content 1fr / visual 1fr with fade/slide animations), craft 3-card grid, pillars 3, CTA glass strip
- **Builder:** stepper 4 (44px circles), builder grid 1.15/0.85, colors 6-grid, fabrics list, addons 2-col, review lines, guest form (name + CC select + phone), sticky preview SVG (thobeBody/collar/placket/buttons/pocket/cuff + fabricOverlay), calcTotal `349 + colorPrice + fabricPrice + addons`, validation
- **Story:** hero 40px, timeline centered line, 3 rows alternating, values 2-col with design.png
- **Contact:** form 2-col + info 3 rows + map placeholder, success banner
- **Track:** tabs code/phone, inputs, error-box, result header + 5-step timeline (done/active)
- **Success:** check-circle pop, order grid 2x2, guest line injected
- **Booking modal:** fields + date/time/select, confirm banner
- **Tokens:** `--bg #0B0B0B`, `--accent #D4AF37`, `--muted #8A8A8A`, `--gold-gradient 270deg #EEC95F→#D7B14C→#D4AF37`, `--glass rgba(255,255,255,0.04) blur 12px`, mono JetBrains, radius 10/16, container 1280/32

**Images used:** `Hero.png`, `story-1..3.png`, `design.png`, `arrow-icon.png`, `wasm-logo.png` (vs ref `wasm-logo-1.png`)

**Guest mode:** builder/track/contact require no auth. `#view-auth {display:none !important}`. All flows are demo/localStorage with validation strings in Arabic.

---

## Phases — Split for Implementation

| Phase | Objective | Deliverables | Estimated Scope |
|---|---|---|---|
| **0. Design System** | Align tokens & globals so every component can reuse them | `index.css` update, fonts, utilities, scrollbar, focus | ~1-2 files, foundational |
| **1. Shell** | Rebuild header/drawer/footer + routing in guest mode | `LuxuryHeader`, `Footer`, `App.tsx` routes, `BookingModal` | 3-4 components, layout |
| **2. Home** | Exact home views from reference | `Hero`, `CraftSection`, `PillarsSection`, `CtaStrip`, `pages/Home` | 4 sections |
| **3. Builder** | Core commerce wizard + live preview | `builderStore`, `Stepper`, `ColorStep`, `FabricStep`, `AccessoriesStep`, `ReviewStep` (with guest form), `ThobePreview`, `Builder` page | Biggest, ~7 files + store |
| **4. Secondary** | Story/Contact/Track/Success + modals | `pages/Story/Contact/Track`, `OrderSuccess`, `BookingModal` | 4 pages + shared |
| **5. Polish** | Animations, responsive QA, backend wiring, a11y | animations, api integration, validation, empty states | cross-cutting |

---

## Phase 0 — Design System Alignment

**Objective:** Make `index.css` match the reference `:root` and utility classes so later phases have zero drift.

**Tasks:**
- [ ] **0.1** Update `:root` to reference tokens: `--bg #0B0B0B`, `--surface #141412`, `--surface-2 rgba(255,255,255,0.04)`, `--surface-input rgba(255,255,255,0.08)`, `--border rgba(255,255,255,0.10)`, `--border-soft rgba(255,255,255,0.08)`, `--accent #D4AF37`, `--accent-dark #C9A634`, `--beige #C8B08A`, `--accent-soft color-mix 14%`, `--gold-gradient`, `--font-mono`, radii, container/gutter/header-h
- [ ] **0.2** Add global utilities mirroring reference: `.container` (1280/24→32), `.glass` (surface-2 + border + blur 12), `.gold-text` (gradient clip), `.eyebrow` (mono 11px 0.32em accent), `.btn`/`.btn-primary`/`.btn-outline`/`.btn-ghost-gold` (exact padding/hover scale 1.03/1.02 + brightness), `.ph-img`, scrollbar thin gold, focus-visible 3px accent
- [ ] **0.3** Ensure fonts preconnect + `@import` includes mono where needed (keep existing IBM/Noto, add JetBrains mono fallback), set `html {direction:rtl}`, `body` 16px/1.6 antialiased, `h1..h4` display 600 balance, `p` pretty
- [ ] **0.4** Copy/rename assets: ensure `wasm-logo.png` resolves for both `logo.png` and `wasm-logo-1.png` refs, verify `Hero.png`, `story-*`, `design.png`, `arrow-icon.png` available in `public/images`

**Acceptance:** `index.css` visually identical tokens to reference; `npm run dev` shows no visual regression on existing pages.

---

## Phase 1 — Shell (Header / Drawer / Footer / Routing)

**Objective:** Replace current header/footer with reference-accurate shell and switch to guest-mode routing (builder public).

**Tasks:**
- [ ] **1.1 Header — desktop** `LuxuryHeader.tsx`: fixed `h-80` topbar `rgba(0,0,0,0.9) blur 12`, inner `max-w-7xl`, logo 132px `wasm-logo.png` clickable → `/`, nav `gap 40` `14px rgba(255,255,255,0.8)` hover accent, active class on current route, actions `btn-ghost-gold 8/18 13px` + guest pill `rgba(255,255,255,0.06) border 0.08 + green dot 7px + 12px muted`
- [ ] **1.2 Header — mobile** burger `44x44` accent, drawer overlay `0.7` (open class), drawer `80% max 336px black left border 0.06`, header 92px logo + ✕, nav `gap 24 18px`, bottom CTA ghost-gold + guest pill, open/close transitions 0.34 cubic-bezier
- [ ] **1.3 Footer** new `components/Footer.tsx` per reference: `footer-grid 1.4/1/1/1.2` → `1/1` → `1`, glass social circles 36px, links hover accent, newsletter input+btn, copyright `rgba 0.36`
- [ ] **1.4 Routing — guest mode** update `App.tsx`: make `/builder`, `/track`, `/orders/success/:id` public (remove `ProtectedRoute` gate for builder/track), keep auth routes but hide legacy auth view globally (or keep for admin only), add `BookingModal` portal at app root, add `Footer` below `Routes`
- [ ] **1.5 Assets & a11y** ensure `aria-label` on burger/close, focus trap consideration for drawer, scroll lock when drawer/modal open

**Acceptance:** Header/footer pixel-match reference at 375/768/1100/1280; drawer toggles; navigation works without auth; no console errors.

---

## Phase 2 — Home

**Objective:** Recreate home view exactly: hero (both breakpoints) + craft + pillars + CTA.

**Tasks:**
- [ ] **2.1 Hero** `components/Hero.tsx` split: `.hero-mobile` (100vh-80, bg linear+radial+Hero.png, center flex, gap 28) + `.hero-desktop` (flex 1/1, content padded 56/32 text-center, visual with Hero.png absolute cover + after gradient). Content: eyebrow 0.45em, h1 40px gold-text, subtitle 24px, cta row flex gap 16 (btns 16/36 16px min 190 → desktop 280w column), arrow 200px, link-gold 20px 600, stats line mono 11px ★/dot. Animations: content 0.92s slide 36px, visual 1.02s +0.08s, fadeUp staggered 0.22-0.62s, reduced-motion fallback
- [ ] **2.2 Craft** `StorySection` rewrite to `.craft container`: head centered 720w eyebrow+h2 32px gold+p muted, grid 1→3 cols 900px, cards glass `min-h 380 radius 20 p 28` with bg `linear+url(story-*)`, num pill 44px mono 12px, content h3 22px p 14px 0.72
- [ ] **2.3 Pillars** `AtelierPillars.tsx`: section `pillars container`, header h3 22px + eyebrow, grid 1→3, pillar glass `p 28 gap 16`, icon 44px accent 0.08/0.22, h4 16px p 13px muted 1.8
- [ ] **2.4 CTA Strip** `CtaStrip.tsx`: container centered, glass `48/28 max 860` with radial gold glow 600x280, eyebrow + h2 30px + p 48ch muted + btn 14/36 16px + note 12px muted
- [ ] **2.5 Page composition** update `pages/Home.tsx` to stack `Hero + Craft + Pillars + CtaStrip` without extra container wrappers that break full-bleed

**Acceptance:** Home at mobile/desktop matches reference screenshots (gradients, card heights, spacing); animations run without jank.

---

## Phase 3 — Builder Wizard (Largest)

**Objective:** Rebuild builder to reference spec: stepper + 4 panels + sticky preview with live SVG.

**Data mapping (ref → store):**
- Colors ref: 6 `{cream #F5F0E8, sand #E8DCC6, stone #8A8A8A, charcoal #2B2B2B +25, navy #1A2332 +25, midnight #0A0A0B +15}` vs current 12 mock — align to 6 but keep extensibility for backend `/customization/options`
- Fabrics ref: 3 `{cotton +0 rec, wool +120, linen +80}` vs current 4 — unify, basePrice 349 (ref) vs 200 (current)
- Addons ref: 4 `{collar +45, cuff +35, emb +95, pocket +25}` vs current 4 different names/prices — map

**Tasks:**
- [ ] **3.1 Store** `features/builder/builderStore.ts`: add `basePrice 349`, map ref colors/fabrics/addons as defaults, keep `selectedColor` id string, `selectedFabric`, `selectedAddons` Set-like, add guest fields `guestName/cc/phone`, update `getTotalPrice()` to `349 + color.price + fabric.price + sum(addons)` and `calcTotal` helper, ensure `colors` include price
- [ ] **3.2 Stepper** new `components/Stepper.tsx` per ref: `.stepper` max 760, steps 44px mono 13px border 2px, current scale 1.15 shadow 16px accent, done ✓ accent, lines flex 1px (filled accent when `i < n-1`), labels 12px
- [ ] **3.3 Builder shell** `features/builder/Builder.tsx`: container `builder-shell` 32/64 padding, header centered eyebrow+32px gold h1+14px muted, `builder-grid 1→1.15/0.85` max 1120, main glass `p 28`, stepper, 4 `step-panel` with display toggle, nav btns outline/primary with chevrons, goStep 0.25s slide -12px, scrollTo top
- [ ] **3.4 ColorStep** per ref: `.color-grid 3→6`, `.color-opt` col center gap 8, circle 56px border 3px, hover 1.08, selected border accent shadow + ::after ✓ 18px accent, name 12px muted→white
- [ ] **3.5 FabricStep** per ref: `.fabric-list gap 12`, `.fabric-card` 16px pad border 1px 0.08 radius 14, hover border 0.14 scale 1.01, selected accent 0.06 + shadow, thumb 64px 10px, meta h4 15px p 13px, price mono 13px accent + check 18px circle
- [ ] **3.6 AccessoriesStep** per ref: `.addon-grid 1→2`, `.glass addon-card p 18` border accent when selected, addon-check 22px top-left, price mono 13px accent
- [ ] **3.7 ReviewStep + guest form** `ReviewStep.tsx`: review-lines flex col gap 10, review-line 14/16 14px, price-row, guest form glass `p 18 radius 14` with h4 15px + p 12px muted, fields `input 12/14 10px rgba 0.08 14px`, CC select 132px ltr + phone ltr numeric only, helper 11px, error-box hide/show, confirm btn flex 1 + price span, disclaimer 11px muted
- [ ] **3.8 Preview** `ThobePreview.tsx` exact SVG from ref: `viewBox 0 0 200 300`, paths `thobeBody #F5F0E8`, `thobeCollar`, `thobePlacket`, `thobeButtons`, `thobePocket`, `thobeCuff`, `fabricOverlay` repeating linear -8deg, stage radial+linear, update logic: fill col.hex, stroke isDark (`charcoal/navy/midnight`) → `rgba(255,255,255,0.14)`, toggles opacity for collar/buttons/emb/pocket/cuff, overlay opacity 0.22 linen / 0.08 wool / 0.12 else, preview texts (color/fabric/addons/price), sticky top 96
- [ ] **3.9 Validation & confirm** replicate `confirmOrder()` validations: name ≥2, phone 7-14 digits, digits strip, CC + phone combine, persist guestData, generate WASM-id if backend not available, show success with guest line, error focus

**Acceptance:** Builder matches reference at all breakpoints; selection updates preview instantly; price calc matches; guest validation works; can navigate steps; sticky preview works.

---

## Phase 4 — Secondary Pages

**Objective:** Replace placeholder Story/Contact/Track and build Success + Booking.

**Tasks:**
- [ ] **4.1 Story** `pages/Story.tsx`: hero centered 760w eyebrow+40px gold h1+17px muted 64ch, timeline max 980 with ::before 1px centered → 16px mobile, rows grid 1/1 → 1/1 on mobile with padding-right 40px, tl-card glass p 24, year mono 12px accent 0.12em, h3 20px p 14px, dot 12px shadow 6px accent, values section glass grid 1/1→1/1 28px with design.png 4/3 + overlay + badge 36px
- [ ] **4.2 Contact** `pages/Contact.tsx`: max 640 header eyebrow+32px gold, grid 1→1.1/0.9 980px, form glass p 24 grid 1/1→1/1, fields 13px muted label, input/textarea 12/14 rgba 0.08 focus accent 0.18, submit full, info column glass info-row 16px ic 42px accent 0.10/0.18 mono + map placeholder radial 300x180 + text, contactOk banner green 0.12/0.24
- [ ] **4.3 Track** `pages/Track.tsx`: card max 720 glass p 28 center, eyebrow+h2 28px+p 14px, tabs pill bg 0.06 4px radius 999 360w, byCode/byPhone rows, phone CC select ltr, inputs validation (code `WASM-\d{4,6}` uppercase, phone 7-14), error-box, result header 14px + badge accent, status timeline 5 items with line 1px, dots 30px (done accent, active transparent+shadow), h4 14px p 12px muted time mono 11px
- [ ] **4.4 Success** `features/orders/OrderSuccess.tsx`: wrap `calc(100vh-80) grid center p 40/16`, card max 560 glass p 36 center, check-circle 84px pop 0.5s, h2 26px+p 14px muted, order-grid 2x2 gap 10 text-right dt 11px muted mono dd 14px 600, guest line 13px accent 0.08/0.16, buttons flex gap 10
- [ ] **4.5 BookingModal** new `components/BookingModal.tsx`: fixed inset 70 z 66 bg, glass max 520 p 28 max 90vh overflow, header + ✕, p 13px muted, grid 1/1 fields, date/time/select, confirm + bookOk green banner, open/close display flex/none, overlay click closes
- [ ] **4.6 Remove legacy** delete or hide `features/auth` protected routing for builder (keep if admin needed else hidden per `#view-auth {display:none}`), ensure `ProtectedRoute` not gating guest flows

**Acceptance:** Each page matches reference layout/spacing/typography; forms validate Arabic strings; track result toggles correctly.

---

## Phase 5 — Polish & Integration

**Tasks:**
- [ ] **5.1 Animations** hero 0.92/1.02/0.56 staggered, step panel 0.25s -12px, pop 0.5s, hover scales 1.01-1.08, reduced-motion guard, scrollbar gold, transitions 0.16-0.3 ease
- [ ] **5.2 Responsive QA** test 375/768/1024/1100/1280/1440, drawer, grid collapses, typography wraps, RTL `direction: rtl` on containers, ltr overrides for phone/CC where reference uses `direction:ltr`
- [ ] **5.3 Backend wiring** keep fallback mocks but prefer `GET /customization/options` → map to ref shape (add price field), `POST /customization` for recommendation badge (optional), `POST /orders` with `customization_id + total_price + guestName + guestPhone (+CC)`; show OrderSuccess with real id when available; keep mock id `WASM-8xxxx` fallback
- [ ] **5.4 Validation & i18n** Arabic error strings exactly as ref, numeric-only phone, uppercase code, CC flag emojis, accessibility (labels, alt text, focus-visible), empty states
- [ ] **5.5 Housekeeping** remove unused `App.css`, ensure `vite build` passes, `npm run lint`, move `refrence` assets to `public/images` (ensure `wasm-logo.png` present for both names), update `README` if needed, commit per phase with conventional messages

**Acceptance:** No visual drift vs reference HTML opened side-by-side; lighthouse a11y passes; builder→success→track flow works with and without backend.

---

## Implementation Order & Commits

1. **Commit 0:** docs: add rebuild plan (this file)
2. **Commit 1:** style: align design system (Phase 0)
3. **Commit 2:** feat(shell): header/drawer/footer + guest routing (Phase 1)
4. **Commit 3:** feat(home): hero/craft/pillars/cta (Phase 2)
5. **Commit 4:** feat(builder): wizard + preview (Phase 3)
6. **Commit 5:** feat(pages): story/contact/track/success/booking (Phase 4)
7. **Commit 6:** polish: animations/responsive/backend wiring (Phase 5)

Each phase should be verifiable with `npm run dev` + visual diff against `refrence/wasm-thobe-platform.html` opened in browser.

---

## Risks / Notes

- Reference uses plain JS `history.replaceState('#view')`; React router uses `path` — keep paths `/`, `/story`, `/contact`, `/track`, `/builder`, `/orders/success/:id`, use `NavLink` active detection
- Reference hides auth; current `AuthContext` may remain for future admin but builder must be public — gate only admin routes
- Image `wasm-logo-1.png` vs `wasm-logo.png` — normalize (copy or alias)
- Price base 349 vs current 200 — align to 349 to match reference unless backend dictates otherwise; ensure `builderStore` price calc matches both
- Tailwind v4 with `@import "tailwindcss"` — add custom utilities via `@layer` where reference uses raw CSS
