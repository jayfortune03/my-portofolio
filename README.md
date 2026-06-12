# My Portfolio

Personal portfolio website for Ne, positioned for full-stack, frontend, and backend engineering roles. The site highlights production experience, selected projects, tech stack, Hacktiv8 certification, downloadable CV, contact links, and an interactive 3D project journey.

Live site: https://www.nf-dev.srvhm.my.id/

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Material UI
- Framer Motion
- Three.js with `@react-three/fiber` and `@react-three/drei`

## Features

- Responsive portfolio layout with dark and light modes
- Interactive 3D work/project journey on capable desktop devices
- Lightweight scene fallback for mobile, low-power, reduced-motion, or no-WebGL environments
- Offscreen 3D rendering pause to reduce battery and GPU usage
- Mobile navigation menu
- Project, experience, stack, certification, impact, and contact sections
- Searchable CV PDF download
- Hacktiv8 certification PDF view/download
- Open Graph and Twitter social preview image routes
- Canonical URL support through `NEXT_PUBLIC_SITE_URL`

## Project Structure

```txt
app/
  components/
    CodeScene.tsx
    CodeSceneFallback.tsx
    PortfolioPage.tsx
    SocialPreviewImage.tsx
  data/
    portfolio.ts
  globals.css
  layout.tsx
  opengraph-image.tsx
  page.tsx
  twitter-image.tsx
public/
  certificates/
  cv/
```

Content such as projects, experience, stack groups, links, CV paths, and 3D journey nodes lives in:

```txt
app/data/portfolio.ts
```

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```txt
http://127.0.0.1:3000
```

## Quality Checks

Run lint:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

## SEO And Social Preview

The site uses Next metadata in:

```txt
app/layout.tsx
```

Generated social preview routes:

```txt
/opengraph-image
/twitter-image
```

Set the production canonical URL in Vercel:

```txt
NEXT_PUBLIC_SITE_URL=https://www.nf-dev.srvhm.my.id
```

## Deployment Notes

Vercel is connected to the Git repository. If the production branch is `main`, pushing commits to `main` triggers a production deployment.

To avoid deploying local changes:

- Do not push local commits to `origin/main`.
- Keep exploratory work on a separate local branch until ready.
- Use Vercel project settings if you want custom ignored-build behavior for documentation-only commits.

Current production deploy flow:

```bash
npm run lint
npm run build
git push origin main
```

## Contact Links

- LinkedIn: https://www.linkedin.com/in/nicholas-fortune/
- GitHub: https://github.com/jayfortune03
- WhatsApp: https://wa.me/6287741029000
