import Link from 'next/link'
export default function NotFound(){return <main className="not-found"><div><p className="eyebrow">404</p><h1>Page not found</h1><p>The page may have moved or the address may be incomplete.</p><Link className="button" href="/en">Go home</Link></div></main>}
