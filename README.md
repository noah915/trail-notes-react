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

## Project scripts

- `npm run dev` starts the development server with hot reload.
- `npm run build` creates an optimized production site in `dist/`.
- `npm run preview` serves the production build locally. Run `npm run build` first.
- `npm run lint` checks the source files with ESLint.

Route data is exported from `src/trailData.js` and imported by `src/App.jsx`.

## Application structure

- `src/App.jsx` owns the search, region, and saved-route state and derives the visible routes from the trail data.
- `src/components/` contains the page sections, route filters, and reusable trail cards. Props connect the app state to these components.
- `src/trailData.js` contains the route collection and region options.

Search, region buttons, saved-route bookmarks, and the saved-only filter update the displayed route list.
