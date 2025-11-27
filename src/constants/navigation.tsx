import { Home as HomeIcon, ListChecks } from "lucide-react";

export const PAGES = [
  { id: "intro", to: "/introduction", icon: <HomeIcon className="w-4 h-4" />, label: "Introduction" },
  { id: "guides", to: "/guides", icon: <ListChecks className="w-4 h-4" />, label: "Guides" },
] as const;
