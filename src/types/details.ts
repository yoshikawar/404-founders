export type ErrorCategory =
  | "client-4xx"
  | "server"
  | "client";

export const ERROR_CATEGORIES: readonly ErrorCategory[] = [
  "client-4xx",
  "server",
  "client",
] as const;

export function isErrorCategory(value: string): value is ErrorCategory {
  return (ERROR_CATEGORIES as readonly string[]).includes(value);
}

export type ErrorDetail = {
  category: ErrorCategory;
  id: string;
  title: string;
  status?: { code: number; label: string };
  summary: string;
  causes: string[];
  fixes: string[];
  repro?: { curl?: string; steps?: string[] };
  headers?: { name: string; value?: string; why: string }[];
  client?: { label: string; code: string }[];
  server?: { label: string; code: string }[];
  notes?: string[];
  related?: { title: string; href: string }[];
};
