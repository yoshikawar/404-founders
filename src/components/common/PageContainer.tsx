import { type ReactNode } from "react";

export function PageContainer({ children, max = "max-w-5xl" }: { children: ReactNode; max?: string }) {
  return <div className={`mx-auto ${max} p-6`}>{children}</div>;
}
