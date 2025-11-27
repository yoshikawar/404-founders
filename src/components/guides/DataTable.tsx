import { type KeyboardEvent } from "react";
import { AlertTriangle, Bug, FileWarning, Network, Shield, Timer, Upload, Zap } from "lucide-react";

import { type GuideRow } from "@/types/guides";

export function DataTable({
  rows,
  filter,
  onSelect,
}: {
  rows: GuideRow[];
  filter: (value: string) => boolean;
  onSelect?: (label: string) => void;
}) {
  const filtered = rows.filter((row) => filter(`${row.k} ${row.cause} ${row.fix}`));
  const gradients = [
    "from-sky-500 via-blue-500 to-indigo-500",
    "from-rose-500 via-pink-500 to-orange-400",
    "from-emerald-500 via-teal-500 to-cyan-400",
    "from-amber-500 via-orange-500 to-rose-500",
  ];

  const resolveIcon = (label: string) => {
    if (/Timeout/i.test(label)) return Timer;
    if (/Upload|Payload/i.test(label)) return Upload;
    if (/DNS|Failed|Network/i.test(label)) return Network;
    if (/SSL|CERT|HTTPS/i.test(label)) return Shield;
    if (/Forbidden|Unauthorized|Not Found|Bad Request|Too Many/i.test(label)) return AlertTriangle;
    if (/JavaScript|Runtime|TypeError/i.test(label)) return Bug;
    if (/Gateway|Server|Storage/i.test(label)) return Zap;
    return FileWarning;
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {filtered.map((row, index) => {
        const clickable = typeof onSelect === "function";
        const handleSelect = () => onSelect?.(row.k);
        const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleSelect();
          }
        };
        const GradientIcon = resolveIcon(row.k);
        const gradient = gradients[index % gradients.length];

        return (
          <div
            key={index}
            className={`rounded-2xl border bg-gradient-to-br from-white to-muted/30 p-4 shadow-sm transition hover:shadow-md ${
              clickable ? "cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary" : ""
            }`}
            onClick={clickable ? handleSelect : undefined}
            onKeyDown={clickable ? handleKeyDown : undefined}
            role={clickable ? "button" : undefined}
            tabIndex={clickable ? 0 : undefined}
            aria-label={clickable ? `${row.k} の詳細を見る` : undefined}
          >
            <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              <span>項目 {String(index + 1).padStart(2, "0")}</span>
              {clickable && <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary">詳細あり</span>}
            </div>
            <div className="mt-3 flex items-start gap-3">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-inner`}>
                <GradientIcon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-xl font-semibold leading-tight text-foreground break-words">{row.k}</h3>
                <p className="mt-1 text-sm text-muted-foreground break-words">{row.cause}</p>
              </div>
            </div>
            <div className="mt-3 rounded-xl border bg-white/70 p-3 text-sm break-words">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-blue-500">対処のヒント</div>
              <p className="mt-1 text-foreground">{row.fix}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
