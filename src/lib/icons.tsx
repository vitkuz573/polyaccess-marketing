import type { Product } from "@/lib/content";
import { ShieldCheck, KeyRound, Users, Activity, Fingerprint } from "lucide-react";
import type { ReactNode } from "react";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>> = {
  "shield-check": ShieldCheck,
  "key-round": KeyRound,
  users: Users,
  activity: Activity,
  fingerprint: Fingerprint,
};

export function getProductIcon(
  iconName: Product["icon"],
  className = "size-5",
): ReactNode {
  const Icon = ICON_MAP[iconName];
  if (!Icon) return null;
  return <Icon className={className} aria-hidden />;
}
