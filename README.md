# Satyam Singh — Developer Portfolio

A responsive personal portfolio built with React and Vite. It presents Satyam's background, skills, featured projects, education, live profile metrics, and contact details in an animated interface with light and dark themes.

**Live portfolio:** [silently-code.vercel.app](https://silently-code.vercel.app/)

## Features

- **Responsive portfolio sections:** introduction, metrics, strengths, skills, projects, education, and contact.
- **Light and dark themes:** follows the visitor's system preference initially and remembers the chosen mode.
- **Accent color picker:** offers separate color palettes for light and dark mode. Accent selections reset to the default when the page is refreshed; shuffle selects a temporary random accent.
- **Animated interface:** terminal-style loading screen, scroll progress bar, cursor-following particle canvas, ambient background glow, animated cards, and interactive project cards.
- **Motion accessibility:** cursor and ambient effects are disabled for reduced-motion preferences; the particle field is reduced and static.
- **Project showcases:** descriptions, technology tags, repository/live links, project screenshots, and an optional copyable cURL example.
- **Command palette:** press `Ctrl+K` (or `⌘K` on macOS) to find navigation and project actions; press `Esc` to close it.
- **Profile metrics:** attempts to retrieve public repository and LeetCode totals, with fallback values if the services are unavailable.
- **Contact and convenience actions:** Formspree contact form, email-copy buttons, resume download, and optional interface sounds.

## Tech stack

- React 18
- Vite 5
- Tailwind CSS
- Framer Motion
- React Icons
- HTML Canvas API
- Formspree for contact form submissions

## Run locally

Prerequisites: Node.js 18 or later and npm.

```powershell
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Available commands

```powershell
npm run dev      # Start the local development server
npm run build    # Create a production build in dist/
npm run preview  # Preview the production build locally
npm run lint     # Run ESLint
```

## Project structure

```text
public/
  ai-resume-builder.png   # AI Resume Builder project screenshot
  supportdesk-crm.png     # SupportDesk CRM project screenshot
  nutriscan.png           # NutriScan project screenshot
  resume.pdf              # Downloadable resume
  avatar.jpg              # Portfolio avatar
  favicon.jpg             # Browser favicon / avatar fallback
src/
  components/             # Page sections and interactive UI components
  data/portfolioData.js   # Portfolio text, contact details, skills, and projects
  utils/                  # Theme color and audio utilities
  App.jsx                 # Application state and page composition
  index.css               # Tailwind entry point and global motion/theme styles
```

## Update portfolio content and images

- Edit `src/data/portfolioData.js` to update the profile, metrics, skills, and project details.
- Replace the downloadable resume at `public/resume.pdf`. Download links use the same case-sensitive path, `/resume.pdf`.
- Project screenshots are configured in each project's `image` field in `src/data/portfolioData.js`. Keep these filenames in `public/`, or change the field to match your new asset.
- The contact form endpoint and public profile links are configured in `personalInfo` in `src/data/portfolioData.js`.

Use genuine screenshots of your own projects and ensure they are optimized for the web. A 16:9 image is a good fit for the project preview cards.

## Live metrics and service availability

The portfolio requests the GitHub public repository count and LeetCode solved total from external services. Those services can rate-limit or block browser requests (including through CORS); if a request fails, the portfolio keeps its fallback metric rather than blocking the page.

Contact form delivery depends on the Formspree endpoint configured in `src/data/portfolioData.js`.

## Production deployment

The app builds to the static `dist/` directory. For Vercel, connect the repository and use:

- **Build command:** `npm run build`
- **Output directory:** `dist`

The same build output can be hosted by any static hosting provider that supports Vite-built single-page applications.

## Maintainer

**Satyam Singh**

- [GitHub](https://github.com/silent-coder-dev)
- [LinkedIn](https://www.linkedin.com/in/satyam-singh-05b369376/)
- [LeetCode](https://leetcode.com/u/silently_code/)
- [Email](mailto:satyam.singh261103@gmail.com)
