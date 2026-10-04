# VELVET Landing Page - Complete Redesign Plan
## Minimalist & High-End Niche Branding

---

## 1. DESIGN PHILOSOPHY
- **Aesthetic**: Minimalist elegance, high-fashion niche brand
- **Feel**: Editorial, thoughtful, premium
- **Approach**: White/negative space, typography-driven, imagery as hero
- **Vibe**: Comme des Garçons meets Acne Studios (clean, intentional, exclusive)

---

## 2. COLOR PALETTE
### Primary Colors
- **Background**: Off-white `#fefefe` (not pure white, softer)
- **Text Primary**: Deep charcoal `#1a1a1a` (not pure black)
- **Text Secondary**: Mid-gray `#6b6b6b`
- **Accent**: Deep navy/midnight `#0a1a2e` (sophisticated, not amber)

### Secondary (Subtle)
- **Borders**: `#e8e8e8` (barely visible)
- **Hover state**: `#f5f5f5` (light gray lift)
- **Success/highlight**: `#2a2a2a` (dark gray emphasis)

### No colors: ✗ Gradients, ✗ Vibrant colors, ✗ Multiple accent colors

---

## 3. TYPOGRAPHY SYSTEM

### Font Stack
- **Primary**: `Inter` or `Sohne` (geometric, modern, minimal) - fallback to system sans
- **Serif** (optional, for quotes): `Crimson Text` or system serif

### Hierarchy
| Element | Size | Weight | Line-height | Letter-spacing | Notes |
|---------|------|--------|-------------|-----------------|-------|
| H1 Hero | 4rem (64px) | 500 | 1.1 | -0.02em | Bold but refined |
| H2 Section | 2rem (32px) | 600 | 1.2 | -0.01em | Strong hierarchy |
| H3 Subsection | 1.25rem (20px) | 600 | 1.3 | 0 | Clear distinction |
| Body/P | 1rem (16px) | 400 | 1.6 | 0 | Generous leading |
| Small text | 0.875rem (14px) | 400 | 1.5 | 0 | Form labels, captions |
| Micro | 0.75rem (12px) | 500 | 1.4 | 0.05em | Category tags |

**Rule**: No black headings, use `#1a1a1a`. Max 2 weights per section.

---

## 4. SPACING & LAYOUT

### 8px Grid System (4px increments)
- `space-1` = 4px | `space-2` = 8px | `space-3` = 12px | `space-4` = 16px
- `space-6` = 24px | `space-8` = 32px | `space-12` = 48px | `space-16` = 64px

### Section Padding
- **Horizontal**: `px-4 sm:px-8 lg:px-12` (16px → 32px → 48px)
- **Vertical**: `py-16 lg:py-24` (64px → 96px) - more breathing room
- **Container**: `max-w-6xl` (not 7xl - more intimate)

### Component Gaps
- **Grid gap**: `gap-8` (32px) default, `gap-12` (48px) for spacious sections
- **Flex gap**: `gap-6` (24px) for inline elements
- **Text spacing**: `mb-4` (16px) between paragraphs, `mb-6` (24px) between sections

---

## 5. COMPONENT SPECIFICATIONS

### Navigation
- **Height**: 64px (h-16)
- **Background**: Transparent initially, solid `#fefefe` on scroll
- **Logo**: 18px, weight 600, text only, no gradient
- **Link spacing**: `gap-8` between nav items
- **Mobile**: Hamburger icon, slide-down menu

### Hero Section
- **Layout**: Single column (not 2-column grid)
- **Image**: Full-width background image, no overlay
- **Content box**: Positioned overlay, centered, semi-transparent background `rgba(255,255,255,0.95)`
- **Max-width content**: 600px
- **CTA buttons**: Single primary button, minimal secondary text link
- **Text alignment**: Center or left (test both)

### Product Showcase / Gallery
- **Layout**: Masonry + Grid hybrid
  - Mobile: 1 column
  - Tablet: 2 columns
  - Desktop: 3-4 columns with varied sizing
- **Image aspect ratios**: Mix of 1:1, 3:4, 2:3, 4:5 for visual interest
- **Card styling**: Minimal border `1px solid #e8e8e8`, white background
- **Product info**: Title + price only (no ratings, no badges)
- **Hover**: Subtle lift `shadow-sm`, image zoom 1.05x
- **Gap**: `gap-6` (24px)

### Brand Story / About
- **Layout**: Image left, text right (or alternating)
- **Image**: High-quality, 1:1 aspect ratio, possibly BW or desaturated
- **Text**: Max 70% width, generous line-height (1.8+)
- **Callout**: Use blockquote styling for key statements
- **Details section**: Grid of 2-3 columns (Materials, Craftsmanship, Sustainability)

### Testimonials
- **Style**: Minimal, no cards initially
- **Layout**: Carousel or grid (3 items, max)
- **Format**: Quote + attribution only, no photos required
- **Typography**: Larger font for quotes, serif optional
- **Separator**: Simple line divider between testimonials

### Footer
- **Background**: `#1a1a1a` (dark but not black)
- **Links**: Simple vertical lists, no heavy styling
- **Social icons**: Minimal, size 20px
- **Layout**: 4-column grid (Brand, Shop, Support, Brand Info)

---

## 6. ANIMATION & TRANSITIONS

### Rules (Restraint > Excess)
- **Default transition**: 300ms, `ease-out`
- **Page load**: Fade-in + subtle slide-up (200-400ms)
- **Hover states**: Scale 1.02-1.05 (not 1.1), color change 200ms
- **Scroll animations**: `whileInView` fade-in only, no complex parallax
- **Disable**: Spinning, bouncing, rainbow gradients, auto-playing anything

### Specific Animations
| Element | Animation | Duration | Trigger |
|---------|-----------|----------|---------|
| Hero heading | Fade-in + slide-up | 600ms | Page load |
| Gallery items | Staggered fade-in | 400ms | Scroll into view |
| Images on hover | Zoom 1.05x | 500ms | Mouse hover |
| CTA buttons | Scale 1.02 | 200ms | Mouse hover |
| Nav background | Fade-in | 300ms | Scroll > 20px |

---

## 7. IMAGERY GUIDELINES

### Hero Image
- Full-bleed, no text overlay needed (minimal design)
- Could be product, lifestyle, or fabric close-up
- Preferred: Single strong image, 2000px+ width

### Product Gallery Images
- Mix of flat-lay, lifestyle, detail shots
- Consistent lighting/color grading
- Alt text descriptive (SEO + accessibility)
- Lazy-load with blur placeholder

### About/Brand Imagery
- Behind-the-scenes or artisan detail shots
- Fabric close-ups, production process
- Preferably: B&W or muted color palette

---

## 8. STRUCTURE & PAGE SECTIONS

### Page Flow
1. **Navbar** (fixed) → minimal, transparent
2. **Hero** → Single image or minimal text introduction
3. **Brand Story** → "About VELVET" narrative, fabric/craftsmanship focus
4. **Product Gallery** → Masonry showcase with brief descriptions
5. **Details** → Process, materials, sustainability (editorial style)
6. **Testimonials** → Light social proof (3-4 quotes)
7. **CTA Section** → Newsletter or simple contact (minimal)
8. **Footer** → Links, social, copyright

---

## 9. BUTTONS & INTERACTIVE ELEMENTS

### Button Styles
- **Primary**: `bg-#1a1a1a text-white px-6 py-3 border-none rounded-none` (no rounded corners, sharp)
- **Secondary**: `bg-transparent border-1 border-#1a1a1a text-#1a1a1a`
- **Tertiary**: Plain text link with underline on hover
- **Min height**: 40px (touch target)
- **Font weight**: 500-600

### Form Inputs
- **Border**: 1px solid `#e8e8e8`
- **Background**: White/`#fefefe`
- **Focus**: Border color to `#1a1a1a`, no outline
- **Placeholder**: `#9b9b9b`

---

## 10. RESPONSIVE BREAKPOINTS

```
Mobile: < 640px
  - Single column layouts
  - Larger text (slight increase)
  - Touch-friendly spacing

Tablet: 640px - 1024px
  - 2-column grids
  - Balanced padding

Desktop: > 1024px
  - 3-4 column grids
  - Max-width 1200px container
  - Full-width gallery variations
```

---

## 11. STYLING CONSTRAINTS

### ✓ DO
- Use only defined colors (no random hex codes)
- Consistent spacing (multiples of 4px)
- Typography hierarchy strictly followed
- Minimal shadows (only on hover/lift states)
- Clean, scannable layouts
- Generous whitespace

### ✗ DON'T
- Gradients or color blends
- Drop shadows on everything
- Heavy blur effects
- Auto-play videos or animations
- Comic Sans or script fonts
- Justify text alignment
- Multiple accent colors
- Rounded corners (keep it sharp)

---

## 12. FILE STRUCTURE (Components to Build)

```
src/
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── BrandStory.tsx
│   ├── ProductGallery.tsx (new)
│   ├── Details.tsx (new - materials/process)
│   ├── Testimonials.tsx
│   ├── Newsletter.tsx (simplified)
│   ├── Footer.tsx
│   └── shared/
│       └── Button.tsx (reusable)
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
```

---

## 13. NEXT STEPS (Delegable Tasks)

### Task 1: Global Styles & CSS Variables
- Set up `globals.css` with color variables, typography, spacing system
- Create utility classes for buttons, cards, text sizes

### Task 2: Navbar Component
- Sticky nav with scroll detection
- Logo, nav links, mobile hamburger menu
- Transparent → solid background transition

### Task 3: Hero Section
- Full-width image + centered text overlay
- Single CTA button
- Minimal, elegant layout

### Task 4: Brand Story Section
- Two-column layout (image + text)
- Storytelling focus on craftsmanship
- Details grid (Materials, Process, Sustainability)

### Task 5: Product Gallery
- Masonry/grid layout with mixed aspect ratios
- Hover states (zoom + shadow)
- Product title + price minimal display

### Task 6: Testimonials & Newsletter
- Simple quote display (no cards)
- Newsletter signup form (minimal)

### Task 7: Footer
- Multi-column links layout
- Social media icons
- Dark background, simple styling

---

## SUMMARY FOR AGENT

**Brand Identity**: VELVET is minimalist, high-fashion, niche — think editorial luxury, not loud streetwear. Strict typography, neutral colors (no ambers). Whitespace is intentional. Animations are restrained. Gallery-heavy focus with brief, thoughtful storytelling about fabrics and craftsmanship.

**Key Rule**: When in doubt, remove it. Less is more. If it doesn't serve the minimalist aesthetic or the story, it goes.

