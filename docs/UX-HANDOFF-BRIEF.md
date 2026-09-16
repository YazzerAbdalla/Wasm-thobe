# WASM — Thobe Platform — UX Handoff Brief
### For UX Engineer — Complete Visual & Experience Description
> **Date:** 16 September 2026  
> **Purpose:** Describe the project exactly as a visitor experiences it while scrolling — every section, visual detail, color, font, size, image, and interactive behavior — so the design can be rebuilt / upgraded from scratch without looking at code.  
> **Language of Interface:** Arabic-first, Right-to-Left (RTL) throughout.  
> **No code references below — pure visual / experience description.**

---

## 1. Project Stage — What Exists Today

**Stage: Functional MVP — visual prototype / early beta.** The platform is a premium e-commerce customizer for the traditional Saudi thobe. Core flow is fully clickable end-to-end (choose color → choose fabric → choose optional decorations → review price → confirm order → success screen). Authentication exists (login / create account), header adapts to logged in vs. guest, and protected routing redirects unauthenticated visitors to login. Three auxiliary pages (Our Story, Contact, Track Your Order) currently exist as simple placeholder screens with only a heading and one line of text — they are intentionally empty and waiting for your full UX treatment.

**What feels complete:** Home landing (hero + craftsmanship story), the 4-step builder wizard with live preview, the login / register screens, and the order confirmation success screen.

**What is intentionally incomplete:** Story, Contact, and Tracking pages; no footer; no real product photography gallery; no testimonials, FAQ, size guide, or footer sitemap. Images are stock luxury-style placeholders. The brand name visible throughout is **“وسم / WASM”**.

---

## 2. Brand Personality & Visual Direction

Imagine a luxury atelier — not a fast-fashion shop. The mood is **dark, minimal, gold-accented atelier** — like a high-end watch boutique adapted for traditional clothing.

*   **Feeling:** Quiet confidence, heritage craftsmanship meets modern minimalism. Calm, slow, spacious.
*   **Background:** Deep near-black everywhere (`#0B0B0B`). Never pure white backgrounds.
*   **Accent:** Warm gold is the only strong color (`#D4AF37`), used for headings, borders, active states, and gradients. Beige (`#C8B08A`) exists in the palette but is barely used yet — reserved for future lighter sections.
*   **Supporting tone:** Muted grey (`#8A8A8A`) for secondary text, dividers, and inactive states.
*   **Glass effect:** Many cards float over the dark background as frosted glass — very light white at 4% opacity, with a thin white border at ~10% opacity and a blur behind them (8px–12px). This is consistent across the builder, login, and success screens.
*   **Directionality:** Everything is RTL. Text aligns right on desktop; centered on mobile hero and centered headers. Navigation order reads right-to-left.

---

## 3. Global Design System — Tokens You Must Keep (or Consciously Replace)

### 3.1 Colors
| Token | Hex | Where you see it |
|---|---|---|
| Near Black | `#0B0B0B` | Page background, header background, builder background |
| White | `#FFFFFF` | Primary text, card text, gold-gradient fallback |
| Beige | `#C8B08A` | Defined but rarely visible — opportunity for light sections |
| Gold | `#D4AF37` | Headings, active step circles, selected borders, button fills, scrollbar thumb |
| Gold Darker Hover | `#C9A634` | Scrollbar thumb on hover |
| Muted Grey | `#8A8A8A` | Secondary descriptions, inactive step labels, dividers, helper text |
| Success Green | `#4ADE80` / `rgba(34,197,94,0.15)` border `rgba(34,197,94,0.3)` | Success screen checkmark circle |
| Error Red | `#F87171` / `#FCA5A5` on `rgba(185,28,28,0.2)` bg, border `rgba(185,28,28,0.4)` | Login/register errors, order error box |
| White transparent overlays | `rgba(255,255,255,0.04)` card bg, `rgba(255,255,255,0.08)` input bg, `rgba(255,255,255,0.1)` borders | All glass cards |
| Gold gradient | `270deg, rgba(238,201,95,1) 0% → rgba(215,177,76,1) 49% → #D4AF37 100%` | Headline gradient text and solid gold buttons |
| Amber overlay tints | `amber-900/10`, `amber-600/40`, `amber-500/60` | Decorative glows in story cards |

### 3.2 Typography
**Two Google Fonts, loaded globally:**
*   **Headings:** `Noto Kufi Arabic`, sans-serif, weight 600 (semi-bold). Used for every `h1–h6`.
*   **Body:** `IBM Plex Sans Arabic`, 300–700 available, default 400 regular, line-height `1.6`.

**Scale (exact sizes set as CSS variables):**
*   `xs — 12px (0.75rem)` — step labels, small badges, helper notes
*   `sm — 14px (0.875rem)` — secondary descriptions, input text, badges
*   `base — 16px (1rem)` — body default
*   `lg — 18px (1.125rem)`
*   `xl — 20px (1.25rem)`
*   `2xl — 24px (1.5rem)` — section `h3` size, hero paragraph `text-2xl`, primary buttons
*   `3xl — 32px (2rem)` — `h2` size
*   `4xl — 40px (2.5rem)` — `h1` size, main page titles, hero story headline

Headings are always `line-height 1.2` for `h1`. Paragraphs are `1.6`. All text uses `-webkit-font-smoothing: antialiased` and `optimizeLegibility`.

**Gold gradient text:** Headline words like “إرث من الإتقان” and “مراحل ولادة التحفة” are not solid gold — they are clipped gradient text using the gold gradient above, giving a subtle metallic shimmer left-to-right.

### 3.3 Rounding, Shadows, Blur
*   Cards: `16px (rounded-2xl)` for major panels; `8px (rounded-lg/xl)` for inputs and inner rows; `999px (full)` for circular step indicators and badges.
*   Shadows: `0 10px 30px rgba(0,0,0,0.06)` for white cards; `drop-shadow-xl` under the SVG thobe preview; soft gold glow `0 0 12px rgba(212,175,55,0.4)` around selected color circles, `0 0 16px rgba(212,175,55,0.15)` around selected fabric/add-on cards.
*   Backdrop blur: `blur(8px)` for builder panels, `blur(12px)` for auth cards, `backdrop-blur` for header (`black/90` background + blur).

### 3.4 Spacing & Layout Grid
*   Header height: `80px (h-20)`.
*   Main container: `max-w-7xl` centered, horizontal padding `24px (px-6)` on mobile, `32px` on larger screens. Builder uses `max-w-6xl` with `px-4 / py-10`.
*   Sections use generous vertical breathing: `py-16` mobile → `py-24` tablet → `py-32` desktop for the story section. Hero content gap is `36px (gap-9)` between elements.
*   All builder content sits `pt-20` below the fixed header so nothing hides under it.

### 3.5 Interactions & Motion
*   **Hover — all buttons scale slightly:** `scale(1.05)` on primary buttons, `scale(1.02)` on cards, `scale(1.1)` on color circles. This is the primary micro-interaction.
*   **Hover — borders:** Primary outline button border light grey `#9CA3AF` turns gold on hover. Color circles are transparent border by default, gold `3px` when selected. Fabric/add-on cards border goes from `rgba(255,255,255,0.08)` to gold `2px` when selected.
*   **Hover — header nav:** Desktop nav links are `white/80` by default, turn solid `gold` on hover. Mobile sidebar links same.
*   **Focus:** Any focused button shows a soft gold ring `0 0 0 3px rgba(212,175,55,0.35)` and no default outline.
*   **Motion library:** Framer Motion-style slides — step content fades and slides `x -20 → 0` in `0.25s easeInOut`, step indicators scale to `1.15` when current, with `0.3s` color transitions. Success icon springs in (`stiffness 200, damping 15`). Recommendation badge fades up `8px` with `0.35s easeOut`.
*   **Scrollbar:** Thin gold thumb `8px` wide, fully rounded, with `2px transparent padding` so it looks inset. Track is transparent. Firefox uses `thin` + `gold / transparent`. On hover thumb darkens to `#C9A634`.

---

## 4. Global Chrome — What You See on Every Page

### Fixed Luxury Header
Stays pinned to the top on every scroll (`fixed top-0 right-0 left-0 z-50`). Visual: `black at 90% opacity + backdrop blur`, bottom hairline `border white/5`. Height `80px`, inner content `max-w-7xl` centered.

**Right side (start of RTL):** Logo image — `logo.png` (width 132px). Gold-accented word “وسم” also appears in the mobile drawer header.

**Center (desktop only, hidden on mobile):** Horizontal nav `gap 40px`, text `14px (text-sm)` in `white/80`. Four links reading right-to-left:
1. الرئيسية (Home)
2. قصتنا (Our Story)
3. تواصل معنا (Contact)
4. صمّم ثوبك (Design Your Thobe)

Hover turns each link gold.

**Left side (desktop only):** Two buttons side-by-side `gap 12px`:
*   “تتبع طلبك” — transparent with `2px gold border`, white text, `px-5 py-2`. On hover: fills gold, text turns black.
*   “تسجيل الدخول” — solid gold (gradient gold on builder/success, flat `#D4AF37` in header), black text, semi-bold, `px-5 py-2 text-sm`. On hover: slightly brighter yellow (`yellow-400`). When logged in, this second button becomes a subtle “تسجيل الخروج” text link `white/60 → white` on hover, no background.

**Mobile (<1024px):**
*   Center/links hidden. Burger icon appears: gold `28px (w-7 h-7)` hamburger (three horizontal lines, stroke `1.5`).
*   Tapping opens a slide-in drawer from the right: `80% width, max 336px (max-w-sm)`, full height, solid black, `z-50`. Overlay behind it is `black/70` that fades in `0.3s`. Drawer interior `p-6` vertical layout:
    *   Top row: “وسم” in gold heading `18px` left, close “✕” in `white/70 → gold on hover` right, with `mb-10`.
    *   Middle: vertical nav `18px gap-24`, same four links, hover gold.
    *   Bottom (`mt-auto`): stacked full-width buttons `py-3 rounded-md` — top is outline gold “تتبع طلبك” (`border gold, text gold`), bottom is solid gold “تسجيل الدخول” or `white/10` logout.

---

## 5. Page-by-Page Scroll Walkthrough

### 5.1 Home Page — `/` — The Landing

When you land, the fixed header sits over content. Below it, the page is a vertical stack: **Hero → Craftsmanship Story**. No footer yet.

#### Hero Section
**Desktop layout (≥1024px):** Two equal halves side-by-side (`flex row`). Right half is content, left half is image. Content half is centered text, order 1 in RTL so it appears on the right. Image half holds the hero photograph.

**Mobile layout:** Single full-screen section `min-h-screen`, centered text over a background image. No side column.

**Background image file:** `Hero.png` — a tall, elegant portrait of a person in a white/cream thobe, soft studio lighting, luxury fabric texture visible. On desktop it is an `<img>` filling the half (`w-full h-full object-cover`). On mobile it is a CSS `background-image` covering the whole section (`cover, center`).

**Overlay:** A black gradient sits over the image to ensure text readability:
*   Desktop: `to-r (to left in RTL) from black via black/80 to transparent` — so the edge nearest the text is solid black fading to transparent over the photo.
*   Mobile: `to-l from black via black/80 to black/40` plus entire section is centered — heavier darkening so white/gold text pops.

**Hero content stack (top to bottom, centered, gap ~32–36px):**
1. **Eyebrow + Headline block:** Small uppercase tracking `0.45rem letter-spacing` line reading “craftsmanship” in gold gradient text, semi-bold, then directly below a large headline “إرث من الإتقان” also in gold gradient text, `40px heading font`. The two are grouped with `gap 28px`.
2. **Sub-paragraph:** `24px` white text: “ثياب نُشكّلها وفق أذواق مختارة، ومعالجة يدوية دقيقة.”
3. **Two call-to-action buttons side-by-side on mobile, stacked vertically on desktop** (`flex gap-20, justify-center` mobile vs `flex-col` desktop, `flex-wrap`):
    *   Primary: “صمّم ثوبك الخاص” — gold gradient background, black text, `px-20 py-4 text-24px semi-bold`, `hover: scale 1.05`. Links to `/builder`.
    *   Secondary: “احجز موعد قياس” — transparent with `1px light-grey border`, white text, same padding/font size. Hover border turns gold. Currently no navigation — visual only, awaiting UX for booking flow.
4. **Decorative arrow:** `arrow-icon.png` — a thin, golden, hand-drawn style swooping arrow pointing downwards, default width `200px`. Centered below buttons.
5. **Text link:** “اكتشف الرحلة” — gold, semi-bold, `20px`, links to `/story`. No underline by default, likely underline on hover via global `a`.

**Scrolling feel:** Hero is tall, airy, with lots of top padding (`pt-20`) so content breathes below the header. The gold headline immediately anchors the luxury tone.

#### Craftsmanship Story Section — “مراحل ولادة التحفة”
Immediately after hero, inside a `container mx-auto`. Full-width section `py-16 → 24 → 32`, `overflow-hidden`, background `linear-to-b from black via zinc-950 to black` (very subtle dark gradient that lightens just slightly in the middle). Two decorative layers over it: a radial amber glow at top `ellipse_at_top from amber-900/10 via transparent`, and a barely visible texture overlay `texture.png` at `2% opacity` with `mix-blend-overlay` (currently that file is not in public/images — the CSS references `/images/texture.png` but the folder only contains `design.png`, `Hero.png`, etc. — so this texture does not render today and appears as a flat dark gradient; keep the intention for a subtle fabric grain).

**Header of section:** Centered, `gap 32–48px`, `mb-12 → 20`:
*   Same gold gradient block as hero: small caps “our process” + large “مراحل ولادة التحفة”.
*   Same `arrow-icon.png` centered below.

**Cards:**
Three cards representing steps of making the thobe, defined as:
1. “القص بدقّة” — “كل قطعة تبدأ بقرار صحيح وقصّ متقن، لأن التفاصيل الصغيرة هي أساس الشكل النهائي المثالي.”
2. “الاختيار” — “ننتقي الخامات بعناية شديدة، لنضمن توازنًا مثاليًا بين الملمس، المتانة، وأناقة المظهر.”
3. “المهارة اليدوية” — “حرفية متوارثة تُنفّذ يدويًا، حيث يلتقي الصبر مع الخبرة لصناعة قطعة تدوم وتُحسّ.”

**Desktop/Tablet (≥768px) layout:** Three-column grid `gap-24 → 32 → 48`, `max-w-7xl`. Crucially, cards are **staggered vertically**: each successive card is pushed down `3rem` more than the previous (`marginTop index*3rem`) creating a cascading staircase. First card highest, third lowest. Each card also has `hover: scale 1.02` with `0.5s` transition and a staggered entrance delay `index*150ms`.

**Mobile layout:** Vertical stack `flex-col gap-32 max-w-md` centered, no stagger, no grid.

**Individual card visual (portrait luxury card):**
*   Outer: `group relative overflow-hidden`, `rounded-sm` (very slight rounding, ~2–4px), `shadow-2xl`, `aspect 4/5` (elegant portrait ratio, taller than wide), `w-full`.
*   Image: `story-1.png`, `story-2.png`, `story-3.png` respectively — each is a close-up, high-res, warm-toned photo:
    *   `story-1.png` (2.65 MB) — fabric cutting / tailoring detail
    *   `story-2.png` (2.14 MB) — hands selecting fabric swatches
    *   `story-3.png` (1.61 MB) — hand stitching / needlework detail
    All are `object-cover` filling the portrait. On `group-hover` they scale to `110%` over `0.7s` and brighten slightly (`brightness-110`).
*   Layers over the image (bottom to top):
    *   Subtle diagonal amber tint `from amber-900/5 to transparent` at `z-10`.
    *   Dark gradient `from black via black/60 to transparent`, `opacity 80% → 90% on hover`, `0.5s` — ensures white text at bottom is readable.
    *   Thin border `border amber-700/20 → amber-600/40 on hover`, `0.5s`.
    *   Gold corner accent top-right `w-16 h-16 → 20` on md, `from amber-600/10 to transparent` diagonal.
    *   Bottom hairline glow `h-1 from transparent via amber-600/30 to transparent` at absolute bottom.
    *   Hover glow overlay `from amber-600/5 to transparent` that fades in `0.5s`.

**Card content overlay:** Absolute, `z-20`, `flex-col justify-end`, padding `24px → 32 → 40` (`p-6 md:p-8 lg:p-10`).

*   **Step number:** Top of content, `inline-flex baseline gap-4`, serif font. Two numbers side-by-side: a faint `0` in `text 36→48→60px, amber-600/40` and the actual step `1/2/3` in larger `48→60→72px, amber-500/60`, `font-light, tracking-wider`. Arabic numerals are converted to Arabic-Indic digits. Below them a `48–64px wide, 1px` gold line `from amber-600/60 to transparent`, `mt-8 → 12`.
*   **Title:** `24→30→36px, bold, amber-100, tracking-wide, leading-tight`, `mb-8 → 12`. Example: “القص بدقّة”.
*   **Description:** `14→16→18px, gray-300, leading-relaxed, max-w-md`. Crucially it is **hidden by default on desktop** (`opacity 0, translate-y-16`) and **slides up and fades in on hover** (`opacity 100, translate-y-0, 0.5s`). On mobile it should be visible without hover — currently same hidden behavior, so mobile visitors may not see description until tap (UX opportunity).
*   No button inside cards — they are purely narrative.

**Overall scroll rhythm:** Generous whitespace, slow reveal, heritage storytelling before any commerce.

---

### 5.2 Thobe Builder — `/builder` — The Customizer Wizard (Protected)

Requires login — unauthenticated visitors are redirected to `/login?redirect=/builder`. This is the core product experience and the most visually detailed page.

**Page shell:** Full height `calc(100vh - 80px)`, background solid `var(--color-black)`. Inner `max-w-6xl mx-auto px-16 py-40`. Centered page header `mb-32, text-center`:
*   Title “صمّم ثوبك” — `40px heading`, `gold`.
*   Subtitle “ابنِ ثوبك التقليدي المثالي خطوةً بخطوة” — `muted grey`, `8px below`.

**Progress indicator:** Centered horizontal row `gap-8 mb-40`, `justify-center`. Four steps labeled right-to-left:
1. اللون (Color)
2. القماش (Fabric)
3. الإضافات (Accessories)
4. المراجعة (Review)

Each step shows:
*   Circle `32px (w-8 h-8)`, centered number or check. Text `14px bold`.
    *   Completed (`step < current`): gold fill `#D4AF37`, black text/icon, show `✓`.
    *   Current (`step == current`): white fill, black text, `scale 1.15` with `0.3s`.
    *   Upcoming: `rgba(255,255,255,0.1)` fill, muted text.
*   Label below circle: `12px`. Current label white `600`, others muted `400`. Hidden on very small screens (`hidden sm:block`).
*   Connector line between steps: `40–64px wide, 2px high`, `mb-16` to align with circle center. Gold if previous step completed, else `rgba(255,255,255,0.1)`. Animates color `0.3s`.

**Main layout (below progress):** Two columns on desktop, stacked on mobile.
*   **Right / sticky preview column** (`lg:w-64, shrink-0`): Sticky at `top-96` (`top-24`). Frosted card `rounded-2xl p-24 gap-16 flex-col items-center`, `bg rgba(255,255,255,0.04), border rgba(255,255,255,0.1), blur 8px`. Header inside: “معاينة مباشرة” — `12px uppercase tracking-wider muted`. Below, either a spinning `RefreshCw 32px gold` when loading, or the live thobe preview.

*   **Left / step content column** (`flex-1`): Same frosted card `rounded-2xl p-32`. Handles loading skeleton, error, and animated step content.

#### Live Thobe Preview
Centered vertical stack `gap-16`. Top is an SVG thobe illustration `w-48 (192px) h-auto` with a soft blurred glow behind it (absolute `blur-3xl rounded-full opacity 20%` whose background color dynamically matches the selected color — so choosing a deep navy tints the glow navy, choosing cream tints it cream, with `0.7s` transition).

**SVG itself:** ViewBox `0 0 200 320`, `drop-shadow-xl`, `relative z-10`. No photo — inline SVG paths:
*   Main body shape covering torso to floor, plus two sleeves, plus a simple head/collar/ghutra (white headscarf + black agal rope + beige skin circle). Body and sleeves are filled with the selected color via CSS variable `--thobe-color` (default white `#FFFFFF`). A faint stroke `rgba(0,0,0,0.1) width 1` defines edges. The collar is a curved outline `stroke rgba(0,0,0,0.15) width 1.5`.
*   Fabric texture is an SVG pattern overlay at ~5–8% opacity, varying by fabric: cotton = subtle horizontal lines, linen = fine crosshatch, wool = dots, silk = diagonal shimmer in `rgba(255,255,255,0.15)` width 1. Only one texture renders at a time matching selection.

**Below SVG:** Centered labels `14px`:
*   If color chosen: small `12px` circle dot `w-3 h-3 rounded-full border white/20` in the exact color, plus color name in white, plus fabric name in muted below it.
*   If nothing chosen: italic `12px muted` “اختر لوناً لرؤية ثوبك”.

Update is instantaneous — no page reload — color change is applied as a CSS custom property without re-rendering.

#### Step 1 — Choose Color (اللون)
Header: `24px white heading` “اختر لون ثوبك” + `14px muted` “حدّد اللون الأساسي — المعاينة تتحدث فوراً” `4px below`, `gap-24` below.

**Grid:** `4 columns mobile → 6 columns on sm` (`grid-cols-4 sm:grid-cols-6 gap-16`). Each color is a button stack `flex-col items-center gap-8`.

*   **Swatch circle:** `48px (w-12 h-12) rounded-full flex center` with background = exact hex code. Border `3px transparent` by default, `3px gold` when selected + glow `0 0 12px rgba(212,175,55,0.4)`. On hover the whole button scales `1.1`, on tap `0.95`.
*   **Check:** When selected, a white/black check `w-5 h-5` springs in (`scale 0 → 1 spring stiffness 300`). Its color is auto-contrasted: dark `#0B0B0B` on light swatches, white on dark swatches (luminance threshold 0.5).
*   **Label:** `12px centered leading-tight`. Muted by default, gold `600` when selected. Long names wrap under the circle.

**12 color options currently mocked:** أبيض ناصع `#FFFFFF`, عاجي `#FFFFF0`, لؤلؤي `#EAE0C8`, كريمي `#FFFDD0`, رمادي فاتح `#D3D3D3`, فضي `#C0C0C0`, بيج `#F5F5DC`, أزرق سماوي `#87CEEB`, كحلي `#000080`, أخضر غابي `#228B22`, رمادي داكن `#36454F`, أسود `#1A1A1A`.

**Below grid:** When a color is selected, a fade-in line `14px muted` “تم الاختيار:” + color name in `white bold` + hex code in `12px muted` `8px to the right`.

**Validation:** “Next” is disabled until a color is chosen (see navigation below).

#### Step 2 — Choose Fabric (القماش)
Header: `24px` “اختر نوع القماش” + `14px muted` “لكل قماش ملمسه الخاص وتأثيره على السعر.”

**Grid:** `1 column mobile → 2 columns sm` (`gap-16`).

**Fabric card** (each is a button filling the column, `text-right p-16 rounded-xl`, `text-right` because RTL):
*   Unselected: `bg rgba(255,255,255,0.04), border 2px rgba(255,255,255,0.08)`.
*   Selected: `bg rgba(212,175,55,0.12), border 2px gold, shadow 0 0 16px rgba(212,175,55,0.15)`.
*   Hover: scale `1.02`, tap `0.98`.

Inside card flex row `justify-between gap-12`:
*   Left side (text): fabric name `16px semi-bold white` + if selected a small gold circle `20px` with black check `12px` that springs in — sits `8px` to the left of name. Below name, description `14px muted` `4px below`: e.g., “خفيف وناعم، مثالي للاستخدام اليومي.”
*   Right side (price tag): pill `12px medium px-8 py-4 rounded-full` — if multiplier `1` shows “أساسي” on `rgba(255,255,255,0.08)` bg muted text; otherwise shows `+20% / +50% / +100%` on `rgba(212,175,55,0.18)` bg gold text.

**4 fabrics mocked:** قطن مصري (×1.0, cotton), كتان فاخر (×1.2, linen), صوف ميرينو (×1.5, wool), حرير فاخر (×2.0, silk). When step 2 advances, the app calls the backend to generate a style recommendation (see below).

#### Step 3 — Add Enhancements (الإضافات)
Header: `24px` “أضف التحسينات” + `14px muted` “اختر الإضافات التي تُميّز ثوبك — كلها اختيارية.”

**If no accessories:** italic `14px muted` “لا توجد إضافات متاحة حالياً.”

**Otherwise grid identical to fabric** (`1→2 cols gap-16`):

**Accessory card:** Same base styling as fabric card (unselected muted, selected gold tint + glow). Inside `flex justify-between gap-12`:
*   Left: name `16px white semi-bold`, below `12px muted` type label (decoration/cufflinks/personalization/pocket) `2px below`.
*   Right: `14px gold semi-bold` “+80 ر.س” + circular toggle `28px` `rounded-full` — unselected is `rgba(255,255,255,0.1) bg, 1px rgba(255,255,255,0.2) border, muted icon`; selected is `gold bg, black icon`. Icon is `Plus 14px` when off, `Minus 14px` when on. Hover scale `1.02`.

**4 accessories mocked:** تطريز ذهبي +80, أزرار فضية +60, خياطة مونوغرام +40, جيب صدر +25.

**Selected summary bar:** When at least one is chosen, a small bar fades in below grid `opacity 0→1 y 8→0`: `p-12 rounded-lg 14px`, `bg rgba(212,175,55,0.08), border rgba(212,175,55,0.2)`. Text: e.g., “٢ إضافات مختارة — +140 ر.س” with count in white bold and sum in gold bold.

#### Step 4 — Review & Confirm (المراجعة)
Header row `flex justify-between flex-wrap gap-12`: left header `24px` “مراجعة طلبك” + `14px muted` “تحقق من اختياراتك قبل تأكيد الطلب”; right is the **Recommendation Badge** (see below).

**Summary card:** `rounded-xl overflow-hidden border rgba(255,255,255,0.1)`. No glass tint — flat dark with border. Divided into rows each `flex justify-between items-center px-20 py-12 14px muted` with `1px rgba(255,255,255,0.06)` dividers, except the accessories block which has extra padding and a list:

*   **Color row:** label “اللون” muted, value right side `flex gap-8`: `16px dot` in chosen color + name in `white medium 500`. If none, red italic `#F87171` “لم يُختَر”.
*   **Fabric row:** label “القماش”, value `white medium` fabric name or red italic if none.
*   **Accessories block:** header row `flex justify-between 14px muted` “الإضافات” vs “لا يوجد / ٢ مختارة”. If chosen, a list `mt-8 pr-8 space-y-4` of each accessory `flex justify-between 12px muted` name left, “+80 ر.س” right.

**Price breakdown card:** Below that, `rounded-xl p-20 space-y-8`, `bg rgba(255,255,255,0.04), border rgba(255,255,255,0.08)`. Heading `14px semi-bold white` “تفصيل السعر” `mb-12`. Each line `flex justify-between 14px muted`:
*   “السعر الأساسي — 200 ر.س”
*   If fabric extra >0: fabric name + “+40 ر.س” etc.
*   Each accessory line similarly.
*   Final total row: `bold` `pt-8 borderTop rgba(255,255,255,0.08)` `gold` “الإجمالي — 340 ر.س”

**Error box:** If order fails or customization missing, a red box appears `p-12 rounded-lg 14px`, `bg rgba(185,28,28,0.2), border rgba(185,28,28,0.4), text #FCA5A5`.

**Confirm button:** Full width `w-full flex center gap-8 px-24 py-12 rounded-xl semi-bold gold-gradient black text`. Shows “تأكيد الطلب” with `CheckCircle 20px` normally; when submitting shows spinning `Loader 20px` + “جارٍ تقديم الطلب…”. Disabled `opacity 50%` if no customization ID or while loading. Hover `scale 1.02`, tap `0.97`.

If no customization ID (i.e., user skipped fabric), a helper `12px centered muted` below button: “عُد لاختيار القماش لتوليد توصيتك الشخصية.”

**Recommendation Badge:** Appears in review header once fabric is chosen and backend returns a label. Pill `flex gap-8 px-16 py-8 rounded-full 14px semi-bold gradient from amber-500 to yellow-400 white text shadow-amber-200 shadow-lg`. Icon `Sparkles 16px`. Animates in `opacity 0 y 8 scale 0.95 → 1 0.35s`. Text is a style name like “أسلوب مميز” or “Royal Classic”.

**Builder bottom navigation (visible steps 1–3 only):** Full width bar below step content `mt-40 pt-24 borderTop rgba(255,255,255,0.08)` `flex justify-between items-center`:
*   Left: “السابق” `flex gap-8 px-16 py-8 rounded-lg` with `ChevronRight 16px` (points right because RTL = previous). Muted `30% opacity` and disabled on step 1, white otherwise.
*   Center: `12px muted` “الخطوة 2 من 4”.
*   Right: “التالي” `px-24 py-10 rounded-lg semi-bold gold-gradient black` with `ChevronLeft 16px`. Disabled `40% opacity` until step validation passes (color/fabric chosen). Hover `scale 1.03` if enabled.

**Loading states in builder:** When fetching options, preview shows centered spinner; step content shows pulsing skeleton: `h-32 w-1/3` + `h-16 w-1/2` + grid of 8 circles `48px` all `rgba(255,255,255,0.06–0.1)` with `animate-pulse`. Error state shows centered red text + “إعادة المحاولة” gold button.

---

### 5.3 Order Success — `/orders/success/:orderId` (Protected)

Full-screen celebration, `min-h calc(100vh-80px)`, centered `px-16 py-64`, `max-w-lg` RTL stack `gap-32`.

**Top celebration block** `flex-col items-center text-center gap-16`, spring animation `scale 0.5→1`:
*   Icon circle `80px (w-20 h-20) rounded-full flex center` `bg rgba(34,197,94,0.15) border rgba(34,197,94,0.3)` with `CheckCircle 40px #4ADE80`.
*   Title “تم تأكيد طلبك!” `30px (text-3xl) heading white`.
*   Subtitle `muted` “ثوبك قيد التصنيع بعناية فائقة. ستصلك رسالة تأكيد قريباً.”
*   If recommendation exists: same gold pill as builder but centered, `px-16 py-8 rounded-full 14px gold border gold/30 bg gold/15`, with `Sparkles 16px` + label.

**Order ID card** `rounded-2xl p-24 space-y-16` same glass `rgba(255,255,255,0.04) border rgba(255,255,255,0.1) blur 8px` (`delay 0.2` fade up):
*   Eyebrow `12px muted tracking 0.12em uppercase` “رقم الطلب”.
*   ID row `flex justify-between gap-16 px-16 py-12 rounded-xl bg rgba(255,255,255,0.06)`: left monospace `14px white` order ID (or “N/A”), right copy button `muted → white on hover` showing `Copy 16px` or `Check 16px` green when copied (stays green for 2s after click).
*   Quick summary `borderTop rgba(255,255,255,0.08) pt-16 space-y-8 14px muted`: rows `flex justify-between` — اللون (dot + name), القماش (name), الإضافات (`لا يوجد` or joined names), final total `bold pt-8 borderTop rgba(255,255,255,0.08) gold` “الإجمالي المدفوع — 340 ر.س”.

**Action buttons** `flex-col → row on sm gap-12` (`delay 0.4` fade):
*   Primary: “تصميم ثوب آخر” `flex-1 flex center gap-8 px-20 py-12 rounded-xl semi-bold gold-gradient black` with `Sparkles 16px`. Resets the builder store on click.
*   Secondary: “متابعة الطلبات” `flex-1 flex center gap-8 px-20 py-12 rounded-xl semi-bold border 2px rgba(255,255,255,0.15) white text` with `ShoppingBag 16px`. Links to `/track`.

---

### 5.4 Authentication — `/login` & `/register` (Public)

Both use the same centered glass layout: full remaining height `min-h calc(100vh-80px) flex center px-16` on `black` background.

**Card:** `w-full max-w-md (448px) p-32 space-y-24 rounded-2xl shadow-2xl` `bg rgba(255,255,255,0.04) border rgba(255,255,255,0.1) blur 12px`.

**Header inside card:** centered `space-y-4`:
*   `h1 30px heading gold`: “أهلاً بعودتك” on login, “إنشاء حساب جديد” on register.
*   Sub `14px muted`: “سجّل دخولك لمتابعة تخصيص ثوبك” / “انضم إلى وسم وابدأ تخصيص ثوبك”.

**Error banner (when present):** `p-12 rounded-lg 14px bg rgba(185,28,28,0.2) border rgba(185,28,28,0.4) text #FCA5A5`.

**Form:** `space-y-20 dir rtl`:

*   **Login fields (2):** Email + Password.
*   **Register fields (3):** Email + Password + Confirm Password.

Each field: label `14px rgba(255,255,255,0.7) block` above input, input `w-full px-16 py-12 rounded-lg 14px white` with `bg rgba(255,255,255,0.08)` and `border 1px rgba(255,255,255,0.12)` normally turning `1px #EF4444` on validation error. Placeholder `example@email.com` / `••••••••` in muted. Error text below `12px #F87171`.

**Submit button:** `w-full flex center gap-8 py-12 rounded-lg semi-bold gold-gradient black` `hover opacity 90% disabled 50%`. Shows spinning `Loader 16px` when loading. Text “تسجيل الدخول” / “إنشاء الحساب”.

**Bottom helper line:** `14px centered rgba(255,255,255,0.45)`: “ليس لديك حساب؟ إنشاء حساب جديد” (login) or “لديك حساب بالفعل؟ تسجيل الدخول” (register). The link is `gold` `hover:underline` and preserves the `?redirect=` query so after auth the user returns to where they came from.

**Validation (visible behavior):** On blur/submit, invalid email shows “البريد الإلكتروني غير صالح”, short password “كلمة المرور يجب أن تكون 6 أحرف على الأقل”, mismatched confirmation “كلمتا المرور غير متطابقتين”, duplicate email on register “هذا البريد الإلكتروني مسجّل مسبقاً.” The form uses RTL direction so error messages align right.

**Protected redirect behavior:** Visiting `/builder` unauthenticated shows a centered loading spinner `h-12 w-12 border-t-2 border-b-2 border-primary animate-spin` briefly, then instantly redirects to `/login?redirect=%2Fbuilder`.

---

### 5.5 Placeholder Pages — `/story`, `/contact`, `/track`

These three routes currently render identical minimal layouts — intentionally sparse, waiting for your design:

*   Outer: `section pt-128 (pt-32) px-24 max-w-5xl mx-auto`.
*   Title: `40px heading gold` — “قصتنا” / “تواصل معنا” / “تتبع طلبك”.
*   Paragraph: `muted white/70` — one sentence: “بدأت وسم من شغف بالتفصيل…” / “اترك بياناتك وسيتواصل فريقنا…” / “أدخل رقم الطلب لمعرفة حالة التفصيل.”

No images, no forms, no cards — treat as blank canvases. The header and background remain the same dark theme.

---

## 6. Image Inventory — Every File in `public/images/`

| File | Size | Where you see it | Visual description |
|---|---|---|---|
| `logo.png` | 246 KB | Header (132px wide) + mobile drawer top + browser tab if used as favicon alternate | The wordmark “وسم” in gold/white luxury serif, likely with a subtle emblem. Dark background variant. |
| `Hero.png` | 1.74 MB | Home hero — half-column on desktop, full background on mobile | Tall editorial portrait: person in pristine white/cream thobe, soft moody studio, fabric folds and texture emphasized, dark vignette ready for gradient overlay. This is the brand’s hero photography. |
| `arrow-icon.png` | 37 KB | Home hero below buttons + “Our Process” header | Thin golden hand-drawn swooping arrow (≈200px wide), slightly curved, pointing down/forward. Decorative divider between headline and CTA. |
| `story-1.png` | 2.65 MB | “Our Process” card 1 — “القص بدقّة” | Close-up of tailoring/cutting — hands, shears, fabric being cut precisely. Warm, shallow depth of field. |
| `story-2.png` | 2.14 MB | Card 2 — “الاختيار” | Fabric selection — draped swatches, hands touching textiles, natural fibers. Suggests material curation. |
| `story-3.png` | 1.61 MB | Card 3 — “المهارة اليدوية” | Hand sewing — needle, thread, embroidery detail on fabric. Emphasizes artisanal handwork. |
| `design.png` | 1.72 MB | Referenced but not visibly mounted on any current page — likely a mood board / fabric palette asset available for future sections. Warm luxury texture. Keep for inspiration; not rendered today. |
| `texture.png` (referenced in code but **missing from folder**) | — | Intended as a `2% opacity overlay` on the story section. Currently does not load — renders as no texture. If you reintroduce, use a subtle linen/paper grain at very low opacity with `mix-blend-overlay`. |

No other images, icons, or illustrations are used. All other visuals are inline SVG (the thobe preview) and Lucide icons (Check, Plus/Minus, ChevronRight/Left, RefreshCw, Loader2, CheckCircle2, Sparkles, Copy, ShoppingBag) rendered as vector strokes, not image files.

---

## 7. Responsive Behavior — How It Adapts

*   **Breakpoint: `768px (md)`** — Story section switches from single-column stack to 3-column staggered grid; detail typography scales up (card padding `24→32→40`, numbers `36→48→60` etc.).
*   **Breakpoint: `640px (sm)`** — Builder step labels appear below circles (`hidden sm:block`); fabric/accessory grids go `1→2` columns; hero button layout switches `justify-center → flex-col`; progress connector grows `40→64px`; headers reduce padding on mobile.
*   **Breakpoint: `1024px (lg)`** — Header desktop nav and CTAs appear; burger hides; hero splits into two halves; builder preview becomes sticky side column (`flex-col → flex-row`); hero content changes from `text-center` mobile to `text-right` intent (but currently centered even on desktop content half — note as alignment opportunity).

The entire interface is RTL, so “left” and “right” are mirrored vs. LTR expectations — test all layouts with Arabic text expansion in mind.

---

## 8. What the Current UX Does Well (Keep) and What Needs Upgrade

**Keep / Evolve:**
*   Dark luxury atelier tone, gold gradient headlines, generous whitespace, and rounded glass cards — distinctive and premium.
*   Live SVG thobe preview that reacts instantly via CSS — a strong “wow” moment.
*   Staggered story cards with hover-revealed descriptions — elegant editorial rhythm.
*   Clear 4-step progress with animated completion states.

**Upgrade opportunities (for you):**
*   No footer, no size guide, no fabric care, no trust badges, no testimonials — add credibility.
*   Placeholder pages (Story / Contact / Track) need full information architecture.
*   Hero secondary CTA (“احجز موعد قياس”) has no destination — design the measurement/booking flow.
*   Story card descriptions are hover-only on desktop and invisible on mobile — make them accessible without hover.
*   Input fields are custom-styled divs — consider adding visible focus rings, password visibility toggle, and stronger error association for a11y.
*   Missing imagery: real thobe lifestyle photography, fabric close-ups, texture swatches, and customer UGC.
*   `design.png` and missing `texture.png` suggest an unused visual language — unify into a consistent texture system.
*   Add checkout-adjacent signals: delivery estimate, craftsmanship timeline, and reassurance copy near the confirm button.

---

## 9. Design Handoff Checklist

- [ ] Rebuild the header (fixed, `black/90 + blur`, hairline `white/5`, logo `132px`, gold hover states, mobile drawer `80% / max 336px` + `black/70` overlay).
- [ ] Recreate the hero using `Hero.png` with the exact gradients described; keep the two-button hierarchy and `arrow-icon.png` divider.
- [ ] Recreate the “Our Process” story with three portrait cards (`4/5` ratio, `story-1/2/3.png`, staggered `3rem` on desktop, gold number treatment, hover behaviors).
- [ ] Rebuild the builder wizard: progress dots (`32px` circles, gold/white/muted states), sticky preview card with thobe SVG + colored glow, four step layouts, glass cards (`rgba 0.04 / border 0.1 / blur 8`), gold-gradient primary actions with `scale 1.02–1.05` hover.
- [ ] Recreate auth cards (`max-w-md`, `p-32`, `blur 12px`, inputs `bg 0.08`, error red `#F87171`, gold CTA).
- [ ] Recreate success screen (green check `80px` circle, glass order ID card with monospace + copy toggle, price summary, dual CTAs).
- [ ] Apply the global tokens: `Noto Kufi Arabic` headings / `IBM Plex Sans Arabic` body, `12→40px` scale, `#0B0B0B / #D4AF37 / #C8B08A / #8A8A8A`, gold gradient `270deg`, `8px` gold scrollbar, focus ring `rgba(212,175,55,0.35)`.
- [ ] Use the exact images listed above by filename; source or replace `texture.png` and `design.png` intentionally.
- [ ] Preserve RTL directionality throughout.

---

*End of brief. This document is intended to be the single source of truth for a visual rebuild — no code inspection needed. If any color, size, or placement is ambiguous, default to the values in §3 before inventing new ones.*

