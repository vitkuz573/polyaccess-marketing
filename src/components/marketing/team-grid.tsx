import Link from "next/link";
import { Code2, Globe, Briefcase } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Container } from "@/components/layout/container";

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image?: string;
  initials: string;
  links?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

interface TeamGridProps {
  title: string;
  description?: string;
  members: TeamMember[];
}

export function TeamGrid({ title, description, members }: TeamGridProps) {
  return (
    <section aria-labelledby="team-heading" className="py-20 md:py-24">
      <Container>
        <div className="mb-12 max-w-2xl">
          <h2
            id="team-heading"
            className="text-3xl font-semibold tracking-tight md:text-4xl"
          >
            {title}
          </h2>
          {description ? (
            <p className="mt-3 text-pretty text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <Avatar size="lg" className="mb-2">
          {member.image && (
            <AvatarImage src={member.image} alt={member.name} />
          )}
          <AvatarFallback>{member.initials}</AvatarFallback>
        </Avatar>
        <h3 className="text-base font-medium">{member.name}</h3>
        <p className="text-sm text-muted-foreground">{member.role}</p>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{member.bio}</p>
        {member.links && (
          <div className="mt-4 flex items-center gap-2">
                {member.links.twitter && (
                  <SocialLink href={member.links.twitter} label="Twitter" icon={Globe} />
                )}
                {member.links.linkedin && (
                  <SocialLink href={member.links.linkedin} label="LinkedIn" icon={Briefcase} />
                )}
                {member.links.github && (
                  <SocialLink href={member.links.github} label="GitHub" icon={Code2} />
                )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function SocialLink({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex size-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:text-foreground"
    >
      <Icon className="size-4" aria-hidden />
    </Link>
  );
}
