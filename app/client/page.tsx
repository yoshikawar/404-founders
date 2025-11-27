import type { Metadata } from 'next'

import { GUIDE_SECTIONS } from '@/constants/guides'
import { GuideSectionPage } from '@/views/GuideSectionPage'

const section = GUIDE_SECTIONS.find((item) => item.route === '/client')!

export const metadata: Metadata = {
  title: section.title,
}

export default function Page() {
  return <GuideSectionPage section={section} />
}
