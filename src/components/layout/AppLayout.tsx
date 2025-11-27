import { type ReactNode } from "react";

export function AppLayout({ sidebarOpen, children }: { sidebarOpen: boolean; children: ReactNode }) {
  return (
    <div className="relative h-full min-h-0 overflow-hidden">
      <div className="grid h-full grid-cols-1 lg:grid-cols-[280px_1fr]">
        {children}
      </div>
      {sidebarOpen && <div className="pointer-events-none absolute inset-0 lg:hidden" aria-hidden="true" />}
    </div>
  );
}
