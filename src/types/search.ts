import type { Route } from 'next'

export type SearchResult = {
  id: string
  kind: 'section' | 'item'
  title: string
  description?: string
  href: Route
  badge?: string
}
