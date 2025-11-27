'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { PageContainer } from '@/components/common/PageContainer'
import { Button } from '@/components/ui/button'
import { useGlobalSearchContext } from '@/hooks/GlobalSearchContext'
import { GUIDE_SECTIONS } from '@/constants/guides'

export function GuidesPage() {
  const { filter } = useGlobalSearchContext()
  const sections = GUIDE_SECTIONS.filter((section) =>
    filter(
      [
        section.id,
        section.title,
        ...section.items.flatMap((item) => [item.k, item.cause, item.fix]),
      ].join(' ')
    )
  )

  return (
    <PageContainer max="max-w-4xl">
      <div className="mb-6 space-y-2 text-center">
        <h1 className="text-3xl font-bold">どのカテゴリを学びますか？</h1>
        <p className="text-muted-foreground">トピックを選んで詳しいガイドと代表的なトラブルシュートへ進めます。</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {sections.map((section) => (
          <Card key={section.id} className="flex flex-col items-center gap-4 p-6 text-center">
            <div className="text-primary">{section.icon}</div>
            <div>
              <div className="text-lg font-semibold">{section.title}</div>
              <div className="mt-1 text-sm text-muted-foreground">代表トピック {section.items.length} 件</div>
            </div>
            <CardContent className="p-0 w-full">
              <Button asChild className="w-full">
                <Link href={section.route}>
                  詳しく見る
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageContainer>
  )
}
