# Route tests

Manually tested in the Vite development app at `http://127.0.0.1:5173`:

| Test | Result |
| --- | --- |
| Open `/` directly and view the home page | Pass |
| Open `/items` directly and view the trail list | Pass |
| Open `/items/blue-lake` directly and view Blue Lake Trail details | Pass |
| Use the header and trail-card links to navigate between views | Pass |
| Use browser Back from trail details to return to `/items` | Pass |
| Refresh `/items` and `/items/emerald-lake` | Pass |
| Open `/items/not-a-trail` and receive a visible not-found message | Pass |
