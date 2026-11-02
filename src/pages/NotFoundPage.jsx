import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="route-message" aria-labelledby="page-not-found-title">
      <p className="section-kicker">PAGE NOT FOUND</p>
      <h1 id="page-not-found-title">This page isn’t on the map.</h1>
      <p>Choose a trail or head back to the home page.</p>
      <Link className="text-link" to="/">Back to Trail Notes</Link>
    </section>
  )
}

export default NotFoundPage
