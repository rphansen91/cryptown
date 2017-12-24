import React from 'react'
import Helmet from 'react-helmet'

const seoURL = (path) => (process.env.PUBLIC_URL || '') + path
const seoImageURL = (images, provider) => {
  if (images && typeof images === 'string') return images
  if (images && images[provider] && typeof images[provider] === 'string') return images[provider]
  return (process.env.PUBLIC_URL || '') + '/icon_540.png'
}

const getMetaTags = ({
  title, description, images, contentType, url, published, updated, category, tags, twitter
}) => {
  const metaTags = [
    { itemprop: 'name', content: title },
    { itemprop: 'description', content: description },
    { itemprop: 'image', content: seoImageURL(images, 'google') },
    { name: 'description', content: description },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@hodl_stream' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:creator', content: twitter },
    { name: 'twitter:image:src', content: seoImageURL(images, 'twitter') },
    { name: 'og:title', content: title },
    { name: 'og:type', content: contentType },
    { name: 'og:url', content: url },
    { name: 'og:image', content: seoImageURL(images, 'facebook') },
    { name: 'og:description', content: description },
    { name: 'og:site_name', content: 'Hodl Stream' }
  ]

  if (process.env.FB_APP_ID) metaTags.push({ name: 'fb:app_id', content: process.env.FB_APP_ID })
  if (published) metaTags.push({ name: 'article:published_time', content: published })
  if (updated) metaTags.push({ name: 'article:modified_time', content: updated })
  if (category) metaTags.push({ name: 'article:section', content: category })
  if (tags) metaTags.push({ name: 'article:tag', content: tags })

  return metaTags
}

export default ({
  schema,
  title='Hodl Stream',
  description='Track your crypto portfolio and visualize how it changes over time.',
  path='/',
  twitter='@hodl_stream',
  images={
    google: '', // 1080x608
    twitter: '', // 1200x660
    facebook: '' // 1200x1200
  },
  contentType,
  published,
  updated,
  category,
  tags
}) => (
  <Helmet
    htmlAttributes={{
      lang: 'en',
      itemscope: undefined,
      itemtype: `http://schema.org/${schema}`,
    }}
    title={ title }
    link={[{ rel: 'canonical', href: seoURL(path) }]}
    meta={getMetaTags({
      title,
      description,
      images,
      contentType,
      url: seoURL(path),
      published,
      updated,
      category,
      tags,
      twitter,
    })}
  />
)
