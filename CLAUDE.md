# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000 (PWA disabled in dev)
npm run build    # Production build
npm run start    # Serve the production build
npm run lint     # next lint (ESLint, core-web-vitals)
npm run export   # build + next export → static site (images run unoptimized)
```

- Requires Node `24.x` (see `engines` in package.json / `.nvmrc`).
- No test framework is configured — there are no tests to run.
- Both `package-lock.json` and `yarn.lock` exist; npm and yarn both work. Pick one and stay consistent.
- Requires a `.env.local` (copy from `.env.sample`): `CONTENTFUL_ACCESS_TOKEN`, `CONTENTFUL_SPACE_ID`, `CONTENTFUL_ENV`, `NEXT_PUBLIC_BASE_URL`. Without valid Contentful credentials, post/search pages return errors. `NEXT_PUBLIC_GA_MEASUREMENT_ID` is optional — Google Analytics only loads in production when it's set.

## Architecture

A **Next.js 13 Pages Router** app (plain JavaScript, not TypeScript) — a movie blog/magazine whose content comes from **Contentful CMS**, not a movie database API. PWA-enabled via `next-pwa`, deployed on Vercel.

**Analytics:** `src/components/GoogleAnalytics.js` injects the gtag snippet via `next/script` (`strategy="afterInteractive"`) and is mounted in `src/pages/_app.js` outside the Redux `<Provider>`. It's production-gated — returns `null` when `isDev()` is true or `GA_MEASUREMENT_ID` (from `src/utils/constants.js`, sourced from `NEXT_PUBLIC_GA_MEASUREMENT_ID`) is unset — so it's a no-op in dev and when unconfigured.

### Data flow (Contentful → API route → Redux → page)

Pages never hit Contentful directly from the client. The path is:

1. A page's `getInitialProps` dispatches a Redux **thunk** (`src/store/thunks/`).
2. The thunk does an `axios` GET to a **Next.js API route** (`src/pages/api/posts/index.js`, `[slug].js`).
3. The API route calls **`contentfulService`** (`src/utils/contentful/index.js`), which queries the Contentful SDK.
4. Responses are normalized by `transformEntry` / `transformQuery` / `transformTags` (`src/utils/contentful/helpers.js`) — these flatten Contentful's nested `fields`/`sys` shape and extract featured images/tags.
5. State is hydrated into Redux on the server and re-rendered on the client (`next-redux-wrapper` `HYDRATE`).

When adding a Contentful-backed feature, follow this full chain — add the thunk, the API route, and the service/transform — rather than calling Contentful from a component.

### State management

Redux Toolkit store created in `src/store/index.js` and shared via `next-redux-wrapper` (`wrapper` is consumed in `src/pages/_app.js`). Organized by concern:
- `src/store/slices/` — `posts`, `search`, `layout` slices (each handles its own `HYDRATE`).
- `src/store/thunks/` — async actions (`getAllPosts` appends for infinite scroll, `getPostBySlug`, `getSearchResults`).
- `src/store/selectors/` — pure read accessors.
- `src/utils/redux.js` — shared helpers for pending/fulfilled/rejected reducers; reuse these instead of hand-writing case reducers.

### Routes

- `/` — infinite-scroll feed of posts.
- `/post/[slug]` — post detail with tags/metadata.
- `/api/posts` and `/api/posts/[slug]` — server-side wrappers over Contentful (GET only).

### Styling

Global **SCSS** in `src/styles/` (`index.scss` plus `_variables`, `_mixins`, `_grid`, `_fonts`, `_reset` partials). No Tailwind/CSS Modules/styled-components. Layout uses a **custom responsive grid** (`col-lg-12 / col-md-30 / col-sm-60` classes); breakpoints via the `media('large'|'small'|...)` mixin. `postcss.config.js` runs **PurgeCSS** scoped to `src/pages` and `src/components`, so dynamically-constructed class names can be purged — keep class names statically present in JSX.

## Conventions

- **Path alias `~/`** maps to `src/` via `jsconfig.json` `compilerOptions.paths` (`"~/*": ["./src/*"]`). Import as `import Layout from '~/components/Layout'`, not relative paths.
- **Components are grouped by feature** under `src/components/` (`header/`, `menu/`, `search/`, `feed/`, `post/`, `footer/`, `ui/`). `Layout.js` wraps all pages.
- **JavaScript + PropTypes** for prop validation — no TypeScript.
- **ESLint code style is enforced** (`.eslintrc.json`): 2-space indent, `comma-dangle: always-multiline`, `operator-linebreak`/`multiline-ternary` *before* the operator, `curly: multi-line`. `console.warn`/`console.error` are allowed; other `console` calls warn. Run `npm run lint` before finishing.
- Use `src/utils/index.js` helpers (`isDev`, `slugify`, `camelCase`, `parseLineBreaks`, `sleep`, `parseURL`) and `src/utils/constants.js` rather than reimplementing.
