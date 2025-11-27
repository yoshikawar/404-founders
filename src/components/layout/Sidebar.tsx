'use client'

import Link from 'next/link'
import { type ComponentProps, type ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { GUIDE_SECTIONS } from '@/constants/guides'
import { PAGES } from '@/constants/navigation'

function NavButton({
  active,
  href,
  icon,
  label,
  onNavigate,
}: {
  active?: boolean
  href: ComponentProps<typeof Link>['href']
  icon: ReactNode
  label: string
  onNavigate?: () => void
}) {
  return (
    <Button
      variant={active ? 'default' : 'ghost'}
      className="w-full justify-start gap-2"
      asChild
      onClick={onNavigate}
      type="button"
    >
      <Link href={href}>
        {icon}
        {label}
      </Link>
    </Button>
  )
}

export function Sidebar({
  open,
  currentPath,
  filter,
  onClose,
}: {
  open: boolean
  currentPath: string
  filter: (value: string) => boolean
  onClose?: () => void
}) {
  return (
    <aside
      className={`border-r bg-white transition-transform ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:sticky top-14 lg:top-[3.5rem] left-0 h-[calc(100vh-3.5rem)] w-64 lg:w-auto z-40 shadow-lg lg:shadow-none`}
      aria-label="サイドバー"
    >
      <ScrollArea className="h-full">
        <nav className="p-3 space-y-2">
          {PAGES.filter((page) => filter(`${page.label} ${page.to}`)).map((page) => (
            <NavButton
              key={page.id}
              active={currentPath === page.to}
              href={page.to}
              icon={page.icon}
              label={page.label}
              onNavigate={onClose}
            />
          ))}
          <div className="pt-4 text-xs uppercase text-muted-foreground">Categories</div>
          {GUIDE_SECTIONS.filter((section) =>
            filter(
              [
                section.id,
                section.title,
                ...section.items.flatMap((item) => [item.k, item.cause, item.fix]),
              ].join(' ')
            )
          ).map((section) => (
            <NavButton
              key={section.id}
              active={currentPath === section.route}
              href={section.route}
              icon={section.icon}
              label={section.title}
              onNavigate={onClose}
            />
          ))}
        </nav>
      </ScrollArea>
      <button
        className="lg:hidden absolute top-2 right-2 rounded-full bg-muted/70 px-2 py-1 text-xs text-muted-foreground"
        onClick={() => onClose?.()}
        type="button"
        aria-label="サイドバーを閉じる"
      >
        閉じる
      </button>
    </aside>
  )
}
