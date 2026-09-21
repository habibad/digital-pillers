# Digital Pillars — Next.js cinematic homepage

A fresh Next.js App Router build based on the approved dark/cinematic Digital Pillars concept. The homepage is fully structured as reusable React components and uses the client-supplied media from the original ZIP.

## Stack

- Next.js App Router + TypeScript
- Three.js hero scene (custom procedural "growth pillars" — no pasted AI hero image)
- GSAP + ScrollTrigger for in-view choreography
- Lenis for smooth wheel scrolling
- CSS glass UI, pointer tilt, magnetic CTAs
- Lazy-loaded client MP4 media below the fold
- `prefers-reduced-motion` fallback

## Routes

- `/` — full homepage
- `/services` — service index
- `/services/performance-marketing`
- `/services/social-brand-presence`
- `/services/web-digital-experiences`
- `/services/growth-strategy-advisory`
- `/work`
- `/reviews`
- `/about`
- `/contact`

The supporting routes intentionally use a clean page shell so they are ready to be expanded without blocking the finished homepage.

## Run

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Client media used

Assets from the supplied archive are copied to `public/media/`, including `assembly-video.mp4`, `desk-video.mp4`, `hero-video.mp4`, the pillar/foundation/construction/signal imagery and the service images. The homepage deliberately lazy-loads heavy video so those files do not compete with the initial hero render.

## Performance notes

- The hero is a lightweight procedural Three.js scene and does **not** require a large GLB download.
- Heavy MP4 files use `preload="none"` and are attached only near the viewport.
- Mobile removes cursor-only interactions and simplifies the composition.
- Three.js particle count and device pixel ratio are reduced on touch/small screens.
- All DOM choreography uses `transform` / `opacity`.
- `prefers-reduced-motion` stops continuous scene movement and reveals content statically.

For a production 90+ Lighthouse target, transcode the supplied MP4 files to smaller H.264/WebM variants and replace any illustrative dashboard numbers/testimonials with verified client data before launch.
