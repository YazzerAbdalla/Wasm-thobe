# WASM Atelier — Builder Image Generation Prompts
> Art Director + Prompt Engineer brief for AI generation of the 34 Material Preview images
> Use with Midjourney v6 / Flux Pro / SDXL — all prompts share **one master theme** so the builder feels like a single atelier wall, not a stock collage.

---

## 0. MASTER THEME — Must be prepended to every prompt

**WASM Atelier Master Look:**

```
Luxury Saudi thobe atelier, dark atelier canvas #0B0B0B and warm sand beige #C8B08A, quiet Najdi luxury (not Dubai glossy), soft raking light from large window left, matte black velvet or aged sand wood table base, shallow depth of field f/4, 85mm lens look, editorial premium, texture is hero, no model face — hands only if human, middle-eastern artisan hands, authentic Saudi craft, Sadu diamond whisper barely visible, gold #D4AF37 accent only on light edge, color accurate, tactile, calm, no text, no logo, no watermark, studio photography, 8k, ultra detailed
```

**Technical suffix for every image:**

```
--ar 1:1 --style raw --v 6 --s 180 --q 2
Negative: oversaturated, neon, colored background, purple/teal gradient, plastic shine, stock photo, cartoon, illustration, busy pattern, wrinkle, over-smoothed, AI artifact
```

For **detail macros** (buttons/collar/placket) use `--ar 4:3` instead.
For **fabric sheets** keep `--ar 1:1`.

**Color palette lock (repeat in every prompt):** `palette: #0B0B0B #141412 #C8B08A #D4AF37 #F5F0E8` — forces AI to stay within site tokens.

---

## 1. FABRIC — Sheet / Close-up (7)

All shot as **flat sheet draped over matte black or sand table**, soft fold, side raking light shows weave. No hanger.

### 1. `materials/fabric-egyptian-cotton.jpg` — Hero, Already rec badge
```
MASTER THEME + Egyptian cotton long-staple sheet, plain weave, tight 45 degree macro, long silky fibers visible, subtle sheen, off-white #F5F0E8, folded with one soft diagonal drape, sand beige table edge visible bottom, raking light left creates fine shadow on weave, breathable premium daily feel --ar 1:1
```

### 2. `materials/fabric-cotton-poplin.jpg`
```
MASTER THEME + cotton poplin sheet, high thread count, smooth crisp surface with subtle vertical rib, pure white, precise flat fold with sharp edge, structured daily thobe feel, office premium --ar 1:1
```

### 3. `materials/fabric-cotton-oxford.jpg`
```
MASTER THEME + cotton oxford basket weave, matte structured, visible basket texture 2x2, warm white #F8F6F0, winter weight, folded thick, tactile rugged --ar 1:1
```

### 4. `materials/fabric-linen-blend.jpg`
```
MASTER THEME + linen blend open weave, slub texture, natural irregular slubs, light beige #E8DCC6, light passes through weave, sheer edges, summer airy, slightly wrinkled naturally but premium --ar 1:1
```

### 5. `materials/fabric-wool-blend.jpg`
```
MASTER THEME + cool wool blend, fine worsted, low sheen, drape shot slightly hanging over table edge, charcoal navy undertone #1A2332 subtle, heavy fall, formal winter, elegant flow --ar 1:1
```

### 6. `materials/fabric-premium-luxury.jpg`
```
MASTER THEME + premium luxury silk-touch thobe fabric, liquid drape, silk fall with gold side light catching edge, boxed fold with thin Sadu ribbon #D4AF37 6mm on top, ultra premium gift feel, box shadow soft --ar 1:1
```

### 7. `materials/fabric-honeycomb-detail.jpg`
```
MASTER THEME + honeycomb fabric texture macro, hexagonal cell 3mm, cream #F5F0E8, top-down macro, shallow DOF center sharp, textile engineering detail --ar 1:1
```

---

## 2. COLLAR — Cropped on white thobe (3) — 4:3, chest-up, same mannequin invisible

### 8. `details/collar-round-stand.jpg`
```
MASTER THEME + Saudi thobe round stand collar, 3cm height, soft but structured, circular edge, white thobe #FFFFFF on black background, front 90 degree crop, shallow DOF on collar edge, traditional Saudi default, quiet luxury --ar 4:3
```

### 9. `details/collar-band.jpg`
```
MASTER THEME + Saudi thobe band collar, low 1.8cm height, minimal modern youth style, straight flat band, same white thobe, same light/crop as collar-round-stand for direct comparison --ar 4:3
```

### 10. `details/collar-french.jpg`
```
MASTER THEME + Saudi thobe French collar, pointed structured flap, formal, same white thobe, high contrast collar stand, evening occasion --ar 4:3
```

---

## 3. PLACKET / FRONT (3) — chest crop 30cm tall

### 11. `details/placket-classic.jpg`
```
MASTER THEME + Saudi thobe classic placket, central strip with 4 visible buttons in line, straight stitch, white thobe chest crop, 4 mother-of-pearl buttons visible equally spaced --ar 4:3
```

### 12. `details/placket-hidden.jpg`
```
MASTER THEME + Saudi thobe hidden placket, clean front no visible stitch, hidden buttons under flap, minimal modern, same chest crop, ultra clean line --ar 4:3
```

### 13. `details/placket-embroidered.jpg`
```
MASTER THEME + Saudi thobe embroidered placket macro, 1mm gold #D4AF37 line running along placket edge, silk thread, 1:2 macro, luxury Eid detail, gold thread catches light --ar 4:3
```

---

## 4. BUTTONS — Macro on black velvet (6) — 1:1, 3 buttons angled

### 14. `details/button-mother-of-pearl.jpg`
```
MASTER THEME + 3 mother-of-pearl buttons on matte black velvet, rainbow nacre iridescence, side raking light shows depth and layers, 18mm diameter, shallow DOF top button sharp, quiet luxury --ar 1:1
```

### 15. `details/button-fabric-covered.jpg`
```
MASTER THEME + 3 fabric-covered buttons, same white Egyptian cotton covering button dome, tonal stitch, on black velvet, soft matte, tactile --ar 1:1
```

### 16. `details/button-metal-gold.jpg`
```
MASTER THEME + 3 metal gold buttons, polished gold #D4AF37, brushed surface with engravedArabic letter "و" small, on black velvet, reflective but not glossy plastic --ar 1:1
```

### 17. `details/button-metal-silver.jpg`
```
MASTER THEME + 3 metal silver buttons, polished silver #CBD5E1, same shape as gold but cool tone, on black velvet, for charcoal/navy thobe pairing --ar 1:1
```

### 18. `details/button-standard-matte.jpg`
```
MASTER THEME + 3 standard matte white buttons, flat plastic matte, everyday, on black velvet, clean simple --ar 1:1
```

### 19. `details/button-engraved.jpg`
```
MASTER THEME + extreme macro 1:1 of one gold metal button, engraved Arabic calligraphy "وسم" fine line, side light shows engraving shadow, black velvet background --ar 1:1
```

---

## 5. POCKET (2) — chest pocket 1:1

### 20. `details/pocket-straight.jpg`
```
MASTER THEME + Saudi thobe chest pocket straight edge, rectangular with sharp 90 degree corners, white thobe front left chest, top stitch 2mm, front light --ar 4:3
```

### 21. `details/pocket-rounded.jpg`
```
MASTER THEME + Saudi thobe chest pocket rounded bottom corners, same white thobe same crop as pocket-straight, soft rounded 6mm radius --ar 4:3
```

**For no-pocket option:** use `details/pocket-no.jpg` = same chest crop but **no pocket**, clean front — generate as: `MASTER THEME + white thobe chest no pocket, clean front fabric only, same crop as pocket shots, for comparison --ar 4:3`

---

## 6. CUFF (3) — wrist crop 1:1

### 22. `details/cuff-standard-1btn.jpg`
```
MASTER THEME + Saudi thobe standard cuff narrow 6cm, single button closure center, wrist crop on white thobe, straight edge, everyday --ar 4:3
```

### 23. `details/cuff-square-2btn.jpg`
```
MASTER THEME + Saudi thobe square cuff, wide 8cm, two buttons vertical, square 90 degree edge, structured, same wrist crop, formal --ar 4:3
```

### 24. `details/cuff-french-cufflink.jpg`
```
MASTER THEME + Saudi thobe French cuff double fold, silver square cufflink with brushed finish, white thobe, extreme formal, cufflink catches light --ar 4:3
```

---

## 7. EMBROIDERY / MONOGRAM (3)

### 25. `details/embroidery-placket-gold.jpg`
```
MASTER THEME + gold embroidery line 2cm on placket, metallic gold thread #D4AF37, raised chain stitch macro, white thobe base, light angle shows thread height --ar 1:1
```

### 26. `details/embroidery-collar-gold.jpg`
```
MASTER THEME + gold embroidery on collar edge, 1mm line following collar curve, white thobe collar edge macro, subtle luxury --ar 4:3
```

### 27. `details/monogram-cuff-ar.jpg`
```
MASTER THEME + Arabic initial monogram on cuff edge, letter "ف" in gold Naskh calligraphy 8mm tall, white thobe cuff side, gold thread, premium personalization --ar 1:1
```

---

## 8. LIFESTYLE / GIFTING — For preview & story (4)

### 28. `materials/silk-wrap.jpg`
```
MASTER THEME + premium thobe silk wrapping, matte black box interior, black silk fabric wrap, thin Sadu ribbon #D4AF37 tied bow top, closed gift, top-down, luxury unboxing --ar 1:1
```

### 29. `details/gift-card-handwritten.jpg`
```
MASTER THEME + cream gift card 8x6cm, handwritten Arabic "إلى فيصل — بكل فخر" in gold Naskh calligraphy with black ink, wax seal "و" small, on sand table with thobe edge blurred background --ar 4:3
```

### 30. `details/craft-table-hands.jpg`
```
MASTER THEME + artisan hands cutting white thobe fabric on aged wood table, large scissors, aged Saudi hands, close crop hands only no face, warm window light left, dust motes, authenticity --ar 4:3
```

### 31. `details/size-label-woven.jpg`
```
MASTER THEME + woven label inside thobe collar, black label with gold text "وسم WASM" Noto Kufi, macro of stitching label into collar seam, premium finishing --ar 4:3
```

---

## 9. Generation Workflow (Art Director Notes)

1. **Shoot in batches by category** — fabric 7 first, then buttons 6, then collar/placket 6 → keeps seed consistent. Use same seed for each batch (`--seed 428` fabric, `--seed 829` buttons).
2. **Always include MASTER THEME + palette lock** — prevents Midjourney drifting to purple/stock.
3. **Post-process:** desaturate -8%, add Sadu diamond overlay in Photoshop at 4% opacity multiply (provided in `ThobePreview.tsx` code). Export WebP 1600w + 800w, sRGB.
4. **Fail fallback:** builder already uses gradient fallback if file 404, so you can generate fabric 7 first and ship; collar/buttons can be gradient until next drop.
5. **No faces, no full body** — per Saudi luxury, avoid model face; texture/hands only. If you must use model, keep face out of frame chest-up.
6. **Keep one light direction** — left window always. So builder wall looks like one atelier window, not 6 different studios.

---

## 10. Quick Command Paste (Midjourney)

```
# Fabric example:
/imagine prompt: Luxury Saudi thobe atelier, dark atelier canvas #0B0B0B, warm sand beige #C8B08A, Egyptian cotton long-staple sheet plain weave tight 45 degree macro long silky fibers visible subtle sheen off-white #F5F0E8 folded with one soft diagonal drape sand beige table edge visible bottom raking light left --ar 1:1 --style raw --v 6 --s 180 --q 2

# Button example:
/imagine prompt: Luxury Saudi thobe atelier, dark atelier canvas #0B0B0B, 3 mother-of-pearl buttons on matte black velvet rainbow nacre iridescence side raking light shallow DOF top button sharp quiet luxury --ar 1:1 --style raw --v 6 --s 180 --q 2
```

Repeat with each file’s prompt above.

---

> Generated for WASM Atelier builder — matches site tokens #0B0B0B #141412 #C8B08A #D4AF37, glass/blur, Sadu whisper, and the “one atelier window” lighting system. Use exactly as written for cohesive material preview.
