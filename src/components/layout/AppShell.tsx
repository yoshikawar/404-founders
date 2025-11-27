'use client'

import { type ReactNode, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

import { AppLayout } from '@/components/layout/AppLayout'
import { Sidebar } from '@/components/layout/Sidebar'
import { TopBar } from '@/components/layout/TopBar'
import { SelfTests } from '@/components/misc/SelfTests'
import { useGlobalSearchContext } from '@/hooks/GlobalSearchContext'

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? ''
  const isIntroduction = pathname === '/introduction'
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { term, setTerm, filter } = useGlobalSearchContext()

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(min-width: 1024px)')
    const applyState = (matches: boolean) => {
      setSidebarOpen(matches)
    }
    applyState(mq.matches)
    const handler = (event: MediaQueryListEvent) => {
      applyState(event.matches)
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  if (isIntroduction) {
    return (
      <div className="min-h-screen bg-white">
        <SelfTests />
        <main className="min-h-screen bg-white">{children}</main>
      </div>
    )
  }

  const toggleSidebar = () => setSidebarOpen((value) => !value)

  return (
    <div className="h-screen w-screen grid grid-rows-[56px_1fr] bg-white">
      <SelfTests />
      <TopBar term={term} setTerm={setTerm} onToggleSidebar={toggleSidebar} />
      <div className="relative h-full">
        <AppLayout sidebarOpen={sidebarOpen}>
          <Sidebar open={sidebarOpen} currentPath={pathname} filter={filter} onClose={() => setSidebarOpen(false)} />
          <main className="h-full min-h-0 overflow-y-auto bg-white">{children}</main>
        </AppLayout>
        {sidebarOpen && (
          <button
            className="lg:hidden fixed top-0 right-0 bottom-0 z-30 bg-black/40"
            style={{ left: '16rem' }}
            onClick={() => setSidebarOpen(false)}
            aria-label="ナビゲーションを閉じる"
          />
        )}
      </div>
    </div>
  )
}
