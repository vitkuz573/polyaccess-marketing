"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().min(1, "Company is required"),
  subject: z.enum(["sales", "support", "partnerships", "other"]),
  message: z.string().min(10, "Message must be at least 10 characters"),
  consent: z.boolean().refine((value) => value, {
    message: "You must agree to be contacted",
  }),
  honeypot: z.string().max(0, "Bot detected").optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  onSubmit?: (values: ContactFormValues) => Promise<void>;
}

export function ContactForm({ onSubmit }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      subject: "sales",
      message: "",
      consent: false,
      honeypot: "",
    },
  });

  async function submitHandler(values: ContactFormValues) {
    setServerError(null);
    try {
      if (onSubmit) {
        await onSubmit(values);
      }
      setSubmitted(true);
      reset();
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  if (submitted) {
    return (
      <Alert>
        <CheckCircle2 className="size-4" aria-hidden />
        <AlertTitle>Message sent</AlertTitle>
        <AlertDescription>
          Thanks for reaching out. We will get back to you within one business
          day.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
      {/* Honeypot field hidden from users */}
      <div className="hidden" aria-hidden="true">
        <Input {...register("honeypot")} tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Jane Doe"
            aria-invalid={errors.name ? "true" : "false"}
            {...register("name")}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="jane@company.com"
            aria-invalid={errors.email ? "true" : "false"}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            placeholder="Acme Inc"
            aria-invalid={errors.company ? "true" : "false"}
            {...register("company")}
          />
          {errors.company && (
            <p className="text-sm text-destructive">
              {errors.company.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Controller
            name="subject"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger id="subject" className="w-full">
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="support">Support</SelectItem>
                  <SelectItem value="partnerships">Partnerships</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.subject && (
            <p className="text-sm text-destructive">
              {errors.subject.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder="Tell us what you are looking for..."
          rows={5}
          aria-invalid={errors.message ? "true" : "false"}
          {...register("message")}
        />
        {errors.message && (
          <p className="text-sm text-destructive">{errors.message.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-start gap-2">
          <Controller
            name="consent"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="consent"
                checked={field.value}
                onCheckedChange={field.onChange}
                aria-invalid={errors.consent ? "true" : "false"}
              />
            )}
          />
          <Label htmlFor="consent" className="font-normal leading-tight">
            I agree to be contacted about PolyAccess products and services.
          </Label>
        </div>
        {errors.consent && (
          <p className="text-sm text-destructive">{errors.consent.message}</p>
        )}
      </div>

      {serverError && (
        <Alert variant="destructive">
          <AlertDescription>{serverError}</AlertDescription>
        </Alert>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}
