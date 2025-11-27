import type { Metadata } from 'next'

import { IntroPage } from '@/views/IntroPage'

export const metadata: Metadata = {
  title: 'Introduction',
}

export default function Page() {
  return <IntroPage />
}
