import { PageContainer } from '@/components/common/PageContainer'
import { InlineAlert, ErrorDetailLayout } from '@/features/details/ErrorDetailLayout'
import { type ErrorDetail } from '@/types/details'

export function DetailPage({ detail }: { detail: ErrorDetail | null }) {
  if (!detail) {
    return (
      <PageContainer>
        <InlineAlert>指定された詳細情報が見つかりませんでした。</InlineAlert>
      </PageContainer>
    )
  }

  return <ErrorDetailLayout detail={detail} />
}

export default DetailPage
