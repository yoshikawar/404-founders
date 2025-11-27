'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'

import { runSearch } from '@/lib/searchEntries'

const SEARCH_INPUT_SELECTOR = "[data-search-input='true']"

export function useGlobalSearch() {
  const [term, setTerm] = useState('')

  const filter = useCallback((value: string) => value.toLowerCase().includes(term.toLowerCase()), [term])
  const results = useMemo(() => runSearch(term), [term])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      const isTypingInInput = target && ['INPUT', 'TEXTAREA'].includes(target.tagName)

      if (event.key === '/' && !event.metaKey && !event.ctrlKey) {
        if (isTypingInInput) return
        event.preventDefault()
        const el = document.querySelector<HTMLInputElement>(SEARCH_INPUT_SELECTOR)
        if (el) el.focus()
      }

      if (event.key === 'Escape') {
        setTerm('')
        const el = document.querySelector<HTMLInputElement>(SEARCH_INPUT_SELECTOR)
        if (el && document.activeElement === el) {
          el.blur()
        }
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setTerm])

  return { term, setTerm, filter, results, clear: () => setTerm('') }
}
