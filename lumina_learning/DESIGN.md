---
name: Lumina Learning
colors:
  surface: '#001620'
  surface-dim: '#001620'
  surface-bright: '#213c4a'
  surface-container-lowest: '#001019'
  surface-container-low: '#001e2b'
  surface-container: '#04232f'
  surface-container-high: '#112d3a'
  surface-container-highest: '#1d3845'
  on-surface: '#cae7f8'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#cae7f8'
  inverse-on-surface: '#183441'
  outline: '#849495'
  outline-variant: '#3a494b'
  surface-tint: '#00dce7'
  primary: '#e4fdff'
  on-primary: '#00373a'
  primary-container: '#16f3ff'
  on-primary-container: '#006b71'
  inverse-primary: '#00696f'
  secondary: '#50d9e2'
  on-secondary: '#00373a'
  secondary-container: '#00b2bb'
  on-secondary-container: '#003e42'
  tertiary: '#e4fdff'
  on-tertiary: '#00373a'
  tertiary-container: '#8bebf2'
  on-tertiary-container: '#006b71'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#70f6ff'
  primary-fixed-dim: '#00dce7'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f53'
  secondary-fixed: '#72f5ff'
  secondary-fixed-dim: '#50d9e2'
  on-secondary-fixed: '#002022'
  on-secondary-fixed-variant: '#004f53'
  tertiary-fixed: '#91f2f9'
  tertiary-fixed-dim: '#75d5dd'
  on-tertiary-fixed: '#002022'
  on-tertiary-fixed-variant: '#004f54'
  background: '#001620'
  on-background: '#cae7f8'
  surface-variant: '#1d3845'
typography:
  headline-xl:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  caption:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style

The design system is engineered to create an encouraging, high-clarity environment for language acquisition. By blending **Corporate Modern** structure with **Minimalist** breathing room, the interface minimizes cognitive load, allowing students to focus entirely on linguistic nuances. The aesthetic is "Illuminated Professional"—utilizing deep navy foundations contrasted with high-energy cyans to evoke a sense of digital intelligence and optimistic progress. 

The target audience ranges from young professionals to casual learners who require a interface that feels both technologically advanced and approachable. Every interaction is designed to feel like a steady forward motion, reducing the friction often associated with learning a new language.

## Colors

The color strategy uses a **Deep Navy (#14303D)** base to provide a stable, low-strain background for extended study sessions. The **Bright Cyan (#16F3FF)** serves as the primary action color, used for interactive elements and progress indicators to maintain high energy. 

**Teal (#00B2BB)** and **Dark Teal (#00838A)** are utilized for secondary information hierarchy and semantic grouping, while the **Light Cyan (#E2FDFE)** surface color is reserved for high-contrast text areas or "paper" metaphors where maximum readability is required for long-form English text.

## Typography

This design system employs a dual-sans-serif pairing. **Hanken Grotesk** is used for headlines and labels to provide a clean, sharp, and contemporary edge that feels precise. **Plus Jakarta Sans** is the primary body face; its soft, rounded terminals and open apertures make it exceptionally legible for non-native speakers, reducing reading fatigue during vocabulary and grammar exercises.

- **Headlines:** Use Bold weights for major milestones and Semi-Bold for section headers.
- **Body Text:** Use Regular weight for standard text and Medium for emphasis.
- **Labels:** Always use Hanken Grotesk in Medium or Semi-Bold to distinguish functional UI from content.

## Layout & Spacing

The layout philosophy follows a **Fluid Grid** model with generous safe areas. To reduce cognitive load, the system prioritizes "Vertical Rhythm" and avoids cluttered horizontal arrangements.

- **Desktop:** 12-column grid with 24px gutters. Content width should be capped at 1120px for readability.
- **Tablet:** 8-column grid with 24px gutters.
- **Mobile:** 4-column grid with 16px margins. 

Use the `lg` (48px) and `xl` (80px) spacing tokens between major content blocks (e.g., between a lesson video and the exercise quiz) to give the user's eyes a "place to rest."

## Elevation & Depth

This design system uses **Tonal Layers** combined with **Ambient Shadows** to create a sense of focused depth. Since the background is a deep navy, shadows should be saturated and dark (using a 15-20% opacity of the background color) rather than pure black.

- **Level 0 (Background):** Deep Navy (#14303D).
- **Level 1 (Cards/Inputs):** Teal (#00B2BB) at 10% opacity with a subtle 1px border of Dark Teal.
- **Level 2 (Active/Hover):** Surface Cyan (#E2FDFE) with a soft, diffused shadow (12px blur, 4px Y-offset) to indicate interactivity.
- **Overlays:** Use a 40% backdrop blur on the Navy background for modals to keep the user grounded in the lesson context.

## Shapes

The shape language is defined as **Rounded**, utilizing a base 0.5rem (8px) radius. This strikes a balance between the precision of a professional tool and the friendliness of an educational app.

- **Small Components (Buttons, Inputs):** 8px (0.5rem).
- **Medium Components (Cards, Modals):** 16px (1rem).
- **Large Components (Sections, Feature Containers):** 24px (1.5rem).
- **Progress Bars:** Use full pill-shaping (999px) to convey continuous motion.

## Components

### Buttons
- **Primary:** Bright Cyan background, Navy text, 8px radius. On hover, apply a subtle glow effect using the primary color.
- **Secondary:** Transparent background with a 2px Teal border.
- **States:** Disabled buttons should drop to 30% opacity with no glow.

### Cards
- **Lesson Cards:** Use the Navy background with a 1px Teal border. On hover, the border thickens or brightens to Primary Cyan.
- **Content Cards:** Use the Surface Cyan (#E2FDFE) with dark Navy text for maximum contrast during reading exercises.

### Input Fields
- Inputs should have a 2px border using the Dark Teal color. When focused, the border transitions to Primary Cyan with a soft outer glow. Use Hanken Grotesk for placeholder text to maintain a professional feel.

### Chips & Progress
- **Status Chips:** Use rounded-xl (pill) shapes. "Correct" answers use Primary Cyan; "Retry" uses Secondary Teal.
- **Progress Bars:** High-contrast Primary Cyan on a Dark Teal track.

### Lists
- Vocabulary lists should include generous vertical padding (16px) between items and a subtle separator line in Dark Teal (20% opacity).