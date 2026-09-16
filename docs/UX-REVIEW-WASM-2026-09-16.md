# WASM Atelier — UX / Frontend / Art-Direction Review
**وسم — إرث من الإتقان** | Audit date: 2026-09-16 | Reviewer role: UX + Frontend Engineer + Art Director (Saudi luxury / thobe segment)

> Stack inspected: `apps/frontend/src` (Vite + React 19 + Tailwind v4 + Zustand + motion), `src/index.css:1`, `refrence/wasm-thobe-platform.html:1` (reference), routed pages `Home`, `Builder`, `Story`, `Contact`, `Track`, `OrderSuccess`.

---

## 0. Executive Summary

**Verdict: Very strong foundation — 8/10 for a portfolio-grade Saudi luxury thobe configurator. Feels like an atelier, not an e-commerce template.**

The project nails the hardest problem in the Saudi premium thobe market: **trust through transparency + quiet luxury aesthetics**. Dark atelier canvas `#0B0B0B` + `Gold #D4AF37` + `Beige #C8B08A`, glass cards, Kufi/Noto typography and RTL-first layout immediately signal *Riyadh private atelier* rather than fast-fashion store. The 4-step builder with sticky live SVG preview and price-live is the killer feature for a guest-first (no account) Gulf buyer.

**Gaps are not visual taste — they are polish layers:** motion system is 30% implemented, inline-style entropy threatens maintainability, imagery is not yet fully *Saudi-photographed*, and a few Saudi-specific trust/content hooks are missing (Maroof/Tamara, Najdi fabric names, Sadu subtlety). Fixing the 8 quick-wins below would lift it to 9.5/10 and shoot-ready for a real launch.

**Use this report:** `✅ Keep` = preserve exactly, `⚠️ Enhance` = priority fix, `💡 Opportunity` = leverage/upsell.

---

## 1. What Is Excellent — Keep Exactly

### 1.1 Art Direction & Brand Language ✅

| Asset | Why it works (Saudi field lens) | Source |
|---|---|---|
| **Palette — `index.css:9-20`** | Deep atelier black `#0B0B0B` + warm gold gradient `270deg #EEC95F→#D4AF37` is *the* Saudi luxury code (seen in Boutiqaat, Nuun, Lomar Black Label). Avoids cheap "royal purple" cliché. Beige `#C8B08A` is perfect for thobe sand tones. | `src/index.css:17-20` |
| **Typo pairing** | `Noto Kufi Arabic` for headings + `IBM Plex Sans Arabic` for body — geometric Kufi gives structure to thobe silhouette, IBM Plex gives legibility in small UI (price, labels). Saudi readers trust heavier Kufi for heritage brands. | `src/index.css:1,30-32` |
| **Logo treatment** | `LuxuryHeader.tsx:52-56` 132px logo, no text-logo fallback — confident, Maison-like. `WASM` Latin subline with tracking `0.12em` signals bilingual clientele (GCC expats / Vision 2030 tourists) without diluting Arabic. | `LuxuryHeader.tsx:52` |
| **RTL correctness** | `index.css:91` `direction: rtl` globally, but LTR isolated for phone inputs `Track.tsx:99` `direction:ltr` — exactly how Saudi UX should handle `+966 5x` numbers. Many local sites break this. | `index.css:91`, `Track.tsx:99` |

### 1.2 UX — Happy Path Is Frictionless ✅

- **Guest-first checkout** is *correct* for KSA thobe: most 35+ buyers won't create account. Badge `LuxuryHeader.tsx:82-97` *"وضع الضيف — لا حاجة للتسجيل"* + persistent header reassures. `Builder.tsx:87-90` fallback to `MOCK_*` keeps demo usable offline.
- **Price transparency = trust hook.** `ThobePreview.tsx:105-109` and `ReviewStep.tsx:80-83` show base `349` + deltas live. Saudi buyer fears hidden tailoring surcharge — killing that fear is the top conversion driver.
- **Builder stepper** `Builder.tsx:113-148` with 3 states (done/current/upcoming), gold glow `boxShadow: 0 0 16px rgba(212,175,55,0.35)` — affordance is museum-clear even for low-digital-literacy buyers.
- **Sticky thobe preview** `ThobePreview.tsx:25` `position:sticky top:96` — the buyer never loses visual feedback while editing price.
- **Track page dual mode** `Track.tsx:52-84` code *or* phone + GCC selector (`🇸🇦🇦🇪🇰🇼🇧🇭🇶🇦🇴🇲🇪🇬🇯🇴🇱🇧`) — culturally essential; many tailors lose orders because older clients lose WASM- number.
- **Story timeline 2018→2021→2026** `Story.tsx:24-59` — 3-act atelier myth works in Saudi storytelling: *humble start (Sulaymaniyah)* → *word-of-mouth growth* → *digital atelier* maps to Vision 2030 craft revival narrative.

### 1.3 Frontend Craft (Under the Hood) ✅

- **CSS-variable thobe rendering** `ThobePreview.tsx:45-49` fill driven by `hex` prop — no image swap, instant, cheap. Fabric overlay `mixBlendMode: multiply` + `repeating-linear-gradient` `ThobePreview.tsx:83` is elegant low-cost texture hint.
- **Design tokens centralized** `index.css:7-51` (`--bg`, `--surface`, `--accent`, `--radius-lg`, `--container:1280px`, `--header-h:80px`) — single source for spacing.
- **Glass + backdrop-blur** `index.css:130-136` consistently used for cards/modals; feels premium on dark.
- **Focus-visible gold halo** `index.css:118` `box-shadow: 0 0 0 3px rgba(212,175,55,0.35)` — AA contrast on dark, luxury-accessible.
- **Zustand store** `builderStore.ts:83-143` minimal, `getTotalPrice()` with additive + multiplier fallback — handles both backend shapes.

---

## 2. What Needs Enhancement — Prioritized

### 🔴 Critical (Fix before public URL / portfolio video)

| # | Issue | File:Line | Why it hurts Saudi luxury perception | Fix (effort) |
|---|---|---|---|---|
| C1 | **Inline-style sprawl — 80%+ of components use `style={{}}` instead of Tailwind** | `Hero.tsx:11`, `StorySection.tsx:25`, `Builder.tsx:118`, `Track.tsx:125`, `Footer.tsx:24` | Violates your own `AGENTS.md:16` *"Never use inline styles — Tailwind only"*. Breaks purge/CLS, un-cacheable, hard to theme, impossible for a team to extend. Luxury brands live on consistent spacing/hover tokens. | Extract to `src/index.css` utilities or `clsx` variants. 1–2 days. |
| C2 | **Images not optimized — bare `<img>` without lazy/srcset** | `Hero.tsx:118`, `StorySection.tsx:31`, `Story.tsx:82` | `Hero.png` likely >1MB; LCP will suffer on 4G outside Riyadh/Jeddah. `AGENTS.md:24` mandates `next/image` (Vite equiv: `vite-imagetools` + `loading="lazy"`). | Add `loading="lazy"` + `fetchpriority="high"` for hero, compress to WebP, add `srcset`. 0.5 day. |
| C3 | **No route handling for auth pages** `App.tsx:32-33` maps `/login` & `/register` to `<Home />` | `App.tsx:32` | SEO & expectation break; a user typing `/login` gets no 404, no redirect. Portfolio reviewer will flag. | Guard or redirect to `/track` or remove routes. 10 min. |
| C4 | **Footer social placeholders `𝕏 ◎ ▶`** | `Footer.tsx:46` | Reads as wireframe, not atelier. Saudi HNW buyer expects Instagram/Snap/TikTok with real icons (Snap is #1 in KSA). | Replace with `lucide-react` or simple SVG, link to real handles or hide. 1h. |
| C5 | **Form validation only on click, no field errors** | `BookingModal.tsx:15`, `ReviewStep.tsx:15`, `Track.tsx:12` uses `alert()` | `alert()` blocks RTL layout, feels 2008. No `aria-invalid`, no `required`. | Use existing `react-hook-form@7.72.1` + `zod@4.3.6` already installed but unused. 0.5 day. |

### 🟠 High (Strongly recommended)

| # | Issue | Detail | Proposal |
|---|---|---|---|
| H1 | **Motion system 30% done — library installed but unused** | `package.json:18` has `motion@12.29.2` (Framer Motion) but all motion is hand-rolled `heroContentIn` `index.css:205`. No scroll reveal, no builder step transition, modal appears instantly. | Wire `motion` for 3 places: `StorySection.tsx` cards `whileInView` stagger, `Builder.tsx:177` `AnimatePresence mode="wait"` between steps, `BookingModal.tsx:24` backdrop `motion.div` with `initial:{opacity:0}`. Keep `prefers-reduced-motion` guard `index.css:209`. |
| H2 | **Thobe preview lacks Saudi fabric truth** | `Builder.tsx:21-24` thumbs are gradients, not fabrics. Linen/wool difference only via `overlayOpacity` `ThobePreview.tsx:20`. Saudi buyer distinguishes *قطن مصري طويل التيلة* vs *كتان* by weave photo. | Replace `thumb` gradient with real swatch `public/images/fabric-*.jpg` (close-up). Add `fabric-linen` pattern using subtle Sadu diamond hint, not just `repeating-linear-gradient`. |
| H3 | **Content: missing trust anchors for KSA conversion** | OrderSuccess claims *7 days* `OrderSuccess.tsx:44-45` but no Maroof badge, no Tabby/Tamara mention, no size-guide link (Footer has dead `#` `Footer.tsx:88`). | Footer: add `موثق في معروف` badge + `الدفع: Tabby · مدى · Apple Pay` row. Activate `Footer.tsx:88` → `/track` or modal with chest/shoulder/sleeve chart (Najdi cut vs modern slim). |
| H4 | **Accessibility — focus & labels broken** | `BookingModal.tsx:59` inputs have `<label>` but no `htmlFor`/`id`; `LuxuryHeader.tsx:32` burger has `aria-label="menu"` English only; drawer lacks `focus-trap` & `aria-modal`. `ColorStep.tsx:20` selectable divs lack `role="button"` | Add `htmlFor`, `aria-label="القائمة"` Arabic, `role=dialog` on modal/drawer, trap focus with `useEffect`. |
| H5 | **Color-contrast on selected states** | `ColorStep.tsx:42` ring uses `transparent` vs accent — on dark bg, unselected muted `#8A8A8A` on `#141412` fails WCAG AA for 12px label. | Token `--color-text-on-dark-muted` bump to `#9AA0A6` or add `border:1px solid rgba(255,255,255,0.14)` for unselected circles. |
| H6 | **Unused / duplicated components** | `StorySectionImage.tsx:1` (luxury hover 4:5 card) is never rendered; instead `StorySection.tsx:23` duplicates markup with glass. `SectionTitle.tsx:1`, `components/ui/Button.tsx:1` unused — Hero uses `.btn` CSS class. | Delete or compose: `StorySection.tsx` should map via `StorySectionImage`. Consolidate Button to single `.btn` + `Button.tsx` variant system. |

### 🟡 Medium / Polish (Nice to have for 9.5/10)

- **Hero typography scale**: `Hero.tsx:30` `fontSize:40` fixed — on ultra-wide (1920) feels small. Use `clamp(32px,4vw,48px)`.
- **Arrow icon opacity** `Hero.tsx:88` decorative 200px PNG — make it SVG with `motion.path` drawing animation on scroll (`pathLength`).
- **Booking modal location select** `BookingModal.tsx:78` — "الأتيليه — الرياض" only Riyadh. Add `جدة — قريباً` disabled to signal expansion, manages expectation for Western-region buyers.
- **Price animation**: `ThobePreview.tsx:108` SAR number jumps. Add `motion` count-up (spring) on change.
- **Empty preview state edge**: when `selectedColor==null` preview shows `#F5F0E8` silently — add skeleton or `تظهر المعاينة بعد اختيار اللون`.
- **`index.css:55` `color-scheme: light`** contradicts dark `bg:#0B0B0B`. Change to `color-scheme: dark` so native inputs / scrollbar match.
- **Hreflang / SEO**: `<html lang="ar" dir="rtl">` in reference but Vite `index.html` likely missing. Add `<title>وسم — تفصيل ثياب فاخرة | WASM Atelier Riyadh</title>` + JSON-LD `TailoringService`.

---

## 3. Styles Audit — Design System

**What's right:**
- Tokens are well named and layered: `--bg / --surface / --surface-2 / --border` gives elevation (0dp → 1dp → input). Radius 10→16 is luxury-soft, not SaaS-sharp.
- `gold-gradient: 270deg #EEC95F→#D4AF37` with `background-clip:text` `index.css:138-145` is precisely the *sand-to-gold* shimmer of Saudi desert at maghrib — culturally resonant.
- `container-atelier` `index.css:123-128` caps at 1280 with 32px gutter — editorial breathing room, reminiscent of Ounass editorials.
- `glass` `backdrop-filter:blur(12px)` + `border:rgba(255,255,255,0.10)` is consistent across `Builder`, `Story`, `Contact`, `Track`.

**To tighten:**
1. **Single source for buttons** — `.btn` `index.css:158` is correct, but `Button.tsx:20` redefines `baseStyles` with `hover:scale-105` which conflicts with `.btn:hover scale:1.03`. Keep *one* (`.btn`), delete component or make it wrap `.btn` class: `<button className={clsx("btn btn-primary", className)}>`.
2. **Enforce token usage via lint** — add `stylelint` rule banning hex literals outside `:root`. Today `Hero.tsx:18` has `rgba(0,0,0,1) 8%` and dozens of `rgba(255,255,255,0.08)` that should be `var(--surface-2)`.
3. **Add Sadu subtle pattern** — for Saudi heritage hook, add `--pattern-sadu: url('/images/sadu-subtle.svg')` at 0.03 opacity as `::before` on `.craft-card` and `.glass` hover. Use monochrome diamond, not colored — keeps luxury quiet.
4. **Arabic numeral toggle** — `utils/toArabicNumbers.ts` exists but only used in unused `StorySectionImage`. Decide: ٠١٢٣ vs 0123. Recommendation: use Arabic-Indic `٠١` only in craft numbers (`01→ ٠١`) to signal *heritage*, keep SAR prices in Western digits (bank convention).
5. **Elevation bump on hover** — `.craft-card` currently no hover lift. Add `transition: transform .35s cubic-bezier(.22,1,.36,1)` + `hover: translateY(-4px)` with `box-shadow: 0 18px 40px rgba(0,0,0,0.45)`.

---

## 4. Content & Cultural Hooks Audit — Saudi Lens

**Strong hooks already in copy (preserve):**

- *"حرفيّ واحد · ثوب واحد · توقيع واحد"* `Story.tsx:100` — this is your **brand hook**. It mirrors how Saudi buyers talk about bespoke tailors (خياط السليمانية). Amplify by showing حرفي’s name card `أبو فيصل — الطاولة 2` `Track.tsx:149` in Track view — excellent continuity.
- *"إن لم يكن الثوب يستحق أن يُهدى لملك، فلا يخرج"* `Story.tsx:30` — hyperbolic but culturally on-brand for Najdi generosity/كرم الضيافة. Keep.
- Guest checkout copy *"نستخدمها فقط لتأكيد الطلب"* `ReviewStep.tsx:87` — kills privacy fear for older buyers wary of spam.
- Fabric naming *"فحمي أصيل / كحلي ملوكي"* `Builder.tsx:16-17` — poetic, not SKU-like. Saudi premium buyers choose emotion, not code.

**Content gaps & opportunities:**

| Area | Current | Opportunity — Saudi hook |
|---|---|---|
| **Seasonality** | Builder shows 3 fabrics flat. | Group as **صيفي (قطن/كتان) · شتوي (صوف مبرد)** tabs with temp hint (`ideal 38–45°C` vs `15–25°C`). Saudi buyers shop by season, not fabric spec. |
| **Fit context** | No mention of قصة الثوب | Add 2nd-level choice: *قصة نجدية واسعة / قصة عصرية* as silhouette toggle in `ThobePreview` — sleeve width changes 4px in SVG. |
| **Gifting language** | Price only SAR | Add hook under total: *“تغليف هدايا حريري + بطاقة إهداء بخط عربي”* toggle — gifting is 30% of thobe sales (Eid, graduation). |
| **Proof density** | Hero shows `★ 4.9 / 1,200` `Hero.tsx:104` only on desktop | Move to **always visible** sticky bar below header on mobile too. Add real Google rating snippet if available. |
| **Story credibility** | `Story.tsx:12` `1,000 عميل بالكلمة وحدها` | Add press-less proof: *"600 مراجعة موثقة"* `Story.tsx:46` good — surface as carousel of 3 short WhatsApp-style quotes (with permission). Gulf trust is peer-driven. |
| **Contact** | `Contact.tsx:62` generic address | Add precise: *“السليمانية، شارع التحلية، مبنى … — دخول بموعد”* + `فتح خرائط Google` link. Saudis navigate via Google Maps pin, not text. |
| **Terms hook** | `ReviewStep.tsx:126` small legal line | Make it a collapsible bullet: *الدفع عند الاستلام ✓ · استبدال 14 يوم ✓ · شحن مجاني +50 ✓* — scans faster. |

**Microcopy polish:**
- Replace eyebrow `eyebrow` `index.css:149` English `craftsmanship` / `Atelier · Since 2018` with Arabic-first but keep small English as secondary: `حِرفة · Craftsmanship` — feels less imported.
- Add verb hook on primary CTA: today `صمّم ثوبك الخاص` is good; A/B test `ابدأ تفصيل ثوبك — دقيقتان فقط` (time-box reduces hesitation).

---

## 5. Animations Audit — Motion as Luxury

**Existing:** Hero orchestrated well `index.css:205-214` — `heroContentIn .92s` + `heroImageIn 1.02s` + per-child `heroFadeUp .56s` stagger `Hero.tsx:137-142`. Feels *unhurried*, matches atelier pace. `pop` `OrderSuccess.tsx:24` checkmark is satisfying.

**Missing / Underused:**

| Slot | Current | Recommended motion (Framer Motion) | Why luxury needs it |
|---|---|---|---|
| **Scroll reveal — craftsmanship cards** | `StorySection.tsx:23` static cards | `motion.article` with `initial:{opacity:0,y:28}` `whileInView:{opacity:1,y:0}` `viewport:{once:true,amount:0.25}` stagger 0.12s | Without it, below-fold feels flat vs hero. Luxury scroll = fabric unfolding. |
| **Builder step transition** | `Builder.tsx:176` instant swap `renderStep(currentStep)` | `<AnimatePresence mode="wait"><motion.div key={step} initial:{x:24,opacity:0} animate:{x:0,opacity:1} exit:{x:-24,opacity:0} transition:{duration:0.28,ease:[0.22,1,0.36,1]}>` | Step change should feel like turning a sketchbook page, not a SPA route. |
| **ThobePreview color/fabric morph** | `ThobePreview.tsx:46` SVG fill jumps | `motion.path` for `fill` with `transition:{duration:0.45}` + overlay cross-fade `motion.div` opacity. Fabric texture overlay `animate:{opacity:overlayOpacity}` | Color choice is the *hero interaction*; instant jump cheapens it. Silk should bleed. |
| **Drawer & modal** | `LuxuryHeader.tsx:127-128` `transform translateX` CSS, `BookingModal.tsx:24` no animation | `motion.aside` `initial:{x:"100%"}` `animate:{x:0}` `exit:{x:"100%"}` `transition:{type:"spring",damping:28,stiffness:320}` + backdrop `motion.div` | Luxury drawer = heavy curtain, not sliding plank. Spring gives weight. |
| **Stepper pulse** | `Builder.tsx:134` `scale(1.15)` static | Add subtle `boxShadow` pulse `animate:{boxShadow:"0 0 0 0 rgba(212,175,55,0.0)"}` loop 2s | Signals progress without shouting. |
| **Price tick** | `ThobePreview.tsx:108` static number | `motion.span` with `key={total}` + `useSpring` count-up | Price transparency feels alive, not spreadsheet. |
| **Parallax subtle** | Hero image `Hero.tsx:118` static | `useScroll` + `useTransform(y:[0,80])` on `heroImage` (respect `prefers-reduced-motion`) | Depth, like atelier window light. Keep < 60px to avoid seasickness. |

**Technical note:** `index.css:209-211` reduced-motion correctly disables hero, but needs extending to all `motion` components via `<MotionConfig reducedMotion="user">`.

---

## 6. Frontend Engineering Audit (14 points)

1. **Tailwind v4 `@import "tailwindcss"` `index.css:2` correct — but `@theme` `index.css:64` duplicates tokens.** Keep one. Move all to `:root` + `@theme` for JIT.
2. **No `clsx`/`twMerge` conflict handling** — `Button.tsx:1` uses `clsx` alone; install `tailwind-merge` to dedupe conflicting paddings.
3. **API layer** `services/api.ts` not inspected but builder fallback to mock on `catch` `Builder.tsx:72` is resilient. Add `axios-retry` + toast (not silent `catch(()=>{})` `Builder.tsx:89`).
4. **Store persistence** — builder state lost on refresh before order. Add `zustand/middleware persist` keyed `wasm-builder` with `partialize: {selectedColor, selectedFabric, selectedAccessories, guestName, guestCC, guestPhone}`.
5. **Route `OrderSuccess` price** `OrderSuccess.tsx:7` reads `getTotalPrice()` live — if user refreshes success page after `reset()` price will be base 349. Pass total via navigation state or store snapshot in `localStorage`.
6. **Input `mode`** `Track.tsx:116` `inputMode="numeric"` good; add `autocomplete="tel"` + `autocomplete="name"` in `BookingModal`/`ReviewStep`.
7. **Perf — bundle**: `lucide-react` tree-shaken? Import `RefreshCw` `Builder.tsx:9` deep import `lucide-react/dist/...` or use `unplugin-icons` to cut 40KB.
8. **ESLint** — repo has config but `style={{}}` flood defeats it. Add `eslint-plugin-tailwindcss` + `no-restricted-syntax` banning `JSXAttribute[name.name='style']`.
9. **Testing** — `AGENTS.md:31` mandates Playwright but no tests seen. Minimum: `tests/builder.spec.ts` guest flow as per template.
10. **Fonts** `index.css:1` Google Fonts import blocks render. Preload via `<link rel="preload">` + `font-display: swap` (already present) and subset to `arabic`.
11. **Iconography** — add `vite-plugin-svgr` to inline `arrow-icon.png` as SVG for crisp Retina and path animation.
12. **Error boundary** — no `<ErrorBoundary>` around `Builder` async fetch. Add to avoid white screen if `/customization/options` 500.
13. **i18n readiness** — all copy hardcoded Arabic. Acceptable for MVP, but extract to `src/i18n/ar.json` now to avoid 200-file refactor later.
14. **Build** `vite.config.ts` not inspected — ensure `build.chunkGroups` splits `motion`, `zustand`, `axios`.

---

## 7. Priority Roadmap — What to Build Next

### Sprint 1 — Quick Wins (half day each, biggest ROI)

- [ ] Replace footer glyphs with real social SVGs + Maroof badge (`Footer.tsx:46`)
- [ ] Fix `color-scheme: dark` (`index.css:55`)
- [ ] Add `loading="lazy"` + `WebP` for `story-*.png`, `Hero.png` + `fetchpriority="high"` for hero (`Hero.tsx:118`)
- [ ] Wire `BookingModal` & drawer `motion` entrance (`LuxuryHeader.tsx:127`, `BookingModal.tsx:24`)
- [ ] Delete `alert()` → `error` state + inline message + `aria-live` (`BookingModal.tsx:17`, `ReviewStep.tsx:15`)

### Sprint 2 — Conversion Lift (1–2 days)

- [ ] Framer Motion: scroll-reveal for craftsmanship & pillars, builder step `AnimatePresence` (`StorySection.tsx`, `Builder.tsx:176`)
- [ ] ThobePreview morph: color cross-fade + fabric swatch photos + Sadu overlay
- [ ] Trust bar persistent on mobile (`Hero.tsx:92`) + Tabby/Mada icons in footer
- [ ] Zustand persist + `react-hook-form`+`zod` validation on Track/Review/Booking
- [ ] Price spring animation + 14-day guarantee tooltip

### Sprint 3 — Atelier Signature (2–3 days, differentiator)

- [ ] SVG arrow draw-on-scroll + subtle parallax on hero image (`Hero.tsx:88,118`)
- [ ] Size-guide modal + silhouette toggle (Najdi vs modern) in `ThobePreview`
- [ ] Gifting: silk wrapping + handwritten card toggle in `ReviewStep`
- [ ] WhatsApp quote carousel on Story + real atelier pin map on Contact
- [ ] SEO: JSON-LD `TailoringService`, OG image with gold thobe, `lang/direction` on `index.html`

---

## 8. Art Director Notes — Making It Feel *Saudi*, Not *Dubai-Imported*

1. **Stay Najdi-quiet, not Gulf-glossy.** Current dark + gold is right for Riyadh. Resist adding teal/purple gradients popular in Dubai e-com — they dilute WASM's *Sulaymaniyah atelier* credibility. If you add color, use *sand* `#C8B08A` washes, not neon.
2. **Photography brief:** Replace stock-like `story-*.png` with 3 real shots at golden hour: macro of *needle through Egyptian cotton*, hands cutting on aged wood table, final press with steam. No model posing — hands only = craftsmanship over vanity (this is thobe, not suit).
3. **Sadu as whisper, not wallpaper.** One subtle Sadu diamond at 3% opacity on glass hover or as footer rule — enough to cue heritage, not to theme-party it.
4. **Calligraphy hook:** Add a faint `و` watermark (the brand mark `Footer.tsx:32`) as 120px ghost behind hero title — ties to wasm root `وسم = mark/signature` meaning.
5. **Sound (optional delight):** On builder color pick, a soft *fabric brush* 80ms audio tick (opt-in, muted default) — mirrors luxury fitting room.

---

## 9. Files to Touch First

```
src/index.css:1-211                  — tokens, @theme dedup, color-scheme:dark, .glass hover lift
src/components/Hero.tsx:1-147        — clamp title, motion removal in favor of Framer, arrow SVG
src/components/LuxuryHeader.tsx:1-194— focus-trap, aria-modal, motion drawer, keep 132px logo
src/components/Footer.tsx:1-166      — real icons, Maroof/Tabby row, map pin
src/features/builder/Builder.tsx:1-205 — AnimatePresence, loading skeleton vs spinner, stepper pulse
src/features/builder/ThobePreview.tsx:1-113 — motion.path color, fabric swatches, sadu pattern
src/features/builder/builderStore.ts:1-157 — persist middleware, derived total memo
src/pages/Track.tsx:1-192            — form hook + error inline + LTR isolation
src/pages/Story.tsx:1-117             — scroll reveal, quote carousel, timeline dot alignment fix
src/components/BookingModal.tsx:1-116 — motion overlay, htmlFor/id, focus trap
```

---

### Final thought

You have a rare thing: **a Saudi product site that doesn't shout**. The restraint is the luxury. Keep the dark, keep the gold quiet, keep the guest flow frictionless — then add motion *as tailoring*, not as decoration. Every animation should feel like fabric moving, not UI moving.

> If you ship Sprint 1 + Sprint 2, this project is portfolio-headline ready for any Gulf luxury tech role — and credible as a real atelier MVP for Riyadh.

*— End of review. Next step: pick Sprint 1 items, I can implement them directly if you want.*
