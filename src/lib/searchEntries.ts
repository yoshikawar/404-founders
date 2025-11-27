import type { Route } from 'next'

import { GUIDE_SECTIONS } from '@/constants/guides'
import { findDetailByTitle } from '@/constants/details'
import { type SearchResult } from '@/types/search'

const normalize = (value: string) => value.toLowerCase().trim()

interface SearchEntry {
  result: SearchResult
  keywords: string[]
}

const searchEntries: SearchEntry[] = GUIDE_SECTIONS.flatMap((section) => {
  const entries: SearchEntry[] = []
  const baseKeywords = [section.id, section.title]

  entries.push({
    result: {
      id: `section-${section.id}`,
      kind: 'section',
      title: section.title,
      description: `${section.items.length} 件のトピック`,
      href: section.route,
      badge: 'カテゴリ',
    },
    keywords: [...baseKeywords, ...section.items.map((item) => item.k)],
  })

  section.items.forEach((item, index) => {
    const detailHref: Route = (() => {
      if (!section.detailCategory) {
        return section.route
      }
      const detail = findDetailByTitle(section.detailCategory, item.k)
      if (detail) {
        return `/detail/${section.detailCategory}/${detail.id}` as Route
      }
      return section.route
    })()

    entries.push({
      result: {
        id: `item-${section.id}-${index}`,
        kind: 'item',
        title: item.k,
        description: item.cause,
        href: detailHref,
        badge: section.title,
      },
      keywords: [...baseKeywords, item.k, item.cause, item.fix],
    })
  })

  return entries
})

const preparedEntries = searchEntries.map(({ result, keywords }) => ({
  result,
  keywords: keywords
    .filter(Boolean)
    .map((keyword) => normalize(keyword))
    .filter((keyword) => keyword.length > 0),
}))

export function runSearch(term: string): SearchResult[] {
  const normalizedTerm = normalize(term)
  if (!normalizedTerm) {
    return []
  }
  const matches = preparedEntries.filter((entry) =>
    entry.keywords.some((keyword) => keyword.includes(normalizedTerm))
  )

  return matches.map((entry) => entry.result).slice(0, 12)
}
