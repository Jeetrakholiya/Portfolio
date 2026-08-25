export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: 'github' | 'linkedin' | 'instagram' | 'email' | string;
  url: string;
  label: string;
}

export interface SiteConfig {
  name: string;
  creativeName: string;
  title: string;
  primaryRole: string;
  secondaryRoles: string[];
  description: string;
  url: string;
  email: string;
  github: string;
  linkedin: string;
  instagram: string;
  location: string;
  availability: string;
  navItems: NavItem[];
  socialLinks: SocialLink[];
}
