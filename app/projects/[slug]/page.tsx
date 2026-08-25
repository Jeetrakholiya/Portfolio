import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projectsData } from '@/data/projects';
import { siteConfig } from '@/data/site';
import { CaseStudyHero } from '@/components/projects/case-study-hero';
import { CaseStudyContent } from '@/components/projects/case-study-content';
import { CaseStudyNext } from '@/components/projects/case-study-next';
import { Footer } from '@/components/layout/footer';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = projectsData.find((p) => p.slug === params.slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const pageUrl = `${siteConfig.url}/projects/${project.slug}`;

  return {
    title: `${project.title} — Case Study`,
    description: project.description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: 'article',
      url: pageUrl,
      title: `${project.title} | Case Study — ${siteConfig.name}`,
      description: project.shortDescription,
      siteName: `${siteConfig.name} | ${siteConfig.creativeName}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} — ${siteConfig.name}`,
      description: project.shortDescription,
    },
  };
}

export default function ProjectCaseStudyPage({ params }: ProjectPageProps) {
  const projectIndex = projectsData.findIndex((p) => p.slug === params.slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = projectsData[projectIndex];
  const nextProject = projectsData[(projectIndex + 1) % projectsData.length];

  const projectStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    headline: project.title,
    description: project.description,
    author: {
      '@type': 'Person',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    dateCreated: project.year,
    keywords: project.technologies.join(', '),
    url: `${siteConfig.url}/projects/${project.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectStructuredData) }}
      />
      <main className="w-full min-h-screen flex flex-col bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
        <CaseStudyHero project={project} totalProjects={projectsData.length} />
        <CaseStudyContent project={project} />
        <CaseStudyNext nextProject={nextProject} totalProjects={projectsData.length} />
        <Footer />
      </main>
    </>
  );
}
