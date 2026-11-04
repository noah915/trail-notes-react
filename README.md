# Trail Notes

Trail Notes is a responsive day-hike field guide built with React and Vite. Search routes, filter by region, and save hikes to a shortlist.

## Get started

```sh
git clone https://github.com/noah915/trail-notes-react.git
cd trail-notes-react
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Route plan

- `/` → Home
- `/items` → Item list
- `/items/:id` → Item details
- `/login` → Login form
- `/register` → Create an account
- `/dashboard` → Protected account view and authenticated profile request
- `/admin` → Protected admin statistics request

## Project scripts

- `npm run dev` starts the development server with hot reload.
- `npm run build` creates an optimized production site in `dist/`.
- `npm run preview` serves the production build locally. Run `npm run build` first.
- `npm run lint` checks the source files with ESLint.

Route data is exported from `src/trailData.js` and imported by `src/App.jsx`.

## Application structure

- `src/App.jsx` configures the routes and keeps saved-trail state available across views.
- `src/pages/` contains the home, trail-list, trail-details, login, registration, account, and admin views.
- `src/auth/AuthContext.jsx` restores the backend session and exposes login/logout state.
- `src/api.js` sends JSON requests and includes the backend's session cookie.
- `src/components/` contains shared navigation, page sections, route filters, and reusable trail cards.
- `src/trailData.js` contains the route collection and region options.

React Router handles client-side navigation. Search, region buttons, saved-route bookmarks, and the saved-only filter update the trail list.

## Backend authentication

The frontend integrates with the [Application Development I inventory backend](https://github.com/noah915/application-development-1/tree/main/final-project). Its login endpoint is `POST /auth/login`, with JSON `{ "username": "...", "password": "..." }`. A successful login returns **HTTP 200** and sets an HTTP-only session cookie; invalid credentials return **HTTP 401**. `GET /auth/me` returns the current user for an authenticated session. The account dashboard calls this protected endpoint. The admin page calls `GET /admin/statistics`; a signed-in non-admin receives **HTTP 403**, which is shown separately from an expired or missing session (**HTTP 401**).

I verified the backend locally before wiring up the frontend: a registered test user logged in with **200**, a wrong password returned **401**, `GET /auth/me` with the session cookie returned **200**, and the same request without a cookie returned **401**. The account was created in an isolated temporary database and is not included in this repository.

### Run the full stack locally

1. Start the backend from `final-project` in the backend repository. Copy `.env.example` to `.env`, set a private `SESSION_SECRET`, then run `npm install` and `npm run dev` (default backend port `3000`).
2. In this repository, run `npm install` and `npm run dev`. Vite proxies `/api/*` to the backend and removes the `/api` prefix. To use another backend address, set the non-secret `API_PROXY_TARGET` environment variable when starting Vite.
3. Open `/register` to create an account, then use the dashboard and admin link to exercise authenticated and forbidden requests.

The browser sends the session cookie with `credentials: 'include'`; the cookie is HTTP-only and is not copied into JavaScript storage. In development, the Vite proxy keeps API requests same-origin. For a production deployment, route `/api` through a same-origin reverse proxy to the backend, or configure the backend for credentialed CORS with an explicit frontend-origin allowlist and secure cookies. Inspect `POST /api/auth/login`, `GET /api/auth/me`, and `GET /api/admin/statistics` in the browser Network panel.

Never commit passwords, test-user credentials, session/signing secrets, database credentials, private keys, or production `.env` files. Frontend `VITE_*` variables are public once built; they must never contain secrets.
