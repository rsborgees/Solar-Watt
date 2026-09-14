import { useEffect } from 'react'

// Sets the document title and meta description for the current route.
// This is a client-side SPA on GitHub Pages (no server-side rendering), so
// these updates apply after the page mounts — fine for Googlebot, which
// executes JS, but not for crawlers that only read the initial HTML.
export function useDocumentMeta({ title, description }) {
  useEffect(() => {
    const previousTitle = document.title
    if (title) document.title = title

    let tag = document.querySelector('meta[name="description"]')
    let previousDescription
    if (description) {
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', 'description')
        document.head.appendChild(tag)
      }
      previousDescription = tag.getAttribute('content')
      tag.setAttribute('content', description)
    }

    return () => {
      document.title = previousTitle
      if (tag && previousDescription !== undefined) {
        tag.setAttribute('content', previousDescription)
      }
    }
  }, [title, description])
}
