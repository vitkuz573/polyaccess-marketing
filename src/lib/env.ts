import { z } from "zod";

/**
 * Centralized, runtime-validated environment schema.
 *
 * Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser; everything
 * else stays server-only. We intentionally keep this list minimal so that the
 * marketing site can boot without any environment configuration set.
 */
const envSchema = z.object({
  NEXT_PUBLIC_APP_URL: z
    .string()
    .url()
    .optional()
    .describe("Public absolute URL of the deployed site, e.g. https://polyaccess.tech"),
  NEXT_PUBLIC_SITE_NAME: z
    .string()
    .min(1)
    .optional()
    .describe("Human-readable site name used in metadata and JSON-LD"),
  NODE_ENV: z.enum(["development", "test", "production"]).optional(),
});

export type Env = z.infer<typeof envSchema>;

/**
 * Lazily-parsed, cached environment accessor. Validation runs at most once
 * per process; subsequent calls return the cached object.
 */
let cached: Env | undefined;

export function env(): Env {
  if (cached) return cached;
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((issue) => `  - ${issue.path.join(".") || "(root)"}: ${issue.message}`)
      .join("\n");
    throw new Error(`Invalid environment variables:\n${issues}`);
  }
  cached = parsed.data;
  return cached;
}

/** Convenience helper: resolve the site origin, falling back to localhost in dev. */
export function appUrl(): string {
  return env().NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
}

/** Convenience helper: resolve the public site name with a sensible default. */
export function siteName(): string {
  return env().NEXT_PUBLIC_SITE_NAME ?? "PolyAccess";
}
