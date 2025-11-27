'use client'

import { createContext, type ReactNode, useContext } from 'react'

import { useGlobalSearch } from './useGlobalSearch'

const GlobalSearchContext = createContext<ReturnType<typeof useGlobalSearch> | null>(null)

export function GlobalSearchProvider({ children }: { children: ReactNode }) {
  const value = useGlobalSearch()
  return <GlobalSearchContext.Provider value={value}>{children}</GlobalSearchContext.Provider>
}

export function useGlobalSearchContext() {
  const context = useContext(GlobalSearchContext)
  if (!context) {
    throw new Error('useGlobalSearchContext must be used within GlobalSearchProvider')
  }
  return context
}
