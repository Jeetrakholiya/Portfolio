import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio Admin Panel | Jeet Rakholiya',
  description: 'Manage projects, videos, text, photos, and site configuration.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#f2f2f0] selection:bg-[#00f59b] selection:text-[#09090b]">
      {children}
    </div>
  );
}
