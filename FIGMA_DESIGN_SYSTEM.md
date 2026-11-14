# HEALTHMATE — Figma Design System & Specification Tokens

This specification document outlines all design tokens, component hierarchies, auto-layout definitions, typography scales, and screen layouts to construct or import the exact HEALTHMATE UI into Figma.

---

## 1. Color Palette (Styles / Variables)

Create the following Color Variables in Figma under a `HealthMate/` collection:

### Primary / Brand (Forest Green)
- `Brand/Primary-900`: `#142318`
- `Brand/Primary-800`: `#1a2c20`
- `Brand/Primary-700`: `#203626`
- `Brand/Primary-600` (Main CTA): `#2c4a34`
- `Brand/Primary-500`: `#3b5e44`
- `Brand/Primary-400`: `#55775f`

### Surfaces & Backgrounds (Sage & Neutral)
- `Surface/Background`: `#f4f7f4` (Main app workspace canvas)
- `Surface/Card-Base`: `#eaf1eb` (Overview card fill)
- `Surface/Card-Accent`: `#e4ede5` (Header hero upload banner fill)
- `Surface/White`: `#ffffff` (Table rows, input backgrounds, modal surfaces)
- `Surface/Subtle`: `#edf3ee` (Hover states, badges)

### Borders & Dividers
- `Border/Default`: `#dce6dd`
- `Border/Strong`: `#d4e1d6`
- `Border/Light`: `#edf3ed`
- `Border/Brand-Ring`: `#b9d4bd`

### Typography & Neutrals
- `Text/Heading`: `#1a2b1f`
- `Text/Body`: `#243329`
- `Text/Muted`: `#5a6c5e`
- `Text/Subtle`: `#637667`
- `Text/Disabled`: `#86998b`

### Status Indicators
- `Status/In-Range-Bg`: `#c5d8c7`
- `Status/In-Range-Text`: `#243e2b`
- `Status/Below-Range-Bg`: `#ccd8cd`
- `Status/Below-Range-Text`: `#4f6453`
- `Status/Online-Neon`: `#22e75e` (Online ping indicator)

---

## 2. Typography Hierarchy (Text Styles)

Font Family: **Plus Jakarta Sans**

| Style Name | Weight | Size | Line Height | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- |
| `Display/Hero` | ExtraBold (800) | 54px | 62px | -0.02em |
| `Heading/H1` | Bold (700) | 28px | 34px | -0.01em |
| `Heading/H2` | Bold (700) | 20px | 26px | -0.01em |
| `Heading/H3` | SemiBold (600) | 16px | 22px | 0em |
| `Body/Regular` | Regular (400) | 14px | 20px | 0em |
| `Body/Medium` | Medium (500) | 14px | 20px | 0em |
| `Body/Small` | Regular (400) | 12px | 18px | 0em |
| `Caption/Bold` | SemiBold (600) | 11px | 16px | +0.02em |
| `Badge/Caps` | SemiBold (600) | 9px | 12px | +0.10em (Uppercase) |

---

## 3. Core Component Library

### A. Navigation & Brand
1. **Sidebar Navigation**:
   - Width: `256px` fixed
   - Fill: `#f4f7f4`, Right Border: `1px solid #dbe6dc`
   - Header: Custom emblem (`40x40px`) + "HEALTHMATE" title + "YOUR HEALTH, SIMPLIFIED" subtitle
   - Menu Items: Overview, My reports (badge: 8), Health records, Reminders
   - Active Item: Fill `#dce9de`, Text `#1c2e21`, Radius `12px`
   - Bottom: Privacy assurance card + User profile switcher

2. **Top Header Bar**:
   - Height: `64px`, sticky
   - Fill: `#f4f7f4` with background blur
   - Global Search input: Radius `12px`, Fill `#ffffff`, Border `#d2dfd5`, Width `640px`
   - Right: "Upload" CTA button (`#425d49`) + User initials avatar circle (`#3d5e46`)

### B. Cards & Panels
1. **Hero Upload Banner**:
   - Fill: `#e4ede5`, Border: `1px solid #d2dfd4`, Radius `16px`, Padding `24px`
   - Title: "Medical terms shouldn't be a mystery."
   - Button: "Upload a report" (`#425d49`, Text White, Radius `12px`)

2. **Metric Summary Pills (3x Grid)**:
   - Fill: `#e9f0ea`, Border: `1px solid #d6e2d8`, Radius `16px`, Padding `18px`
   - Variants:
     - "08 Medical reports · All reports in one place"
     - "02 Active medicines · Stay on top of your routine"
     - "16 Nov Next appointment · Monday · 10:30 AM"

3. **Latest Report Summary Card**:
   - Fill: `#eaf1eb`, Border: `1px solid #d4e1d6`, Radius `16px`, Padding `24px`
   - Inner verdict sub-box: Fill `#ffffff` 80% opacity, Radius `12px`, Sparkles icon
   - Micro table: Columns: `TEST`, `YOUR RESULT`, `LAB REFERENCE`, `STATUS`

4. **Floating AI Assistant Hover Button**:
   - Position: Bottom-Right `24px / 24px`
   - Tooltip pill: Fill `#eaf1eb`, Border `#cad9cc`, Text "Ask HealthMate AI"
   - Button: Circle `56x56px`, Fill `#2c4a34`, Border `2px solid #b9d4bd`, Shadow `0 20px 25px -5px rgba(0, 0, 0, 0.1)`
   - Status Badge: `14x14px`, Fill `#22e75e` with white ring

---

## 4. Screen Layout Wireframes

1. **Screen 1: Public Hero Home Page (`1440 x 900px`)**
   - Header with Logo and Log In / Get Started buttons
   - 12-column grid:
     - Left (7 cols): Main headline, explanation copy, CTA buttons, and trust checklist
     - Right (5 cols): Rounded photo frame (`doctor-patient.jpg`) with floating "Annual health checkup · AI explained" glass card

2. **Screen 2: Authenticated Overview Dashboard (`1440 x 960px`)**
   - Sidebar + Top Header
   - Greeting "Good morning, Alex"
   - Hero Upload Callout
   - 3-Column Quick Metrics
   - 2-Column Split: Latest Report Breakdown (left) + Reminders & Adherence status (right)
   - Floating AI Bot Button in bottom corner

3. **Screen 3: AI Chat Pop-Out Drawer (`400 x 620px`)**
   - Sage green frame (`#f4f7f4`, `#e9f0ea`)
   - Header with HEALTH MATE emblem and expand/close buttons
   - Conversational stream with patient and AI bubbles
   - Frequent question pills + Input form
