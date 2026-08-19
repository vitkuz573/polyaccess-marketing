"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  badge?: string;
  cta: {
    label: string;
    href: string;
  };
  features: string[];
  notIncluded?: string[];
}

export type ComparisonValue = string | boolean | ReactNode;

export interface ComparisonRow {
  feature: string;
  starter: ComparisonValue;
  pro: ComparisonValue;
  enterprise: ComparisonValue;
}

interface PricingTableProps {
  plans: PricingPlan[];
  comparison: ComparisonRow[];
}

export function PricingTable({ plans, comparison }: PricingTableProps) {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="flex flex-col gap-12">
      <div className="flex items-center justify-center gap-3">
        <span className="text-sm font-medium text-muted-foreground">Monthly</span>
        <Switch checked={annual} onCheckedChange={setAnnual} aria-label="Toggle annual billing" />
        <span className="text-sm font-medium text-muted-foreground">Annual</span>
        <Badge variant="secondary" className="ml-1 hidden sm:inline-flex">
          Save 20%
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <PricingCard key={plan.id} plan={plan} annual={annual} />
        ))}
      </div>

      {comparison.length > 0 && (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature</TableHead>
                <TableHead>Starter</TableHead>
                <TableHead>Pro</TableHead>
                <TableHead>Enterprise</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparison.map((row) => (
                <TableRow key={row.feature}>
                  <TableCell className="font-medium">{row.feature}</TableCell>
                  <TableCell>{renderValue(row.starter)}</TableCell>
                  <TableCell>{renderValue(row.pro)}</TableCell>
                  <TableCell>{renderValue(row.enterprise)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

function PricingCard({ plan, annual }: { plan: PricingPlan; annual: boolean }) {
  const price = annual ? plan.annualPrice : plan.monthlyPrice;
  const isCustom = plan.id === "enterprise";

  return (
    <Card
      className={cn(
        "flex h-full flex-col",
        plan.badge && "relative ring-2 ring-primary",
      )}
    >
      {plan.badge && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
          {plan.badge}
        </Badge>
      )}
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-3xl font-semibold">
            {isCustom ? "Custom" : `$${price}`}
          </span>
          {!isCustom && (
            <span className="text-sm text-muted-foreground">/mo</span>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-2 text-sm">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              <span>{feature}</span>
            </li>
          ))}
          {plan.notIncluded?.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2 text-muted-foreground"
            >
              <X className="mt-0.5 size-4 shrink-0" aria-hidden />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Link
          href={plan.cta.href}
          className={buttonVariants({ className: "w-full" })}
        >
          {plan.cta.label}
        </Link>
      </CardFooter>
    </Card>
  );
}

function renderValue(value: ComparisonValue) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="size-4 text-primary" aria-label="Included" />
    ) : (
      <X className="size-4 text-muted-foreground" aria-label="Not included" />
    );
  }
  return <span className="text-sm">{value}</span>;
}
