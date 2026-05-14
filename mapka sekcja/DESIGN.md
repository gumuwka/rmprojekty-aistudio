---
name: Precision Solar Design System
colors:
  surface: '#fff8f5'
  surface-dim: '#ecd6c9'
  surface-bright: '#fff8f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff1ea'
  surface-container: '#ffeadf'
  surface-container-high: '#fbe4d7'
  surface-container-highest: '#f5ded2'
  on-surface: '#251912'
  on-surface-variant: '#584235'
  inverse-surface: '#3b2e25'
  inverse-on-surface: '#ffede4'
  outline: '#8b7263'
  outline-variant: '#dfc0af'
  surface-tint: '#974900'
  primary: '#974900'
  on-primary: '#ffffff'
  primary-container: '#ff7f00'
  on-primary-container: '#5e2b00'
  inverse-primary: '#ffb688'
  secondary: '#5f5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e2dfde'
  on-secondary-container: '#636262'
  tertiary: '#005cba'
  on-tertiary: '#ffffff'
  tertiary-container: '#6ba3ff'
  on-tertiary-container: '#003875'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbc7'
  primary-fixed-dim: '#ffb688'
  on-primary-fixed: '#311300'
  on-primary-fixed-variant: '#733600'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#d7e3ff'
  tertiary-fixed-dim: '#aac7ff'
  on-tertiary-fixed: '#001b3e'
  on-tertiary-fixed-variant: '#00458e'
  background: '#fff8f5'
  on-background: '#251912'
  surface-variant: '#f5ded2'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.05em
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.5'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style

This design system is built for a Photovoltaic (PV) engineering firm, where technical accuracy meets renewable energy innovation. The brand personality is **Authoritative, Energetic, and Transparent**. It evokes the feeling of a high-end engineering studio: clean, organized, and meticulously planned.

The design style is **Corporate Modern with a Precision Engineering edge**. It utilizes heavy whitespace to suggest an "airy" atmosphere, while maintaining structural integrity through strict alignment and subtle tectonic layering. The interface avoids unnecessary decoration, focusing instead on clarity of data and the vibrancy of the primary action color.

## Colors

The palette is anchored by a **Vibrant Orange**, symbolizing solar energy and high visibility. 

- **Primary (#ff7f00):** Reserved for primary call-to-actions, progress indicators, and critical brand moments.
- **Surface Strategy:** The "Pure White" background serves as the base canvas. The "Light Gray" (#f8f9fa) is used for secondary surfaces like sidebar backgrounds, card containers, and table headers to provide subtle structural depth without introducing heavy shadows.
- **Neutrality:** We use a cool-toned grayscale to maintain a professional, engineering-grade feel. Text is primarily set in **Gray-900** for high legibility, avoiding pure black to reduce eye strain.

## Typography

This design system utilizes **Inter** for all UI elements to ensure maximum legibility and a neutral, systematic tone. 

- **Headlines:** Use tighter letter-spacing and semi-bold weights to create a sense of structural density.
- **Labels:** Small caps or uppercase with increased letter-spacing are used for technical metadata and table headers, echoing engineering blueprints.
- **Mono Integration:** For technical specifications and coordinate data (lat/long), a monospaced font (JetBrains Mono) can be used sparingly to reinforce the "Precision Engineering" aesthetic.

## Layout & Spacing

The layout philosophy follows a **Fixed-Fluid Hybrid Grid**. 

- **Desktop:** A 12-column grid with a 1280px max-width container. Margins are generous (40px+) to maintain an "airy" feel.
- **Rhythm:** A 4px baseline grid ensures vertical consistency. All spacing increments (padding, margins) must be multiples of 4.
- **Data Density:** While the general UI is airy, data-heavy views (project lists, spec sheets) should utilize "Compact" spacing (8px-12px internal padding) to maximize information density.

## Elevation & Depth

To maintain the "Precision Engineering" aesthetic, depth is achieved through **Low-Contrast Outlines** and **Ambient Shadows** rather than heavy blurs.

- **Level 0 (Base):** Pure White (#ffffff).
- **Level 1 (Surfaces):** Subtle Gray (#f8f9fa) with a 1px border (#e9ecef). Used for cards and inset sections.
- **Level 2 (Hover/Floating):** A very soft shadow: `0px 4px 12px rgba(0, 0, 0, 0.05)`. 
- **Level 3 (Modals/Overlays):** A more defined shadow to signify height: `0px 12px 24px rgba(0, 0, 0, 0.08)`.

Avoid using shadows on buttons; use color fills or subtle 1px borders to maintain a flat, technical appearance.

## Shapes

The design system employs a **Rounded (8px-12px)** shape language. This softens the technical nature of the engineering data, making the platform feel modern and accessible.

- **Small Components (Buttons, Inputs):** 8px radius.
- **Large Components (Cards, Modals):** 12px radius.
- **Data Chips:** Fully pill-shaped (100px) to distinguish them from interactive buttons.

## Components

### Buttons
- **Primary:** Vibrant Orange (#ff7f00) background, white text. No shadow, 8px radius.
- **Secondary:** White background with a 1px Light Gray (#e9ecef) border.
- **States:** Hover states should be a 10% darken of the base color. Focus states use a 2px orange ring with a 2px white offset.

### Input Fields
- **Styling:** White background, 1px Gray-200 border, 8px radius. 
- **Interaction:** On focus, the border changes to Primary Orange. Labels are always visible (never placeholder-only) to maintain engineering clarity.

### Cards
- **Construction:** Use Level 1 elevation (Subtle gray background or 1px border). 
- **Content:** Header sections within cards should have a subtle bottom border (#f1f3f5) to separate titles from body content.

### Data Visualization & Progress
- **Charts:** Use the Primary Orange for the main data series. Use secondary blues or teals for comparative data to avoid visual monotony.
- **Technical Tables:** Headers should be #f8f9fa with `label-md` typography. Row borders should be hair-thin (#f1f3f5).

### Additional Components
- **System Status Indicators:** Small, vibrant dots (Green/Red/Orange) for real-time PV array status.
- **Metric Tiles:** Large-format numbers (`headline-lg`) with `label-md` units (e.g., "450 kW") for high-level dashboard summaries.