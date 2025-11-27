import type { Metadata } from 'next'
import { type ReactNode } from 'react'

import { AppShell } from '@/components/layout/AppShell'
import { GlobalSearchProvider } from '@/hooks/GlobalSearchContext'

import './globals.css'

export const metadata: Metadata = {
  title: {
    default: '404 Not Founders',
    template: '404 Not Founders – %s',
  },
  description: 'HTTPやネットワークのエラーを体系的に学べるリファレンス集です。',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <GlobalSearchProvider>
          <AppShell>{children}</AppShell>
        </GlobalSearchProvider>
      </body>
    </html>
  )
}
