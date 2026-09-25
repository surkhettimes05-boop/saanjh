import { JsonLd } from './JsonLd'
export type Faq={q:string;a:string}
export function FaqList({items}: {items:Faq[]}){const data={'@context':'https://schema.org','@type':'FAQPage',mainEntity:items.map(i=>({'@type':'Question',name:i.q,acceptedAnswer:{'@type':'Answer',text:i.a}}))};return <><JsonLd data={data}/><div className="faq-list">{items.map((item)=><details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}</div></>}
