import type { Metadata } from 'next'

import { GUIDE_SECTIONS } from '@/constants/guides'
import { GuideSectionPage } from '@/pages/GuideSectionPage'

const section = GUIDE_SECTIONS.find((item) => item.route === '/4xx')!

export const metadata: Metadata = {
  title: section.title,
}

export default function Page() {
  return <GuideSectionPage section={section} />
}
