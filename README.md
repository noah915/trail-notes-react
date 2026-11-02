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

## Project scripts

- `npm run dev` starts the development server with hot reload.
- `npm run build` creates an optimized production site in `dist/`.
- `npm run preview` serves the production build locally. Run `npm run build` first.
- `npm run lint` checks the source files with ESLint.

Route data is exported from `src/trailData.js` and imported by `src/App.jsx`.

## Application structure

- `src/App.jsx` configures the routes and keeps saved-trail state available across views.
- `src/pages/` contains the home, trail-list, and trail-details views. Trail details look up the record identified by the URL parameter and show a not-found message for invalid IDs.
- `src/components/` contains shared navigation, page sections, route filters, and reusable trail cards.
- `src/trailData.js` contains the route collection and region options.

React Router handles client-side navigation. Search, region buttons, saved-route bookmarks, and the saved-only filter update the trail list.
