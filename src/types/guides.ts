import type { Route } from "next";
import { type ReactNode } from "react";

import { type ErrorCategory } from "@/types/details";

export type GuideRow = {
  k: string;
  cause: string;
  fix: string;
};

export type GuideSection = {
  id: string;
  route: Route;
  icon: ReactNode;
  title: string;
  items: GuideRow[];
  detailCategory?: ErrorCategory;
};
