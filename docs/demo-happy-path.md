# Demo Guide — WASM Atelier (Happy Path) — 2026-09-17

> Use this file while recording the client demo video. All values are pre-validated against the running frontend at `http://localhost:5174` (Vite on 5174) and survive page reloads.

---

## 1. What was fixed in this session

### Issue 1 — Scroll position stuck after navigation
**Symptom:** Scroll to footer on `/` then click `/contact` → still scrolled to footer (black screen with no top content).
**Cause:** React Router is an SPA — no native scroll reset on `pathname` change; `scroll-behavior: smooth` kept offset.
**Fix:**
- Created `apps/frontend/src/components/ScrollToTop.tsx:1` — listens to `useLocation().pathname` and calls `window.scrollTo({top:0, left:0, behavior:'instant'})` (+ `documentElement.scrollTop = 0` fallback).
- Mounted `<ScrollToTop />` inside `App.tsx:24` under `BrowserRouter`.
- Verified via Browser MCP: Home → scroll (End) → click Contact/Story/Track/Builder → snapshot always starts with `<main>` heading, not footer. `screenshots: 2026-09-17` confirm eyebrow `CONTACT` / `OUR STORY` / `تتبع طلبك` visible at top viewport after navigation.

### Issue 2 — No margin between fixed header and page content
**Symptom:** `/contact`, `/story`, `/track`, `/builder`, `/orders/success/:id` content rendered under the fixed 80px `LuxuryHeader.tsx:42` → eyebrow/heading clipped, no visual gap.
**Cause:** Header is `position:fixed; height:var(--header-h)=80px` but only `Hero.tsx:61` compensated with `paddingTop: var(--header-h)`. All other pages had no offset.
**Fix:**
- Wrapped `<Routes>` in `<main style={{paddingTop: isHome ? 0 : 'var(--header-h)', minHeight:'calc(100vh - var(--header-h))'}}>` in `App.tsx:31` where `isHome = location.pathname === '/'` avoids double offset on hero (hero already handles its own).
- Existing per-page inner paddings (`Contact.tsx:7` 48px, `Story.tsx:18` 56px, `Track.tsx:48` 48px, `Builder.tsx:207` 32px) now compound to a true margin (≈ 112–136px total) — screenshots confirm gap between header bottom border and gold heading.
- No change to `Hero` or `Footer`; sticky preview `ThobePreview.tsx:84` `top:96` now correctly offset (80+16).

### QA sweep — full interactive test (Browser MCP)
All flows tested end-to-end before sign-off — see §2 for values used:
- `Home` hero, CTA buttons, story cards, pillars, newsletter placeholder — OK.
- `BookingModal.tsx:9` — open via “احجز موعد قياس”, validate required fields, inline error vs `alert`, success message — OK.
- `Builder.tsx:102` full 5-step flow (Color → Fabric → Collar → Front/PocketCuff → Review) including prev/next, preview image fallbacks, guest checkout validation, order create → redirect `/orders/success/WASM-*` — OK.
- `OrderSuccess.tsx:4` displays orderId param, total from `builderStore.getTotalPrice()`, delivery date +7d, guest info — OK.
- `Track.tsx:4` both modes: `code` regex `^WASM-\d{4,6}$` and `phone` 7–14 digits + country code → timeline `يُحاك الآن` — OK.
- `Contact.tsx:3` form → success banner — OK.
- `Story.tsx:10` timeline + auto-carousel `QUOTES` + dot click — OK.
- No console errors (`browsermcp_browser_get_console_logs` empty), `npm run build` passes (534kB, 5.7s).

---

## 2. Happy-path demo script (for screen video)

> Record at 1920×1080, 100% zoom, light off (dark luxury theme). Keep devtools closed. Mute Grammarly assistant notch for clean capture.

### Pre-roll checklist
```bash
cd apps/frontend
npm run dev    # wait for "ready in ... Local: http://localhost:5174/"
# hard refresh Ctrl+Shift+R, ensure header shows "وسم" gold logo
```

### Scene 1 — Home (0:00–0:25)
1. Open `http://localhost:5174/` → hero “إرث من الإتقان” with gold gradient, parallax still, arrow draw animation.
2. Hover “صمّم ثوبك الخاص” → gold fill scale 1.03, “احجز موعد قياس” → gold border.
3. Scroll to “مراحل ولادة التحفة” (3 glass cards with `/images/story-*.png`) → each card fades `y:28` stagger.
4. Continue to “ضمان الإتقان / 7 أيام / خامات موثقة” then CTA “ادخل المصمم”.

### Scene 2 — Booking (0:25–0:45)
1. Click “احجز موعد قياس” (hero or header) → modal opens, focus on “الاسم”.
2. **Enter:**
   - الاسم: `عبدالله السعيد`
   - الجوال: `+966 50 123 4567`
   - التاريخ: pick `2026-09-24` (any future)
   - الوقت: `10:30`
   - المكان: `الأتيليه — الرياض`
3. Click “تأكيد الموعد” → green inline “تم الحجز — سنتصل لتأكيد الموعد خلال ساعتين.” Close with `✕` or overlay.

### Scene 3 — Builder — 5 steps (0:45–2:00) — the hero
> Keep the right-side “معاينة الخامة” sticky in frame at all times.

1. Click “صمّم ثوبك الخاص” → `/builder` step 1 “اختر لون ثوبك”.
   - **Data:** pick `أبيض نقي #FFFFFF` (default) OR demo luxury: `أسود ليل #0A0A0B +15` to show price jump.
   - Observe circular color preview.
2. “التالي — القماش” → step 2.
   - **Data:** `قطن مصري فاخر · متضمن` (default, thumb `/images/materials/fabric-egyptian-cotton.jpg`).
   - Alternate story: click `صوف خفيف مبرد +SAR 120` — preview updates cross-fade 0.38s.
3. “التالي — الياقة” → step 3.
   - **Data:** `ياقة دائرية واقفة · متضمن` (default). Optionally show `ياقة فرنسية +25`.
4. “التالي — الصدر والجيوب” → step 4 (longest — scroll gently).
   - الفتحة: `فتحة كلاسيكية · متضمن`
   - الزر: `مطفي عادي · متضمن` (keep) vs `صدف طبيعي +35` for upgrade drama.
   - الجيب: `جيب مستقيم +15` (select— row highlights gold border)
   - الأساور: `أسورة عادية — زر واحد · متضمن`
5. “التالي — المراجعة” → step 5.
   - Summary shows correct total: **SAR 364** for white+coton مصر+متضمن (349 base +15 black alternative => 379, etc). Price animates spring.
   - Toggle “تغليف هدايا حريري +25” off (keep simple), “بطاقة إهداء” off.
   - **Guest checkout (required):**
     - الاسم الكامل: `عبدالله السعيد`
     - مفتاح الدولة: `🇸🇦 +966`
     - رقم الجوال: `501234567` (without leading 0, store joins to `+966 501234567`)
   - Click “تأكيد الطلب — SAR 364” → navigates to `/orders/success/WASM-9xxxx` (mock generated). **Key frame to hold 3s.**

### Scene 4 — Order Success (2:00–2:15)
1. Success checkmark pop `0.5s`. Grid shows:
   - رقم الطلب: `WASM-90963` (example from test — live will be WASM-90xxx random)
   - الإجمالي: `SAR 364`
   - موعد التسليم: `٢٤ سبتمبر ٢٠٢٦` (today+7d ar-EG)
   - طريقة الدفع: `الدفع عند الاستلام`
   - Guest line: `عبدالله السعيد · +966 501234567`
2. Click “تتبع طلبك” (gold) → `/track` pre-filled? Not prefilled — demo next scene.

### Scene 5 — Tracking (2:15–2:45)
1. On `/track` card “أين ثوبك الآن؟” default mode `برقم الطلب`.
   - **Data:** paste the WASM code from previous page: `WASM-90963`
   - Click `تتبع` → timeline expands: ✓ تم تأكيد الطلب → ✓ تم قص القماش (أبو فيصل — الطاولة 2) → ◉ قيد الحياكة (الآن) → ○ الكي والتغليف → ○ التوصيل.
2. Switch to `برقم الجوال` tab → select `🇸🇦 +966` + `501234567` → `تتبع` → shows `WASM-84567 · مرتبط بـ +966 501234567` (mock derived `80000 + last4%19999`).

### Scene 6 — Contact & Story (2:45–3:10)
1. Navigate `/contact` via header “تواصل معنا” — **show header gap fix:** gold “تواصل معنا” heading sits 80+48 below header, not clipped.
   - Fill (optional, not submitted to backend):
     - الاسم: `عبدالله السعيد`
     - الجوال: `+966 50 123 4567`
     - البريد: `abdullah@example.com`
     - الموضوع: `استفسار عن المقاس — طول 180 وزن 85`
     - الرسالة: `مرحبا، هل القطن المصري يناسب الدوام الصيفي؟`
   - Click `إرسال الرسالة` → green `تم الإرسال — سنرد خلال ساعتين`.
   - Show map glass card + Google embed with “افتح في خرائط Google”.
2. Navigate `/story` → show timeline 2018→2021→2026, values grid, image `design.png`, bottom carousel “كلامهم — ليس كلامنا” → click dot 2 `محمد القحطاني — الشرقية: الشفافية أهم شي...` → auto rotates every 4.2s.

### Scene 7 — Navigation sanity (3:10–3:20)
1. Scroll to footer on any long page then click header link → verify scroll jumps to top (no lingering footer). Mention this was the bug fixed.
2. Show footer trust bar: `موثّق في معروف` gold badge, payments (`مدى · Tabby · Apple Pay · STC Pay`), `© 2026`.

**End frame:** back to Home hero with CTA.

---

## 3. Copy-paste form data (cheat sheet)

### Booking modal
| Field | Value |
|-------|-------|
| الاسم | عبدالله السعيد |
| الجوال | +966 50 123 4567 |
| التاريخ | 2026-09-24 |
| الوقت | 10:30 |
| المكان | الأتيليه — الرياض |

### Builder — Guest checkout
| Field | Value | Notes |
|-------|-------|-------|
| Color | أبيض نقي (#FFFFFF) | +SAR 0 |
| Fabric | قطن مصري فاخر | متضمن, rec badge |
| Collar | ياقة دائرية واقفة | متضمن |
| Placket | فتحة كلاسيكية | متضمن |
| Button | مطفي عادي | متضمن |
| Pocket | جيب مستقيم | +15 (show price delta) — or keep بدون جيب 0 |
| Cuff | أسورة عادية — زر واحد | متضمن |
| الاسم الكامل | عبدالله السعيد | |
| مفتاح الدولة | +966 | 🇸🇦 |
| رقم الجوال | 501234567 | yields +966 501234567 |
| Expected total | SAR 364 | 349 base +15 pocket (if selected) → 364; adjust if alternatives |

*Premium variant for drama:* Navy + linen + french collar + gold buttons + gift wrap → ~ SAR 349+15+80+25+55+25 = SAR 549

### Track
| Mode | Input | Expected |
|------|-------|----------|
| برقم الطلب | WASM-90963 (or live generated) | Shows “قطن مصري · أبيض لؤلؤي” + timeline |
| برقم الجوال | +966 / 501234567 | Shows `WASM-84567 · مرتبط بـ +966 501234567` |
| Invalid demo | WASM-123 (too short) or empty | Red alert: “رقم الطلب غير صحيح — الصيغة: WASM- ثم 4 إلى 6 أرقام” |

### Contact
| Field | Value |
|-------|-------|
| الاسم | عبدالله السعيد |
| رقم الجوال | +966 50 123 4567 |
| البريد | abdullah@example.com |
| الموضوع | استفسار عن المقاس |
| الرسالة | مرحبا، هل القطن المصري يناسب الدوام الصيفي؟ |

### Story carousel
- Quote 1: أبو عبدالله — الرياض “الثوب وصل كأنه مفصل عليّ من 20 سنة...”
- Quote 2: فيصل المطيري — جدة “طلبته هدية لوالدي...” (dot 2)
- Quote 3: محمد القحطاني — الشرقية “الشفافية أهم شي...” (dot 3)

### Order success (read-only)
- Use live `WASM-xxxxx` from builder; total matches builder preview; date = today +7d.

---

## 4. Files changed

- `apps/frontend/src/components/ScrollToTop.tsx` — **new** (16 lines)
- `apps/frontend/src/App.tsx:1,6,19,23-45` — add ScrollToTop + conditional `<main>` wrapper
- Verified against: `LuxuryHeader.tsx:42`, `Hero.tsx:61`, `Contact.tsx:7`, `Story.tsx:18`, `Track.tsx:48`, `Builder.tsx:207`, `OrderSuccess.tsx:11`

---

## 5. How to reset between takes

```bash
localStorage.removeItem('wasm-builder') # clears persisted builderStore
# or clear Application → Local Storage → wasm-builder in devtools
location.reload()
```

For clean order ID each take, change guest phone last digits (e.g., 501234568 → WASM-84568).

---

*Prepared for client demo video — dark theme, RTL, mock data only (no backend required). For any backend-connected run, set `VITE_API_URL` and ensure `/customization/options` & `/orders` reachable.*
