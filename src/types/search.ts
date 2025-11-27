export type SearchResult = {
  id: string
  kind: 'section' | 'item'
  title: string
  description?: string
  href: string
  badge?: string
}
