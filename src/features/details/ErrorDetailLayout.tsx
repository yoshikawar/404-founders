import Link from 'next/link'
import { Layers3, ListTree, Network, Server, Shield, Terminal, Zap } from 'lucide-react'
import { type ComponentType, type ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PageContainer } from '@/components/common/PageContainer'
import { type ErrorDetail } from '@/types/details'

function StatusBadge({ code, label }: { code: number; label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white">
      <span className="text-base font-black">{code}</span>
      <span className="uppercase tracking-wide">{label}</span>
    </span>
  )
}

export function InlineAlert({ children }: { children: ReactNode }) {
  return <div className="rounded-md border bg-amber-50 p-3 text-sm">{children}</div>
}

function CodeBlock({ children }: { children: ReactNode }) {
  return (
    <pre className="overflow-x-auto rounded-xl border bg-slate-950/90 p-4 text-xs text-white shadow-inner">
      <code>{children}</code>
    </pre>
  )
}

function SectionHeading({ icon: Icon, title }: { icon: ComponentType<{ className?: string }>; title: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="rounded-full bg-muted p-1">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <CardTitle className="text-base">{title}</CardTitle>
    </div>
  )
}

function CauseFixTable({ causes, fixes }: { causes: string[]; fixes: string[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="border">
        <CardHeader>
          <CardTitle className="text-base">代表的な原因</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            {causes.map((cause, index) => (
              <li key={index}>{cause}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card className="border">
        <CardHeader>
          <CardTitle className="text-base">主な対処</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {fixes.map((fix, index) => (
              <li key={index}>{fix}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

export function ErrorDetailLayout({ detail }: { detail: ErrorDetail }) {
  const themes = {
    'client-4xx': {
      gradient: 'from-rose-500 via-orange-400 to-amber-300',
      accent: 'text-rose-600',
      icon: Shield,
    },
    server: {
      gradient: 'from-slate-900 via-slate-800 to-slate-600',
      accent: 'text-blue-400',
      icon: Server,
    },
    client: {
      gradient: 'from-indigo-500 via-purple-500 to-blue-400',
      accent: 'text-indigo-500',
      icon: Network,
    },
  } as const
  const theme = themes[detail.category] ?? themes['client-4xx']
  const LeadingIcon = theme.icon

  return (
    <PageContainer max="max-w-4xl">
      <div className="mb-4 flex items-center gap-2">
        <Button variant="ghost" size="sm" className="px-2" asChild>
          <Link href="/guides">← Guides</Link>
        </Button>
        <div className="text-xs uppercase tracking-wide text-muted-foreground">{detail.category}</div>
      </div>

      <div className={`rounded-3xl border bg-gradient-to-br ${theme.gradient} p-6 text-white shadow-lg`}>
        <div className="flex flex-wrap items-start gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
            <LeadingIcon className="h-8 w-8" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-black">{detail.title}</h1>
              {detail.status && <StatusBadge code={detail.status.code} label={detail.status.label} />}
            </div>
            <p className="mt-2 text-white/80">{detail.summary}</p>
          </div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-white/10 p-3">
            <div className="text-xs uppercase tracking-widest text-white/70">Category</div>
            <div className="text-sm font-semibold">{detail.category}</div>
          </div>
          {detail.status && (
            <div className="rounded-2xl bg-white/10 p-3">
              <div className="text-xs uppercase tracking-widest text-white/70">Status</div>
              <div className="text-sm font-semibold">{detail.status.code} – {detail.status.label}</div>
            </div>
          )}
          <div className="rounded-2xl bg-white/10 p-3">
            <div className="text-xs uppercase tracking-widest text-white/70">Slug</div>
            <div className="text-sm font-semibold">{detail.id}</div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <CauseFixTable causes={detail.causes} fixes={detail.fixes} />
      </div>

      {detail.headers && detail.headers.length > 0 && (
        <div className="mt-4">
          <Card className="border">
            <CardHeader>
              <SectionHeading icon={Layers3} title="よく関係するHTTPヘッダー" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {detail.headers.map((header, index) => (
                  <div key={index} className="rounded-xl border bg-muted/30 p-3">
                    <div className="text-sm font-semibold">{header.name}</div>
                    <div className="text-xs text-muted-foreground">{header.value || '-'}</div>
                    <p className="mt-1 text-sm">{header.why}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {detail.repro?.curl && (
        <div className="mt-4">
          <Card className="border">
            <CardHeader>
              <SectionHeading icon={Terminal} title="再現/検証 (curl)" />
            </CardHeader>
            <CardContent>
              <CodeBlock>{detail.repro.curl}</CodeBlock>
            </CardContent>
          </Card>
        </div>
      )}

      {detail.repro?.steps && (
        <div className="mt-4">
          <Card className="border">
            <CardHeader>
              <SectionHeading icon={ListTree} title="ブラウザ/ツール手順" />
            </CardHeader>
            <CardContent>
              <ol className="relative space-y-4 border-l border-muted pl-6 text-sm">
                {detail.repro.steps.map((step, index) => (
                  <li key={index} className="relative">
                    <span className="absolute -left-6 top-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-primary"></span>
                    <div className="rounded-xl bg-muted/40 p-3">
                      <div className="text-xs uppercase tracking-wide text-muted-foreground">Step {index + 1}</div>
                      <p className="mt-1">{step}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>
      )}

      {detail.client && detail.client.length > 0 && (
        <div className="mt-4">
          <Card className="border">
            <CardHeader>
              <SectionHeading icon={Network} title="フロント実装例" />
            </CardHeader>
            <CardContent className="space-y-3">
              {detail.client.map((snippet, index) => (
                <div key={index}>
                  <div className="text-sm font-medium mb-1">{snippet.label}</div>
                  <CodeBlock>{snippet.code}</CodeBlock>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {detail.server && detail.server.length > 0 && (
        <div className="mt-4">
          <Card className="border">
            <CardHeader>
              <SectionHeading icon={Zap} title="サーバ/プロキシ設定例" />
            </CardHeader>
            <CardContent className="space-y-3">
              {detail.server.map((snippet, index) => (
                <div key={index}>
                  <div className="text-sm font-medium mb-1">{snippet.label}</div>
                  <CodeBlock>{snippet.code}</CodeBlock>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {detail.notes && detail.notes.length > 0 && (
        <div className="mt-4">
          <InlineAlert>
            <ul className="list-disc pl-5 space-y-1">
              {detail.notes.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          </InlineAlert>
        </div>
      )}

      {detail.related && detail.related.length > 0 && (
        <div className="mt-6">
          <div className="text-sm font-medium mb-2">関連</div>
          <div className="flex flex-wrap gap-2">
            {detail.related.map((related, index) => (
              <Button key={index} variant="outline" size="sm" asChild>
                <Link href={related.href}>{related.title}</Link>
              </Button>
            ))}
          </div>
        </div>
      )}
    </PageContainer>
  )
}
