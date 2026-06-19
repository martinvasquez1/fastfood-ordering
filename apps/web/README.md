## Web

First, run the development server from root:

```bash
npm run dev
```

Backend must have the .env ready.

```bash
my-app/
├── app/
├── components/
├── context/
├── lib/
├── public/
```

- app/ — Next.js pages and routes. Each folder/file inside becomes a URL.
- components/ — Reusable UI pieces (buttons, cards, navbar, etc.) shared across pages.
- context/ — React Context providers for global state (auth, cart, theme, etc.).
- lib/ — Utility functions and helpers, like your menu.ts API calls.
- public/ — Static files served as-is (images, fonts, icons). Accessible at /filename.