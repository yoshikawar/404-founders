'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export function IntroPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-16">
      <Card className="w-full max-w-xl text-center shadow-lg">
        <CardHeader className="space-y-4">
          <p className="text-sm uppercase tracking-widest text-muted-foreground">HTTP Status</p>
          <CardTitle className="text-6xl font-black tracking-tight sm:text-7xl">404 Not Found</CardTitle>
          <CardDescription className="text-base">
            おや、ネット上で迷子ですか？折角だし、エラーについて学んでみましょう。
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button asChild size="lg" className="gap-2">
            <Link href="/guides">Guides へ進む</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default IntroPage
