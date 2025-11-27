import type { Metadata } from 'next'

import { GuidesPage } from '@/pages/GuidesPage'

export const metadata: Metadata = {
  title: 'Guides',
}

export default function Page() {
  return <GuidesPage />
}
