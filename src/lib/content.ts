import { z } from "zod";
import productsJson from "@/content/products.json";
import pricingJson from "@/content/pricing.json";
import teamJson from "@/content/team.json";
import testimonialsJson from "@/content/testimonials.json";

const productSchema = z.object({
  slug: z.string(),
  name: z.string(),
  tagline: z.string(),
  description: z.string(),
  summary: z.string(),
  keyBenefit: z.string(),
  icon: z.string(),
  status: z.string().optional(),
  href: z.string(),
  externalHref: z.string().nullable().optional(),
  features: z.array(z.string()),
  benefits: z.array(z.string()),
  useCases: z.array(z.string()),
  related: z.array(z.string()),
});

const productsFileSchema = z.object({
  products: z.array(productSchema),
});

const pricingPlanSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  monthlyPrice: z.number(),
  annualPrice: z.number(),
  badge: z.string().optional(),
  cta: z.object({
    label: z.string(),
    href: z.string(),
  }),
  features: z.array(z.string()),
  notIncluded: z.array(z.string()).optional(),
});

const comparisonRowSchema = z.object({
  feature: z.string(),
  starter: z.union([z.string(), z.boolean()]),
  pro: z.union([z.string(), z.boolean()]),
  enterprise: z.union([z.string(), z.boolean()]),
});

const faqItemSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

const pricingFileSchema = z.object({
  plans: z.array(pricingPlanSchema),
  comparison: z.array(comparisonRowSchema),
  faq: z.array(faqItemSchema),
});

const teamMemberSchema = z.object({
  name: z.string(),
  role: z.string(),
  bio: z.string(),
  image: z.string().optional(),
  initials: z.string(),
  links: z
    .object({
      twitter: z.string().optional(),
      linkedin: z.string().optional(),
      github: z.string().optional(),
    })
    .optional(),
});

const teamFileSchema = z.object({
  members: z.array(teamMemberSchema),
});

const testimonialSchema = z.object({
  quote: z.string(),
  author: z.string(),
  role: z.string(),
  company: z.string(),
  rating: z.number().optional(),
});

const logoSchema = z.object({
  name: z.string(),
  initials: z.string(),
});

const testimonialsFileSchema = z.object({
  testimonials: z.array(testimonialSchema),
  logos: z.array(logoSchema),
});

export type Product = z.infer<typeof productSchema>;
export type PricingPlan = z.infer<typeof pricingPlanSchema>;
export type ComparisonRow = z.infer<typeof comparisonRowSchema>;
export type FaqItem = z.infer<typeof faqItemSchema>;
export type TeamMember = z.infer<typeof teamMemberSchema>;
export type Testimonial = z.infer<typeof testimonialSchema>;
export type Logo = z.infer<typeof logoSchema>;

let cachedProducts: Product[] | undefined;
let cachedPricing: z.infer<typeof pricingFileSchema> | undefined;
let cachedTeam: TeamMember[] | undefined;
let cachedTestimonials: z.infer<typeof testimonialsFileSchema> | undefined;

export function getAllProducts(): Product[] {
  if (cachedProducts) return cachedProducts;
  const data = productsFileSchema.parse(productsJson);
  cachedProducts = data.products;
  return cachedProducts;
}

export function getProductBySlug(slug: string): Product | undefined {
  return getAllProducts().find((product) => product.slug === slug);
}

export function getPricing() {
  if (cachedPricing) return cachedPricing;
  cachedPricing = pricingFileSchema.parse(pricingJson);
  return cachedPricing;
}

export function getTeam(): TeamMember[] {
  if (cachedTeam) return cachedTeam;
  const data = teamFileSchema.parse(teamJson);
  cachedTeam = data.members;
  return cachedTeam;
}

export function getTestimonials() {
  if (cachedTestimonials) return cachedTestimonials;
  cachedTestimonials = testimonialsFileSchema.parse(testimonialsJson);
  return cachedTestimonials;
}
