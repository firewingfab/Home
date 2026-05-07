# FirewingFab Website

This is the main website for FirewingFab, built with Next.js (App Router).

It includes:
- A landing page with hero sections, portfolio highlights, and achievements
- Static pages for Projects, Community, and About
- A Join form that sends submissions by email using Resend

## Tech stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Lucide icons

## Local setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` in the project root:
```env
RESEND_APIKEY=your_resend_api_key
SENDER_EMAIL=your_verified_sender@yourdomain.com
RECEIVER_ADDRESS=your_inbox@example.com
```

3. Start development server:
```bash
npm run dev
```

4. Open:
`http://localhost:3000`

## Available scripts

- `npm run dev` - Start dev server on port 3000
- `npm run build` - Create production build
- `npm run start` - Start production server on port 3000

## Join form email flow

When a user submits `/join`:

1. The client posts form data to `POST /api/join`
2. The API validates required fields and honeypot spam field
3. The API sends a structured email through Resend
4. The receiver gets full submission details (contact, profile, and dream/vision)

Main files:
- Join page: `app/join/page.tsx`
- Email API route: `app/api/join/route.ts`

## Project structure

```text
app/
  api/join/route.ts
  about/page.tsx
  community/page.tsx
  join/page.tsx
  projects/page.tsx
  page.tsx
  layout.tsx
  globals.css

src/components/
  Navbar.tsx
  Footer.tsx
```

## Notes

- `SENDER_EMAIL` must be a domain/address verified in Resend.
- The join email template is responsive for mobile email clients.
- Keep secrets only in `.env.local` and never commit real API keys.
