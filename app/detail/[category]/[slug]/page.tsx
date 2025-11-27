import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { DetailPage } from '@/pages/DetailPage'
import { findDetailBySlug } from '@/constants/details'
import { isErrorCategory } from '@/types/details'

interface DetailParams {
  category: string
  slug: string
}

function resolveDetail({ category, slug }: DetailParams) {
  if (!isErrorCategory(category)) {
    return null
  }
  return findDetailBySlug(category, slug) ?? null
}

export function generateMetadata({ params }: { params: DetailParams }): Metadata {
  const detail = resolveDetail(params)
  if (!detail) {
    return { title: 'Detail' }
  }
  return { title: detail.title }
}

export default function Page({ params }: { params: DetailParams }) {
  const detail = resolveDetail(params)
  if (!detail) {
    notFound()
  }
  return <DetailPage detail={detail} />
}
