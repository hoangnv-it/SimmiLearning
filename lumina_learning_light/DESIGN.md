---
name: Lumina Learning Light
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#3c494a'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#6c7a7a'
  outline-variant: '#bbc9ca'
  surface-tint: '#00696f'
  primary: '#00696f'
  on-primary: '#ffffff'
  primary-container: '#00b2bb'
  on-primary-container: '#003e42'
  inverse-primary: '#50d9e2'
  secondary: '#00696f'
  on-secondary: '#ffffff'
  secondary-container: '#0bf1fd'
  on-secondary-container: '#006a6f'
  tertiary: '#565e74'
  on-tertiary: '#ffffff'
  tertiary-container: '#99a0b9'
  on-tertiary-container: '#2f374c'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#72f5ff'
  primary-fixed-dim: '#50d9e2'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f53'
  secondary-fixed: '#70f6ff'
  secondary-fixed-dim: '#00dce7'
  on-secondary-fixed: '#002022'
  on-secondary-fixed-variant: '#004f53'
  tertiary-fixed: '#dae2fd'
  tertiary-fixed-dim: '#bec6e0'
  on-tertiary-fixed: '#131b2e'
  on-tertiary-fixed-variant: '#3f465c'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '600'
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
  lg: 40px
  xl: 64px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style

This design system targets an educational technology audience seeking a balance between clinical precision and approachable modernity. The brand personality is "Enlightened Clarity"—focusing on high legibility, expansive white space, and energetic cyan accents that suggest digital innovation and intelligence. 

The design style is **Corporate Modern with a Soft Edge**. It utilizes a light-mode interface to maximize readability during long study sessions, while employing subtle elevation and vibrant accent colors to guide the user’s eye toward primary actions. The aesthetic is professional yet inviting, avoiding the stark coldness of traditional enterprise software through the use of generous rounded corners and fluid transitions.

## Colors

The palette is anchored by a high-contrast foundation of pure whites and soft slates to ensure a clean, "paper-like" feel. 

- **Primary (#00B2BB):** Used for interactive elements, primary buttons, and active states. It provides the necessary contrast against light backgrounds while maintaining the brand's signature cyan identity.
- **Secondary (#16F3FF):** Reserved for highlights, progress bars, and decorative glows. This "Electric Cyan" adds a sense of energy and digital sophistication.
- **Tertiary (#0F172A):** A deep slate blue used exclusively for typography and iconography to ensure WCAG AAA compliance for readability.
- **Neutral (#F8FAFC):** The primary background shade, providing a subtle separation from pure white surface cards.

## Typography

The design system exclusively utilizes **Hanken Grotesk** to maintain a clean, sharp, and contemporary feel. The typographic hierarchy is built on a modular scale to emphasize structure and scanability.

Headlines use semi-bold and bold weights with slightly tightened letter-spacing to create a strong visual anchor. Body text is set with generous line-height to facilitate long-form reading, essential for an educational platform. Labels and captions utilize medium weights to maintain legibility at smaller sizes. On mobile devices, the largest display type scales down to prevent awkward line breaks while maintaining its weight-based hierarchy.

## Layout & Spacing

The layout philosophy follows a **fluid grid** system based on an 8px square baseline. 

- **Desktop:** A 12-column grid with 24px gutters. Content is typically contained within a 1280px max-width wrapper.
- **Tablet:** An 8-column grid with 20px gutters. 
- **Mobile:** A 4-column grid with 16px gutters and 16px side margins.

Spacing between functional groups (like card sections) should use `lg` (40px) or `xl` (64px) units to create "breathing room," reinforcing the brand's focus on clarity. Small UI clusters like input fields and their labels use `xs` (4px) or `base` (8px) units to maintain proximity.

## Elevation & Depth

This design system uses **Ambient Shadows** to create a sense of organized layering without the heaviness of traditional skeuomorphism. 

- **Surface Level (Level 0):** Used for the main background (#F8FAFC).
- **Card Level (Level 1):** Pure white (#FFFFFF) surfaces with a soft, highly diffused shadow (0px 4px 20px rgba(15, 23, 42, 0.05)).
- **Overlay Level (Level 2):** Modals and dropdowns use a more pronounced shadow (0px 12px 32px rgba(15, 23, 42, 0.12)) to clearly separate them from the content beneath.

Low-contrast outlines (1px solid #E2E8F0) are used on Level 1 elements to define boundaries in high-brightness environments where shadows may wash out.

## Shapes

The shape language is consistently **Rounded**, signaling a friendly and modern user experience. 

- **Standard Buttons & Inputs:** Use the base 0.5rem (8px) radius.
- **Cards & Sections:** Use `rounded-lg` (1rem / 16px) to create a distinct container feel.
- **Featured Banners & Modals:** Use `rounded-xl` (1.5rem / 24px) for a more pronounced, modern look.

Search bars and status chips may occasionally use pill-shaping (full radius) to differentiate them from functional input fields.

## Components

- **Buttons:** Primary buttons use the Primary Cyan (#00B2BB) with white text. Secondary buttons use a transparent background with a 1px Primary Cyan border. High-impact buttons should include a subtle 2px Secondary Cyan (#16F3FF) bottom "glow" on hover.
- **Chips/Badges:** Used for category tags. Light Primary Cyan background (10% opacity) with Primary Cyan text.
- **Lists:** Items separated by thin #F1F5F9 dividers. Active states are indicated by a 4px Primary Cyan vertical bar on the left edge.
- **Input Fields:** Pure white background, #E2E8F0 border. On focus, the border shifts to Primary Cyan with a 3px soft cyan outer glow.
- **Cards:** White surfaces with Level 1 shadows. Header areas of cards may use a very subtle #F8FAFC top section to differentiate metadata from content.
- **Progress Indicators:** Use the Secondary Cyan (#16F3FF) for the "fill" to represent energy and progress, contrasted against a #E2E8F0 track.
- **Checkboxes/Radios:** Use Primary Cyan for the checked state. Unchecked states should use a neutral #CBD5E1 border.