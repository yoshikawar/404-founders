import type { Metadata } from 'next'

import { IntroPage } from '@/pages/IntroPage'

export const metadata: Metadata = {
  title: 'Introduction',
}

export default function Page() {
  return <IntroPage />
}
