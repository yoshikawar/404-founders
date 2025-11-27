'use client'

import Link from 'next/link'
import { Github, Search, ShieldAlert } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Kbd } from '@/components/common/Kbd'
import { useGlobalSearchContext } from '@/hooks/GlobalSearchContext'

function SearchResultsDropdown() {
  const { term, results, clear } = useGlobalSearchContext()
  const trimmed = term.trim()
  if (!trimmed) {
    return null
  }
  return (
    <div className="absolute left-0 right-0 top-full z-50 mt-2">
      <div className="rounded-md border bg-white shadow-xl">
        {results.length === 0 ? (
          <div className="px-3 py-2 text-sm text-muted-foreground">「{trimmed}」に一致する項目がありません</div>
        ) : (
          <div className="max-h-72 overflow-y-auto">
            {results.map((result) => (
              <Link
                key={result.id}
                href={result.href}
                className="flex items-start gap-2 px-3 py-2 text-left hover:bg-muted"
                onClick={() => clear()}
              >
                <div className="flex-1">
                  <div className="text-sm font-semibold">{result.title}</div>
                  {result.description && <div className="text-xs text-muted-foreground">{result.description}</div>}
                </div>
                {result.badge && (
                  <span className="rounded-full border px-2 py-0.5 text-[10px] uppercase text-muted-foreground">
                    {result.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        )}
        <div className="border-t px-3 py-1 text-[10px] uppercase text-muted-foreground">Escで閉じる</div>
      </div>
    </div>
  )
}

export function TopBar({
  term,
  setTerm,
  onToggleSidebar,
}: {
  term: string
  setTerm: (value: string) => void
  onToggleSidebar: () => void
}) {
  return (
    <div className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur supports-backdrop-blur:bg-white/75">
      <div className="mx-auto h-14 max-w-screen-2xl px-4 flex items-center gap-3">
        <Button variant="ghost" size="sm" className="px-2" onClick={onToggleSidebar} aria-label="Toggle sidebar">
          ☰
        </Button>
        <Button variant="ghost" className="px-2 font-semibold" asChild>
          <Link href="/introduction">
            <ShieldAlert className="w-4 h-4" /> 404 Not Founders
          </Link>
        </Button>
        <form className="ml-4 flex-1 flex items-center gap-2" onSubmit={(event) => event.preventDefault()} role="search" aria-label="サイト内検索">
          <div className="relative w-full">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              placeholder="検索（例：404）"
              className="pl-8"
              data-search-input="true"
            />
            <SearchResultsDropdown />
          </div>
          <Kbd>/</Kbd>
        </form>
        <Button variant="outline" size="icon" className="md:hidden" asChild>
          <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github className="w-4 h-4" />
          </a>
        </Button>
        <Button variant="outline" className="hidden gap-2 md:inline-flex" asChild>
          <a href="https://github.com/" target="_blank" rel="noreferrer">
            <Github className="w-4 h-4" /> GitHub
          </a>
        </Button>
      </div>
    </div>
  )
}
