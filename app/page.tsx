import Link from 'next/link'
import Image from 'next/image'

export default function RootPage() {
  return <main className="not-found"><div><Image src="/images/brand/saanjh-logo.png" alt="SAANJH by Pasalho" width={240} height={180} priority/><h1>Choose your language</h1><div className="actions"><Link className="button" href="/en">English</Link><Link className="button secondary nepali" href="/ne">नेपाली</Link></div></div></main>
}
