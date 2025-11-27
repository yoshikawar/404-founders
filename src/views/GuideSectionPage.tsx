'use client'

import { useRouter } from 'next/navigation'

import { PageContainer } from '@/components/common/PageContainer'
import { DataTable } from '@/components/guides/DataTable'
import { useGlobalSearchContext } from '@/hooks/GlobalSearchContext'
import { findDetailByTitle } from '@/constants/details'
import { type GuideSection } from '@/types/guides'

export function GuideSectionPage({ section }: { section: GuideSection }) {
  const { filter } = useGlobalSearchContext()
  const router = useRouter()

  const handleSelect = section.detailCategory
    ? (label: string) => {
        const detail = findDetailByTitle(section.detailCategory!, label)
        if (detail) {
          router.push(`/detail/${section.detailCategory}/${detail.id}`)
        }
      }
    : undefined

  return (
    <PageContainer max="max-w-5xl">
      <header className="mb-4 flex items-center gap-2">
        <span className="text-primary">{section.icon}</span>
        <h1 className="text-2xl font-bold">{section.title}</h1>
      </header>
      <DataTable rows={section.items} filter={filter} onSelect={handleSelect} />
    </PageContainer>
  )
}

export default GuideSectionPage
