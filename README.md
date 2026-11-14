# HEALTHMATE — AI-Powered Healthcare Platform

**HEALTHMATE** is an AI-based healthcare platform crafted to help patients and families understand and manage their health information simply, securely, and calmly.

---

## 🌟 Architecture & Flow

1. **Public Hero Home Page**:
   - Visitors land on the clean, welcoming **Hero Home Page** matching the exact color scheme (`#2c4a34`, `#e4ede5`, `#f4f7f4`, and typography) from your design.
   - Features the doctor and patient consultation photograph.
   - Direct CTAs to **"Create free account"** or **"Log in to your workspace"**.
   - **Guest mode has been completely removed**: all internal dashboard pages (reports, records, reminders) are securely gated behind authentication.

2. **Full Workspace (Unlocks Post Sign Up / Log In)**:
   - **Overview Dashboard**: Health at a glance, quick metrics, simplified latest report, and upcoming reminders.
   - **My Reports**: Plain-English medical summaries, in-range/below-range status badges, and visit question checklists.
   - **Health Records**: Centralized personal health documents locker.
   - **Reminders**: Active medicine schedule with adherence tracking and upcoming doctor checkups.
   - **Floating AI Health Assistant**: Circular pop-out action button on the bottom-right for instant questions.

---

## 🚀 Running the Project Locally

```bash
# Install dependencies
npm install

# Run the dev server
npm run dev

# Build for production
npm run build
```

Open `http://localhost:3000` in your web browser.
