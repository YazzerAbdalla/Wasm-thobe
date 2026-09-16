# WASM Atelier — Builder Material Preview: Required Images

> Goal: convert `ThobePreview` (SVG thobe) → **Material Preview** — show the *actual chosen material* as a tactile sheet/close-up, not a silhouette. Cotton = cotton macro, Linen = linen weave, Mother-of-pearl = button macro. Keeps the luxury “touch the fabric” feeling and makes price justification obvious.

**Location:** `public/images/materials/` + `public/images/details/`
**Format:** WebP (fallback JPG), 800×800 min, 1:1 or 4:3, shot on matte black or sand #C8B08A drape, soft raking light, no model.

---

## 0. Summary — How many images?

| Scope | Images | Note |
|-------|--------|------|
| **Curated MVP (recommended — art director pick)** | **34 images** | Enough for premium builder without overwhelming. Covers all *visible* choices a Saudi buyer decides in ≤3 min. |
| **Exhaustive catalog (if you expose every option in `saudi_custom_thobe_options.md`)** | **~118 images** | 200+ logical options, but many are construction-internal (interfacing, seam finish) that should *never* have a user-facing image. Do not shoot. |

**Curated MVP = 34 = Fabric 7 + Color 0 (color uses CSS circle, no shoot) + Collar 3 + Placket 3 + Buttons 6 + Pocket 2 + Cuff 3 + Embroidery 3 + Accessory/detail 3 + Lifestyle macro 4**

Full exhaustive would add: +18 fabric weights/textures, +9 collar variants, +8 button finishes, +6 pocket closures, +12 stitching/hem variants → but those cause choice paralysis (see §4).

---

## 1. Curated Option Set (Saudi Art Director — Keep vs Remove)

### Decision logic
- **Keep** if: visible in first 3 seconds, differentiates *look/feel* or *provenance*, justifies +SAR, is Saudi-default (round stand collar, classic placket), or is Eid/wedding hook.
- **Remove / hide in “Advanced / Custom notes”** if: construction-internal, only understood by tailor, low-end mass-market, or duplicates a kept option.

| # | Category | Source in `saudi_custom_thobe_options.md` | **KEEP (show in builder)** | **REMOVE / hide (move to free-text Custom)** | Why |
|---|----------|-------------------------------------------|----------------------------|----------------------------------------------|-----|
| 1 | Garment Style | §1 | **Saudi Modern, Saudi Tailored/Slim, Saudi Relaxed** (3) | Saudi Classic/Formal/Custom Bespoke, Slim vs Tailored vs Relaxed all 6 | 3 silhouettes cover 95% of sales; too many = paradox |
| 2 | Fabric Family | §2 | **Egyptian Cotton, Cotton Poplin, Cotton Oxford, Linen Blend, Wool Blend, Premium Luxury** (6) | Polyester, Spun Poly, Micro Poly, TC/TR blends, Viscose | Poly = mass-market, dilutes atelier luxury |
| 3 | Fabric Finish/Weight/Texture | §2 | **Weight badge only (Light/Medium) + Texture 3 (Plain, Honeycomb, Dobby)** | Matte/Semi-Matte/Soft/Crisp, all 7 textures | Texture is tactile; finish/weight should be auto-inferred per family |
| 4 | Color | §3 | **10 curated** White, Off-White, Cream, Beige, Light Grey, Charcoal, Black, Navy, Dark Brown, Olive (remove Khaki/Brown etc) | Custom Color (keep as 11th but gated) | 10 sand→night gradient = editorial, not crayon box |
| 5 | Fit | §4 | **Classic, Tailored, Relaxed** (3) | Slim/Loose + all 7 body-shape sliders | Fit = 1 choice; millimetre sliders belong to tailor visit |
| 6 | Collar | §6 | **Round Stand, Band, French** (3) | 6 others (Short/Pointed/V-Neck/Collarless etc) + Height/Structure/Construction/Closure 12 fields | Saudi default is round stand; band/french cover modern/formal. Hardness etc = tailor decision |
| 7 | Placket | §7 | **Classic, Hidden, Embroidered** (3) | Straight/Triangular/French/Sports/Zip/Decorative etc + Closure combos | Hidden = modern, Embroidered = luxury hook |
| 8 | Buttons | §8 | **Mother-of-Pearl, Fabric-Covered, Metal Gold, Standard Sew-On** (4) + finishes **Gold/Silver/Matte** | Plastic/Resin/Wooden/Horn + 5 shapes/sizes | Luxury buyers only choose pearl vs metal gold; others cheapen |
| 9 | Pocket | §9-10 | **No pocket / Standard Straight / Rounded + Hidden Pen** (3) | Angled/V/Mitered, 5 edges, zip/button closures | Pocket shape is visible; edge piping is invisible to buyer |
| 10 | Cuff | §14 | **Standard Cuff (1 button), French Cuff, Square Cuff 2 buttons** (3) | Open/Double/Extended/Custom + Structure/Interfacing/Edge/Width 12 combos | 3 visual silhouettes enough |
| 11 | Embroidery | §21-22 | **None / Minimal Placket / Premium Collar+Cuff** (3 locations, gold/matching) | 7 locations, 6 colors, piping/monogram combos | Eid hook = placket gold line |
| 12 | Measurements | §26 | **5 essentials** Height, Thobe Length, Chest, Shoulder, Sleeve | Advanced 8 measurements + all reinforcement/internal seams | Taken at atelier visit — not in checkout flow |
| 13 | Customer prefs | §27 | **Occasion badge only (Daily/Eid/Wedding) — drives recommendation** | Full 9 prefs | Used silently for recommendation label |

**Result: ~34 visible options instead of ~200. Builder becomes 5 steps (Style → Fabric → Collar/Front → Pockets/Cuffs → Review) not 10. Each step ≤6 cards. Conversion goes up because choice is *curated scarcity*, like a private atelier wall, not Souq.**

> Principle: *In a Saudi luxury atelier, you don’t show the customer every bolt in the store. You show 6 bolts worthy of a sheikh, and let the tailor handle the interfacing.*

---

## 2. Image Inventory — Curated MVP (34 files)

All under `public/images/`

### A. Fabric — sheet / macro (7)

| # | File | Option it represents | Shot description / art direction |
|---|------|----------------------|-----------------------------------|
| 1 | `materials/fabric-egyptian-cotton.jpg` | Egyptian Cotton | Tight macro 45°, long-staple sheen, plain, summer light, raking side light shows staple, hand draped over sand table |
| 2 | `materials/fabric-cotton-poplin.jpg` | Cotton Poplin | Smooth, high thread count, crisp fold, subtle rib — premium daily |
| 3 | `materials/fabric-cotton-oxford.jpg` | Cotton Oxford | Basket weave visible, matte, structured — winter office |
| 4 | `materials/fabric-linen-blend.jpg` | Linen Blend | Open weave, slub texture, light through, 22% overlay opacity in preview — summer |
| 5 | `materials/fabric-wool-blend.jpg` | Wool Blend | Fine cool-wool, drape shot on hanger, low sheen, formal |
| 6 | `materials/fabric-premium-luxury.jpg` | Premium Luxury (JS blend / silk-touch) | Silky fall, gold side light on edge, boxed fold + ribbon |
| 7 | `materials/fabric-honeycomb-detail.jpg` | Texture Honeycomb (used as overlay) | Macro of honeycomb cell, not full sheet |

### B. Collar (3)

| # | File | Type | Shot |
|---|------|------|------|
| 8 | `details/collar-round-stand.jpg` | Round Stand Collar — ياقة دائرية واقفة | 90° front crop, 3cm height, soft structure on white thobe, shallow DOF |
| 9 | `details/collar-band.jpg` | Band Collar — شريطية | Low 1.8cm band, modern minimal, same white |
| 10 | `details/collar-french.jpg` | French Collar — فرنسية | Pointed, structured, formal shot |

### C. Placket / Front (3)

| # | File | Style | Shot |
|---|------|-------|------|
| 11 | `details/placket-classic.jpg` | Classic Placket — 4 buttons visible | 4 buttons, straight line, whole chest crop |
| 12 | `details/placket-hidden.jpg` | Hidden Placket — أزرار مخفية | Clean front, no stitch line visible — modern |
| 13 | `details/placket-embroidered.jpg` | Embroidered Placket — مطرز | Gold 1mm line along placket, macro 1:2 |

### D. Buttons — close-up macro (6)

| # | File | Type | Shot |
|---|------|------|------|
| 14 | `details/button-mother-of-pearl.jpg` | Mother-of-Pearl — صدف | 3 buttons on black velvet, rainbow nacre, side light |
| 15 | `details/button-fabric-covered.jpg` | Fabric-Covered — مغطى بالقماش | Same fabric as thobe covering button, tonal |
| 16 | `details/button-metal-gold.jpg` | Metal Gold — معدن ذهبي | Gold button with logo engrave option |
| 17 | `details/button-metal-silver.jpg` | Metal Silver — فضي | Same as gold but cool tone |
| 18 | `details/button-standard-matte.jpg` | Standard Matte — مطفي عادي | White matte plastic, everyday |
| 19 | `details/button-engraved.jpg` | Engraved Logo — محفور | Macro of engraved “و” on gold button |

### E. Pocket (2)

| # | File | Shape | Shot |
|---|------|-------|------|
| 20 | `details/pocket-straight.jpg` | Straight — مستقيم | Chest pocket straight edge on thobe, front-light |
| 21 | `details/pocket-rounded.jpg` | Rounded — دائري | Same but rounded bottom corners |

### F. Cuff (3)

| # | File | Type | Shot |
|---|------|------|------|
| 22 | `details/cuff-standard-1btn.jpg` | Standard Cuff 1 button | Single button, narrow, wrist crop |
| 23 | `details/cuff-square-2btn.jpg` | Square Cuff 2 buttons | Square edge, two buttons vertical |
| 24 | `details/cuff-french-cufflink.jpg` | French Cuff + Cufflink | Double fold, square cufflink, silver |

### G. Embroidery / Monogram (3)

| # | File | Placement | Shot |
|---|------|-----------|------|
| 25 | `details/embroidery-placket-gold.jpg` | Placket Gold line | 2cm gold embroidered line, macro |
| 26 | `details/embroidery-collar-gold.jpg` | Collar Gold | Edge of collar gold thread |
| 27 | `details/monogram-cuff-ar.jpg` | Monogram Arabic initials on cuff | “ف” Arabic initial on cuff edge, gold |

### H. Accessory / Lifestyle macro (4) — for gifting/brand

| # | File | Use | Shot |
|---|------|-----|------|
| 28 | `materials/silk-wrap.jpg` | Silk wrapping preview | Black silk box + Sadu ribbon closed |
| 29 | `details/gift-card-handwritten.jpg` | Handwritten card | Cream card with “إلى فيصل — بكل فخر” Naskh, w seal |
| 30 | `details/craft-table-hands.jpg` | Value prop — hands cutting | Hands + scissors on wood table (re-use story but lighter crop) |
| 31 | `details/size-label-woven.jpg` | Premium label | Woven “وسم” label inside collar |

### I. Legacy fabric swatches (keep as fallback gradients if shoot delayed) (3 placeholders already exist as gradients)
| 32 | `materials/fabric-cotton-egyptian-placeholder` | gradient `linear-gradient(135deg,#F5F0E8,#E8DCC6)` |
| 33 | `materials/fabric-linen-placeholder` | already in code |
| 34 | `materials/fabric-wool-placeholder` | already in code |

> **Total realistic shoot: 31 new photos + 3 placeholders = 34 assets.**

---

## 3. Exhaustive Scope — What you would need if you expose *everything* (for reference only, don’t shoot)

If you literally map every enum in `saudi_custom_thobe_options.md` to an image:

- Fabric: 14 families × 3 weights × 7 textures = 14+ but unique families 14 images + 7 texture overlays = 21
- Collar: 9 types + 4 heights + 4 hardness × photo anyway same collar = 9 + 4 constructions = 13
- Placket: 9 styles × 6 closures × 3 counts = 9 + 6 closures = 15
- Buttons: 11 types × 7 finishes × 4 shapes × 3 sizes = 11+7 combos = 18
- Pocket: 3 presence × 4 shapes × 5 openings × 5 edges × 4 pen = ~21 combos but need 4 shapes + 5 edges = 9
- Cuff: 8 types × 6 closures × 4 structures × 5 interfacings = 8+6 = 14
- Stitching/Back/Hem/Embroidery/Monogram: ~18 images
- **Exhaustive unique visuals ≈ 118 files**, but 60% would be indistinguishable to buyer (e.g. Medium vs Semi-Hard interfacing).

**Art director verdict: Don’t shoot 118. Shoot 34. Put the remaining 84 behind a “تفصيل خاص — اكتب لنا” free-text + image upload (Custom notes). You keep bespoke credibility without drowning the flow.**

---

## 4. How the builder will use these images (Material Preview rule)

1. **Material Preview replaces thobe silhouette.** Right preview pane (`ThobePreview`) no longer draws SVG. It shows a single material card:
   - If user selects **Fabric** → show `fabric-*.jpg` full-bleed with texture name overlay
   - If user selects **Collar type** → show `collar-*.jpg` cropped (collar area only, 4:3)
   - If user selects **Button type** → show `button-*.jpg` macro on velvet
   - Else show fabric default. Switch is instant, with `motion cross-fade 0.35s`.

2. **Builder options = curated image cards.** Each option row now has a 64×64 thumb (real photo, not gradient) + name + price delta + “موصى به” badge. Fallback while shoot pending: keep current gradients but swap `thumb` URL to `/images/...` when available, with `onError` → gradient.

3. **Conditional reveal** — per §29 logic: choosing `French Cuff` reveals cufflink picker; `Embroidered Placket` reveals thread color. No extra images needed — just show extra row.

---

## 5. Shoot Brief for Photographer (one page)

- **Palette:** Black canvas `#0B0B0B`, sand `#C8B08A` only. No colored backdrops.
- **Light:** Single large softbox 45° left, white bounce right, raking for texture. No hard flash.
- **Lens:** 85mm at f/5.6 for fabric macro, 50mm at f/4 for collar/placket.
- **Retouch:** Keep slub, keep weave. Don’t over-smooth. Luxury is *texture*.
- **Deliver:** WebP 1600w + 800w, sRGB, 72dpi. Name exactly as `File` column. Include 1:1 crop center.

---

## 6. Next Step

- Assign shoot for 34 files above. Placeholder gradients already code-ready, so builder ships now and photo drop-in is non-breaking (`thumb` URL swap).
- Builder upgrade in code will reference these filenames; if file 404, falls back to gradient — no broken UI.
