import type { Metadata } from 'next'
import { siteConfig } from './site-config'

export function pageMetadata(locale:string,path:string,title:string,description:string,image='/images/products/moong-dal.png'):Metadata{
  const canonical=`/${locale}${path}`
  const other=locale==='en'?'ne':'en'
  return{title,description,alternates:{canonical,languages:{[locale]:canonical,[other]:`/${other}${path}`}},openGraph:{title:`${title} | SAANJH by Pasalho`,description,url:`${siteConfig.baseUrl}${canonical}`,siteName:'SAANJH by Pasalho',type:'website',locale:locale==='en'?'en_NP':'ne_NP',images:[image]},twitter:{card:'summary_large_image',title:`${title} | SAANJH by Pasalho`,description,images:[image]},robots:{index:true,follow:true}}
}
