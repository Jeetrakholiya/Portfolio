import { SiteConfig } from '@/types/site';

export const siteConfig: SiteConfig = {
  name: 'Jeet Rakholiya',
  creativeName: 'J.GAZE_',
  title: 'Jeet Rakholiya — Full-Stack Developer & Visual Creator',
  primaryRole: 'Full-Stack Developer',
  secondaryRoles: [
    'AI/ML Enthusiast',
    'Videographer',
    'Video Editor',
    'Visual Storyteller',
  ],
  description:
    'Personal portfolio of Jeet Rakholiya — Full-Stack Developer building modern digital products and Visual Creator (J.GAZE_) crafting cinematic visual experiences.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://jeetrakholiya.dev',
  email: 'jeetrakholiya02@gmail.com',
  github: 'https://github.com/Jeetrakholiya',
  linkedin: 'https://linkedin.com/in/jeet-rakholiya-48a662358',
  instagram: 'https://www.instagram.com/j.gaze_/',
  location: 'Gujarat, India',
  availability: 'Available for opportunities',
  navItems: [
    { label: 'Work', href: '/#work' },
    { label: 'Creative', href: '/#creative' },
    { label: 'About', href: '/#about' },
    { label: 'Capabilities', href: '/#skills' },
    { label: 'Background', href: '/#background' },
    { label: 'Contact', href: '/#contact' },
  ],
  socialLinks: [
    { platform: 'github', url: 'https://github.com/Jeetrakholiya', label: 'GitHub' },
    { platform: 'linkedin', url: 'https://linkedin.com/in/jeet-rakholiya-48a662358', label: 'LinkedIn' },
    { platform: 'instagram', url: 'https://www.instagram.com/j.gaze_/', label: 'Instagram (J.GAZE_)' },
  ],
};
