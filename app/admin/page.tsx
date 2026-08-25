'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Settings,
  FolderGit2,
  Clapperboard,
  Sparkles,
  Save,
  LogOut,
  ArrowUpRight,
  Plus,
  Trash2,
  Upload,
  Check,
  AlertCircle,
  Eye,
  Terminal,
  Tv,
  CheckCircle2,
  Sliders,
  Copy,
  Download,
  UploadCloud,
  FileCode,
  Shield,
  Layers,
  Zap,
} from 'lucide-react';
import {
  AppContent,
  defaultTemplatesConfig,
  ThemeProfileData,
  ThemeProfilesMap,
  createDefaultThemeProfiles,
} from '@/types/content';
import { Project } from '@/types/project';
import { CreativeWork } from '@/types/creative';
import { SkillItem } from '@/types/skills';

type ThemeKey = 'syntax' | 'spiderTech' | 'ericCole';

const themeMeta: Record<ThemeKey, { label: string; icon: any; color: string; bg: string; border: string; desc: string }> = {
  syntax: {
    label: 'Syntax (Dark Terminal)',
    icon: Terminal,
    color: '#00f59b',
    bg: 'bg-[#00f59b]/10',
    border: 'border-[#00f59b]',
    desc: 'Developer & Software Engineer Persona • Cyber Monospace',
  },
  spiderTech: {
    label: 'Spider-Tech (Multiverse)',
    icon: Zap,
    color: '#c40c24',
    bg: 'bg-[#c40c24]/10',
    border: 'border-[#c40c24]',
    desc: 'Spider-Verse & Sci-Fi Persona • 360° Elastic Web Physics',
  },
  ericCole: {
    label: 'Eric Cole (Retro CRT TV)',
    icon: Tv,
    color: '#ffffff',
    bg: 'bg-white/10',
    border: 'border-white',
    desc: 'Editorial & Filmmaker Persona • Vintage 90s CRT Monitor',
  },
};

export default function AdminDashboardPage() {
  const [content, setContent] = useState<AppContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Active Theme Workspace: syntax | spiderTech | ericCole
  const [activeTheme, setActiveTheme] = useState<ThemeKey>('syntax');

  // Sub-tabs for the active theme
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'creative' | 'skills' | 'customizer'>('profile');

  // Notification Toast
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Modals & Item Editors
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isNewProject, setIsNewProject] = useState(false);
  const [editingCreative, setEditingCreative] = useState<CreativeWork | null>(null);
  const [isNewCreative, setIsNewCreative] = useState(false);

  // Copy Theme Modal State
  const [showCopyModal, setShowCopyModal] = useState(false);
  const [copySourceTheme, setCopySourceTheme] = useState<ThemeKey>('syntax');

  // Skill Input State
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('Programming');
  const [newSkillHighlight, setNewSkillHighlight] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const fetchContent = React.useCallback(async () => {
    try {
      const authRes = await fetch('/api/admin/auth');
      const authData = await authRes.json();
      if (!authData.authenticated) {
        router.push('/admin/login');
        return;
      }

      const res = await fetch('/api/admin/content');
      const data = await res.json();
      if (data.success && data.data) {
        const loadedContent = data.data as AppContent;
        if (!loadedContent.templates) {
          loadedContent.templates = defaultTemplatesConfig;
        }
        if (!loadedContent.themeProfiles || !loadedContent.themeProfiles.syntax || !loadedContent.themeProfiles.spiderTech || !loadedContent.themeProfiles.ericCole) {
          loadedContent.themeProfiles = createDefaultThemeProfiles(loadedContent);
        }
        setContent(loadedContent);
      }
    } catch (err) {
      console.error('Failed to fetch content:', err);
      showNotification('error', 'Failed to load content from server.');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchContent();

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const unlocked = params.get('unlocked') as ThemeKey | 'all' | null;
      const license = params.get('license');
      if (unlocked) {
        if (unlocked === 'syntax' || unlocked === 'spiderTech' || unlocked === 'ericCole') {
          setActiveTheme(unlocked);
          showNotification('success', `🎉 Unlocked ${themeMeta[unlocked].label} Builder! License: ${license || 'ACTIVE'}`);
        } else if (unlocked === 'all') {
          showNotification('success', `🎉 Unlocked All-Access Triple Template Suite! License: ${license || 'ACTIVE'}`);
        }
      }
    }
  }, [fetchContent]);

  const handleSaveAll = React.useCallback(async () => {
    if (!content) return;
    setSaving(true);
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showNotification('success', `Live portfolio changes for "${themeMeta[activeTheme].label}" saved!`);
      } else {
        showNotification('error', data.error || 'Failed to save changes.');
      }
    } catch {
      showNotification('error', 'Network error occurred while saving.');
    } finally {
      setSaving(false);
    }
  }, [content, activeTheme]);

  // Keyboard shortcut Ctrl+S / Cmd+S
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSaveAll();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSaveAll]);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Helper to get active theme profile
  const getActiveProfile = (): ThemeProfileData => {
    if (!content) {
      return createDefaultThemeProfiles({}).syntax;
    }
    if (!content.themeProfiles) {
      content.themeProfiles = createDefaultThemeProfiles(content);
    }
    return content.themeProfiles[activeTheme] || content.themeProfiles.syntax;
  };

  // Helper to mutate active theme profile
  const updateActiveProfile = (updater: (prev: ThemeProfileData) => ThemeProfileData) => {
    if (!content) return;
    const currentProfiles = content.themeProfiles || createDefaultThemeProfiles(content);
    const currentThemeData = currentProfiles[activeTheme] || currentProfiles.syntax;
    const updatedThemeData = updater({ ...currentThemeData });

    const newProfiles: ThemeProfilesMap = {
      ...currentProfiles,
      [activeTheme]: updatedThemeData,
    };

    setContent({
      ...content,
      themeProfiles: newProfiles,
      // If updating syntax, keep fallback in sync
      ...(activeTheme === 'syntax'
        ? {
            site: updatedThemeData.site,
            projects: updatedThemeData.projects,
            creative: updatedThemeData.creative,
            skills: updatedThemeData.skills,
          }
        : {}),
    });
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'logout' }),
      });
      router.push('/admin/login');
    } catch {
      router.push('/admin/login');
    }
  };

  const uploadFile = async (file: File, type: 'image' | 'video' | 'portrait'): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showNotification('success', 'File uploaded successfully!');
        return data.url;
      } else {
        showNotification('error', data.error || 'Upload failed.');
        return null;
      }
    } catch {
      showNotification('error', 'Upload error.');
      return null;
    }
  };

  // Copy / Clone details from another theme
  const handleCopyFromTheme = () => {
    if (!content || !content.themeProfiles) return;
    const sourceData = content.themeProfiles[copySourceTheme];
    if (!sourceData) return;

    updateActiveProfile(() => ({
      site: { ...sourceData.site },
      projects: [...sourceData.projects],
      creative: [...sourceData.creative],
      skills: [...sourceData.skills],
      education: sourceData.education ? [...sourceData.education] : undefined,
      certifications: sourceData.certifications ? [...sourceData.certifications] : undefined,
      settings: { ...sourceData.settings },
    }));

    setShowCopyModal(false);
    showNotification('success', `Copied all content from ${themeMeta[copySourceTheme].label} into ${themeMeta[activeTheme].label}!`);
  };

  // Export JSON file
  const handleExportJSON = () => {
    if (!content) return;
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(content, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `portfolio-config-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showNotification('success', 'Portfolio configuration exported as JSON!');
  };

  // Import JSON file
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string) as AppContent;
          if (parsed.site || parsed.themeProfiles) {
            if (!parsed.themeProfiles) {
              parsed.themeProfiles = createDefaultThemeProfiles(parsed);
            }
            setContent(parsed);
            showNotification('success', 'Imported portfolio configuration successfully! Click Save to apply.');
          } else {
            showNotification('error', 'Invalid JSON schema.');
          }
        } catch {
          showNotification('error', 'Failed to parse JSON file.');
        }
      };
    }
  };



  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090b] text-white flex items-center justify-center font-mono">
        <div className="flex items-center gap-3 text-[#00f59b] animate-pulse">
          <Terminal className="w-6 h-6 animate-spin" />
          <span>INITIALIZING MULTI-THEME PORTFOLIO CMS...</span>
        </div>
      </div>
    );
  }

  const activeProfile = getActiveProfile();

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] font-sans pb-28">
      
      {/* Hidden File Input for JSON Import */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImportJSON}
        accept=".json"
        className="hidden"
      />

      {/* =================================================================
          TOP NAVIGATION BAR & MULTI-THEME WORKSPACE CONTROLS
          ================================================================= */}
      <header className="sticky top-0 z-40 bg-[#09090b]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        
        {/* Left Title & Status */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-white/5 border border-white/10">
            <Sliders className="w-5 h-5 text-[#00f59b]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm sm:text-base tracking-tight text-white">PORTFOLIO BUILDER CMS</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#00f59b]/20 text-[#00f59b] border border-[#00f59b]/40">
                MULTI-THEME
              </span>
            </div>
            <p className="text-[11px] text-white/50 font-mono hidden sm:block">
              Build custom portfolios with independent profiles across all 3 themes
            </p>
          </div>
        </div>

        {/* Right Global Actions */}
        <div className="flex items-center gap-2 sm:gap-3 font-mono text-xs">
          
          {/* Export JSON */}
          <button
            onClick={handleExportJSON}
            title="Download full portfolio backup JSON"
            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-white/80 hover:text-white flex items-center gap-1.5 transition-all text-[11px]"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden md:inline">EXPORT</span>
          </button>

          {/* Import JSON */}
          <button
            onClick={() => fileInputRef.current?.click()}
            title="Upload custom portfolio JSON"
            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-white/80 hover:text-white flex items-center gap-1.5 transition-all text-[11px]"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span className="hidden md:inline">IMPORT</span>
          </button>

          {/* View Live */}
          <Link
            href="/"
            target="_blank"
            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-white flex items-center gap-1.5 transition-all text-[11px]"
          >
            <Eye className="w-3.5 h-3.5 text-[#00f59b]" />
            <span className="hidden sm:inline">VIEW LIVE</span>
          </Link>

          {/* Save Live Button */}
          <button
            onClick={handleSaveAll}
            disabled={saving}
            className="px-4 py-1.5 rounded-lg bg-[#00f59b] hover:bg-[#00f59b]/90 text-black font-bold flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(0,245,155,0.4)] disabled:opacity-50 text-[11px]"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saving ? 'SAVING...' : 'SAVE LIVE'}</span>
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            title="Logout"
            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

      </header>

      {/* =================================================================
          TOAST NOTIFICATION
          ================================================================= */}
      {notification && (
        <div
          className={`fixed bottom-20 right-6 z-50 px-4 py-3 rounded-xl backdrop-blur-xl border shadow-2xl flex items-center gap-3 font-mono text-xs animate-in slide-in-from-bottom-5 ${
            notification.type === 'success'
              ? 'bg-[#00f59b]/15 text-[#00f59b] border-[#00f59b]/40 shadow-[0_0_30px_rgba(0,245,155,0.3)]'
              : 'bg-red-500/15 text-red-400 border-red-500/40 shadow-[0_0_30px_rgba(239,68,68,0.3)]'
          }`}
        >
          {notification.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* =================================================================
          MAIN WORKSPACE CONTENT CONTAINER
          ================================================================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 space-y-6">
        
        {/* =================================================================
            1. THEME WORKSPACE SELECTOR (TOP TABS)
            ================================================================= */}
        <div className="bg-[#111116] border border-white/10 rounded-2xl p-4 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-white/50 uppercase tracking-widest">
                ACTIVE PORTFOLIO THEME WORKSPACE:
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2 mt-0.5">
                <span>EDITING:</span>
                <span style={{ color: themeMeta[activeTheme].color }}>
                  {themeMeta[activeTheme].label}
                </span>
              </h1>
            </div>

            {/* Quick Actions for Active Theme */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowCopyModal(true)}
                className="px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono text-white/80 hover:text-white flex items-center gap-2 transition-all"
              >
                <Copy className="w-3.5 h-3.5 text-[#00f59b]" />
                <span>COPY FROM ANOTHER THEME</span>
              </button>
            </div>
          </div>

          {/* Theme Workspace Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            {(['syntax', 'spiderTech', 'ericCole'] as ThemeKey[]).map((key) => {
              const meta = themeMeta[key];
              const isSelected = activeTheme === key;
              const Icon = meta.icon;

              return (
                <button
                  key={key}
                  onClick={() => setActiveTheme(key)}
                  className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                    isSelected
                      ? `${meta.border} ${meta.bg} shadow-lg scale-[1.01]`
                      : 'border-white/10 bg-black/40 hover:border-white/25 hover:bg-black/60 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="p-1.5 rounded-md"
                        style={{ backgroundColor: `${meta.color}20`, color: meta.color }}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-sm text-white">{meta.label}</span>
                    </div>

                    {isSelected && (
                      <span
                        className="w-2 h-2 rounded-full animate-ping"
                        style={{ backgroundColor: meta.color }}
                      />
                    )}
                  </div>

                  <p className="text-[11px] text-white/60 font-mono line-clamp-1">
                    {meta.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* =================================================================
            2. SUB-SECTION NAVIGATION (PROFILE • PROJECTS • REELS • SKILLS • CUSTOMIZER)
            ================================================================= */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-white/10 font-mono text-xs">
          {[
            { id: 'profile', label: '1. IDENTITY & PROFILE', icon: Settings },
            { id: 'projects', label: '2. PROJECTS CATALOG', icon: FolderGit2 },
            { id: 'creative', label: '3. REELS & VIDEOS', icon: Clapperboard },
            { id: 'skills', label: '4. SKILLS & ARSENAL', icon: Sparkles },
            { id: 'customizer', label: '5. THEME VISUALS', icon: Sliders },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-t-lg font-bold transition-all whitespace-nowrap flex items-center gap-2 border-b-2 ${
                  isActive
                    ? 'border-[#00f59b] bg-white/5 text-white'
                    : 'border-transparent text-white/50 hover:text-white hover:bg-white/[0.02]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* =================================================================
            3. TAB CONTENT PANELS
            ================================================================= */}
        
        {/* ==================== TAB 1: IDENTITY & PROFILE ==================== */}
        {activeTab === 'profile' && (
          <div className="bg-[#111116] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
            
            <div className="border-b border-white/10 pb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Identity & Bio Settings for</span>
                <span style={{ color: themeMeta[activeTheme].color }}>
                  {themeMeta[activeTheme].label}
                </span>
              </h2>
              <p className="text-xs text-white/50 font-mono mt-1">
                Customize the name, bio, timeline, roles, avatar, and social links specifically shown when this theme is active.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
              
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-white/70 block uppercase font-bold">Name</label>
                <input
                  type="text"
                  value={activeProfile.site.name || ''}
                  onChange={(e) =>
                    updateActiveProfile((prev) => ({
                      ...prev,
                      site: { ...prev.site, name: e.target.value },
                    }))
                  }
                  placeholder="e.g. Jeet Rakholiya / Spider-Man"
                  className="w-full px-4 py-2.5 bg-black/60 border border-white/15 rounded-lg text-white font-sans text-sm focus:outline-none focus:border-[#00f59b]"
                />
              </div>

              {/* Creative Name / Alter Ego */}
              <div className="space-y-1.5">
                <label className="text-white/70 block uppercase font-bold">Creative Alias / Alter Ego</label>
                <input
                  type="text"
                  value={activeProfile.site.creativeName || ''}
                  onChange={(e) =>
                    updateActiveProfile((prev) => ({
                      ...prev,
                      site: { ...prev.site, creativeName: e.target.value },
                    }))
                  }
                  placeholder="e.g. J.GAZE_ / PETER PARKER"
                  className="w-full px-4 py-2.5 bg-black/60 border border-white/15 rounded-lg text-white font-sans text-sm focus:outline-none focus:border-[#00f59b]"
                />
              </div>

              {/* Primary Role */}
              <div className="space-y-1.5">
                <label className="text-white/70 block uppercase font-bold">Primary Role</label>
                <input
                  type="text"
                  value={activeProfile.site.primaryRole || ''}
                  onChange={(e) =>
                    updateActiveProfile((prev) => ({
                      ...prev,
                      site: { ...prev.site, primaryRole: e.target.value },
                    }))
                  }
                  placeholder="e.g. Full-Stack Developer / Creative Director"
                  className="w-full px-4 py-2.5 bg-black/60 border border-white/15 rounded-lg text-white font-sans text-sm focus:outline-none focus:border-[#00f59b]"
                />
              </div>

              {/* Page Title Tag */}
              <div className="space-y-1.5">
                <label className="text-white/70 block uppercase font-bold">Page Title / SEO Headline</label>
                <input
                  type="text"
                  value={activeProfile.site.title || ''}
                  onChange={(e) =>
                    updateActiveProfile((prev) => ({
                      ...prev,
                      site: { ...prev.site, title: e.target.value },
                    }))
                  }
                  placeholder="e.g. Jeet Rakholiya — Full-Stack Developer"
                  className="w-full px-4 py-2.5 bg-black/60 border border-white/15 rounded-lg text-white font-sans text-sm focus:outline-none focus:border-[#00f59b]"
                />
              </div>

              {/* Hero Subtitle */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-white/70 block uppercase font-bold">Hero Subtitle / Tagline</label>
                <input
                  type="text"
                  value={activeProfile.site.heroSubtitle || ''}
                  onChange={(e) =>
                    updateActiveProfile((prev) => ({
                      ...prev,
                      site: { ...prev.site, heroSubtitle: e.target.value },
                    }))
                  }
                  placeholder="e.g. Full-Stack Developer & Visual Creator (@j.gaze_), based in Gujarat, India"
                  className="w-full px-4 py-2.5 bg-black/60 border border-white/15 rounded-lg text-white font-sans text-sm focus:outline-none focus:border-[#00f59b]"
                />
              </div>

              {/* Hero Quote / Manifesto */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-white/70 block uppercase font-bold">Theme Manifesto / Quote</label>
                <textarea
                  rows={3}
                  value={activeProfile.site.heroQuote || ''}
                  onChange={(e) =>
                    updateActiveProfile((prev) => ({
                      ...prev,
                      site: { ...prev.site, heroQuote: e.target.value },
                    }))
                  }
                  placeholder="Describe your philosophy or mission statement for this theme..."
                  className="w-full px-4 py-2.5 bg-black/60 border border-white/15 rounded-lg text-white font-sans text-sm focus:outline-none focus:border-[#00f59b] resize-none"
                />
              </div>

              {/* Portrait Image URL & Upload */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-white/70 block uppercase font-bold">Portrait Image / Avatar</label>
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-black/60 border border-white/20 flex-shrink-0">
                    <Image
                      src={activeProfile.site.portraitImage || '/images/jeet-syntax.png'}
                      alt="Avatar"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={activeProfile.site.portraitImage || ''}
                      onChange={(e) =>
                        updateActiveProfile((prev) => ({
                          ...prev,
                          site: { ...prev.site, portraitImage: e.target.value },
                        }))
                      }
                      placeholder="/images/your-photo.png"
                      className="w-full px-4 py-2 bg-black/60 border border-white/15 rounded-lg text-white font-sans text-xs focus:outline-none focus:border-[#00f59b]"
                    />
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-md text-[11px] font-mono cursor-pointer transition-all">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Avatar</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          if (e.target.files && e.target.files[0]) {
                            const url = await uploadFile(e.target.files[0], 'portrait');
                            if (url) {
                              updateActiveProfile((prev) => ({
                                ...prev,
                                site: { ...prev.site, portraitImage: url },
                              }));
                            }
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Email & Location */}
              <div className="space-y-1.5">
                <label className="text-white/70 block uppercase font-bold">Contact Email</label>
                <input
                  type="email"
                  value={activeProfile.site.email || ''}
                  onChange={(e) =>
                    updateActiveProfile((prev) => ({
                      ...prev,
                      site: { ...prev.site, email: e.target.value },
                    }))
                  }
                  className="w-full px-4 py-2.5 bg-black/60 border border-white/15 rounded-lg text-white font-sans text-sm focus:outline-none focus:border-[#00f59b]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-white/70 block uppercase font-bold">Location</label>
                <input
                  type="text"
                  value={activeProfile.site.location || ''}
                  onChange={(e) =>
                    updateActiveProfile((prev) => ({
                      ...prev,
                      site: { ...prev.site, location: e.target.value },
                    }))
                  }
                  className="w-full px-4 py-2.5 bg-black/60 border border-white/15 rounded-lg text-white font-sans text-sm focus:outline-none focus:border-[#00f59b]"
                />
              </div>

              {/* Social Links: GitHub, LinkedIn, Instagram */}
              <div className="space-y-1.5">
                <label className="text-white/70 block uppercase font-bold">GitHub Profile URL</label>
                <input
                  type="text"
                  value={activeProfile.site.github || ''}
                  onChange={(e) =>
                    updateActiveProfile((prev) => ({
                      ...prev,
                      site: { ...prev.site, github: e.target.value },
                    }))
                  }
                  className="w-full px-4 py-2.5 bg-black/60 border border-white/15 rounded-lg text-white font-sans text-sm focus:outline-none focus:border-[#00f59b]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-white/70 block uppercase font-bold">LinkedIn Profile URL</label>
                <input
                  type="text"
                  value={activeProfile.site.linkedin || ''}
                  onChange={(e) =>
                    updateActiveProfile((prev) => ({
                      ...prev,
                      site: { ...prev.site, linkedin: e.target.value },
                    }))
                  }
                  className="w-full px-4 py-2.5 bg-black/60 border border-white/15 rounded-lg text-white font-sans text-sm focus:outline-none focus:border-[#00f59b]"
                />
              </div>

            </div>

          </div>
        )}

        {/* ==================== TAB 2: PROJECTS CATALOG ==================== */}
        {activeTab === 'projects' && (
          <div className="bg-[#111116] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>Projects Featured in</span>
                  <span style={{ color: themeMeta[activeTheme].color }}>
                    {themeMeta[activeTheme].label}
                  </span>
                </h2>
                <p className="text-xs text-white/50 font-mono mt-1">
                  Manage the project catalog specifically displayed when this theme is active.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingProject({
                    id: `project-${Date.now()}`,
                    slug: `project-${Date.now()}`,
                    title: 'New Project',
                    category: 'Full-Stack / AI',
                    shortDescription: 'Short summary of the project architecture and features.',
                    description: 'Detailed description of the project, stack, and impact.',
                    year: '2025',
                    role: 'Lead Architecture',
                    status: 'Live Deployment',
                    timeline: '2025',
                    technologies: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS'],
                    image: '/images/projects/learnwise.svg',
                    thumbnail: '/images/projects/learnwise.svg',
                    liveUrl: '',
                    githubUrl: '',
                    featured: true,
                    order: (activeProfile.projects?.length || 0) + 1,
                  });
                  setIsNewProject(true);
                }}
                className="px-4 py-2 bg-[#00f59b] hover:bg-[#00f59b]/90 text-black font-mono text-xs font-bold rounded-lg flex items-center gap-2 transition-all shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>ADD PROJECT TO {themeMeta[activeTheme].label.toUpperCase()}</span>
              </button>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(activeProfile.projects || []).map((project, idx) => (
                <div
                  key={project.id || idx}
                  className="bg-black/50 border border-white/15 rounded-xl p-4 flex flex-col justify-between hover:border-white/40 transition-all group"
                >
                  <div className="space-y-3">
                    <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-black/80 border border-white/10">
                      <Image
                        src={project.image || project.thumbnail || '/images/projects/learnwise.svg'}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-[10px] font-mono text-white/50 mb-1">
                        <span className="uppercase text-[#00f59b]">{project.category}</span>
                        <span>{project.year || '2025'}</span>
                      </div>
                      <h3 className="font-bold text-base text-white group-hover:text-[#00f59b] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs text-white/70 line-clamp-2 mt-1 font-mono">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {(project.technologies || []).slice(0, 3).map((t) => (
                        <span key={t} className="px-2 py-0.5 bg-white/5 rounded text-[10px] font-mono text-white/80">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/10 font-mono text-xs">
                    <button
                      onClick={() => {
                        setEditingProject({ ...project });
                        setIsNewProject(false);
                      }}
                      className="px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-white font-bold transition-all"
                    >
                      EDIT
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Remove "${project.title}" from ${themeMeta[activeTheme].label}?`)) {
                          updateActiveProfile((prev) => ({
                            ...prev,
                            projects: prev.projects.filter((_, pIdx) => pIdx !== idx),
                          }));
                          showNotification('success', 'Project removed.');
                        }
                      }}
                      className="p-1.5 rounded hover:bg-red-500/20 text-red-400 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ==================== TAB 3: CREATIVE / REELS ==================== */}
        {activeTab === 'creative' && (
          <div className="bg-[#111116] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>Creative Media & Video Reels for</span>
                  <span style={{ color: themeMeta[activeTheme].color }}>
                    {themeMeta[activeTheme].label}
                  </span>
                </h2>
                <p className="text-xs text-white/50 font-mono mt-1">
                  Manage video files, reels, and TV monitors displayed when this theme is selected.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingCreative({
                    id: `creative-${Date.now()}`,
                    title: 'Cinematic Reel',
                    category: 'Commercial / Cinematic',
                    videoSrc: '/videos/j-gaze-reel.mp4',
                    duration: '0:30',
                    aspectRatio: '9:16',
                    description: 'Creative direction and video editing.',
                    client: 'Studio Work',
                    year: '2025',
                    featured: true,
                    order: (activeProfile.creative?.length || 0) + 1,
                  });
                  setIsNewCreative(true);
                }}
                className="px-4 py-2 bg-[#00f59b] hover:bg-[#00f59b]/90 text-black font-mono text-xs font-bold rounded-lg flex items-center gap-2 transition-all shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>ADD MEDIA REEL</span>
              </button>
            </div>

            {/* Creative Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(activeProfile.creative || []).map((work, idx) => (
                <div
                  key={work.id || idx}
                  className="bg-black/50 border border-white/15 rounded-xl p-4 flex flex-col justify-between hover:border-white/40 transition-all"
                >
                  <div className="space-y-3">
                    <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-black flex items-center justify-center border border-white/10">
                      {work.videoSrc ? (
                        <video src={work.videoSrc} className="w-full h-full object-cover" muted />
                      ) : (
                        <Clapperboard className="w-8 h-8 text-white/30" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-[10px] font-mono text-white/50 mb-1">
                        <span className="uppercase text-[#00f59b]">{work.category}</span>
                        <span>{work.year || '2025'}</span>
                      </div>
                      <h3 className="font-bold text-base text-white">{work.title}</h3>
                      <p className="text-xs text-white/70 line-clamp-2 mt-1 font-mono">{work.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/10 font-mono text-xs">
                    <button
                      onClick={() => {
                        setEditingCreative({ ...work });
                        setIsNewCreative(false);
                      }}
                      className="px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-white font-bold transition-all"
                    >
                      EDIT
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Remove "${work.title}"?`)) {
                          updateActiveProfile((prev) => ({
                            ...prev,
                            creative: prev.creative.filter((_, cIdx) => cIdx !== idx),
                          }));
                          showNotification('success', 'Creative reel removed.');
                        }
                      }}
                      className="p-1.5 rounded hover:bg-red-500/20 text-red-400 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ==================== TAB 4: SKILLS & ARSENAL ==================== */}
        {activeTab === 'skills' && (
          <div className="bg-[#111116] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
            
            <div className="border-b border-white/10 pb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Skills & Superpowers for</span>
                <span style={{ color: themeMeta[activeTheme].color }}>
                  {themeMeta[activeTheme].label}
                </span>
              </h2>
              <p className="text-xs text-white/50 font-mono mt-1">
                Add and manage skills or technical capabilities shown in this theme.
              </p>
            </div>

            {/* Add Skill Bar */}
            <div className="p-4 bg-black/50 border border-white/15 rounded-xl flex flex-wrap items-center gap-3 font-mono text-xs">
              <input
                type="text"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                placeholder="Skill Name (e.g. Next.js 14, Python, PyTorch)"
                className="px-4 py-2 bg-black border border-white/15 rounded-lg text-white font-sans text-xs flex-1 min-w-[200px] focus:outline-none focus:border-[#00f59b]"
              />

              <select
                value={newSkillCategory}
                onChange={(e) => setNewSkillCategory(e.target.value)}
                className="px-3 py-2 bg-black border border-white/15 rounded-lg text-white font-mono text-xs focus:outline-none"
              >
                <option value="Programming">Programming</option>
                <option value="Frameworks">Frameworks</option>
                <option value="AI / ML">AI / ML</option>
                <option value="Tools">Tools</option>
                <option value="Creative">Creative</option>
              </select>

              <button
                onClick={() => {
                  if (!newSkillName.trim()) return;
                  updateActiveProfile((prev) => ({
                    ...prev,
                    skills: [
                      ...prev.skills,
                      {
                        name: newSkillName.trim(),
                        category: newSkillCategory as any,
                        highlight: newSkillHighlight,
                        proficiency: 95,
                      },
                    ],
                  }));
                  setNewSkillName('');
                  showNotification('success', 'Skill added!');
                }}
                className="px-4 py-2 bg-[#00f59b] hover:bg-[#00f59b]/90 text-black font-bold rounded-lg flex items-center gap-1.5 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>ADD SKILL</span>
              </button>
            </div>

            {/* Skills Pills List */}
            <div className="flex flex-wrap gap-2 pt-2">
              {(activeProfile.skills || []).map((skill, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1.5 bg-black/60 border border-white/15 rounded-lg font-mono text-xs flex items-center gap-2 hover:border-[#00f59b] transition-all group"
                >
                  <span className="text-white font-bold">{skill.name}</span>
                  <span className="text-[10px] text-white/40 uppercase">({skill.category})</span>
                  <button
                    onClick={() => {
                      updateActiveProfile((prev) => ({
                        ...prev,
                        skills: prev.skills.filter((_, sIdx) => sIdx !== idx),
                      }));
                    }}
                    className="text-red-400 opacity-60 group-hover:opacity-100 hover:text-red-300"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ==================== TAB 5: THEME CUSTOMIZER ==================== */}
        {activeTab === 'customizer' && (
          <div className="bg-[#111116] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 font-mono text-xs">
            
            <div className="border-b border-white/10 pb-4">
              <h2 className="text-lg font-bold text-white font-sans flex items-center gap-2">
                <span>Visuals & Customizer Controls for</span>
                <span style={{ color: themeMeta[activeTheme].color }}>
                  {themeMeta[activeTheme].label}
                </span>
              </h2>
              <p className="text-xs text-white/50 mt-1">
                Configure theme-specific hardware features, animation effects, and visual styling tokens.
              </p>
            </div>

            {activeTheme === 'syntax' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-white/70 block uppercase font-bold">Accent Color Token</label>
                    <input
                      type="text"
                      value={activeProfile.settings?.accentColor || '#00f59b'}
                      onChange={(e) =>
                        updateActiveProfile((prev) => ({
                          ...prev,
                          settings: { ...prev.settings, accentColor: e.target.value },
                        }))
                      }
                      className="w-full px-4 py-2 bg-black border border-white/15 rounded-lg text-white font-mono text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-white/70 block uppercase font-bold">Infinite Marquee Text</label>
                    <input
                      type="text"
                      value={activeProfile.settings?.marqueeText || 'REACT 19 • NEXT.JS 14 • FASTAPI • PYTHON • TAILWIND CSS'}
                      onChange={(e) =>
                        updateActiveProfile((prev) => ({
                          ...prev,
                          settings: { ...prev.settings, marqueeText: e.target.value },
                        }))
                      }
                      className="w-full px-4 py-2 bg-black border border-white/15 rounded-lg text-white font-mono text-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTheme === 'spiderTech' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-white/70 block uppercase font-bold">Suit Accent Color</label>
                    <input
                      type="text"
                      value={activeProfile.settings?.suitColor || '#c40c24'}
                      onChange={(e) =>
                        updateActiveProfile((prev) => ({
                          ...prev,
                          settings: { ...prev.settings, suitColor: e.target.value },
                        }))
                      }
                      className="w-full px-4 py-2 bg-black border border-white/15 rounded-lg text-white font-mono text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-white/70 block uppercase font-bold">Web Tension / Physic Mode</label>
                    <input
                      type="text"
                      disabled
                      value="360° Omnidirectional Elastic Physics [ACTIVE]"
                      className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white/50 font-mono text-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTheme === 'ericCole' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-white/70 block uppercase font-bold">TV Channel Label</label>
                    <input
                      type="text"
                      value={activeProfile.settings?.tvChannel || 'CH 04 • J.GAZE_ EDITORIAL'}
                      onChange={(e) =>
                        updateActiveProfile((prev) => ({
                          ...prev,
                          settings: { ...prev.settings, tvChannel: e.target.value },
                        }))
                      }
                      className="w-full px-4 py-2 bg-black border border-white/15 rounded-lg text-white font-mono text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-white/70 block uppercase font-bold">TV Reel Video Path</label>
                    <input
                      type="text"
                      value={activeProfile.settings?.videoSrc || '/videos/j-gaze-reel.mp4'}
                      onChange={(e) =>
                        updateActiveProfile((prev) => ({
                          ...prev,
                          settings: { ...prev.settings, videoSrc: e.target.value },
                        }))
                      }
                      className="w-full px-4 py-2 bg-black border border-white/15 rounded-lg text-white font-mono text-xs"
                    />
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

      </main>

      {/* =================================================================
          COPY / CLONE THEME MODAL
          ================================================================= */}
      {showCopyModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#111116] border border-white/20 rounded-2xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Copy className="w-5 h-5 text-[#00f59b]" />
                <span>Copy Content to {themeMeta[activeTheme].label}</span>
              </h3>
              <p className="text-xs text-white/60 font-mono">
                Select another theme to copy all profile details, projects, reels, and skills into your currently active workspace.
              </p>
            </div>

            <div className="space-y-2 font-mono text-xs">
              <label className="text-white/80 uppercase font-bold block">Source Theme to Copy From:</label>
              <select
                value={copySourceTheme}
                onChange={(e) => setCopySourceTheme(e.target.value as ThemeKey)}
                className="w-full px-4 py-2.5 bg-black border border-white/20 rounded-lg text-white focus:outline-none"
              >
                {(['syntax', 'spiderTech', 'ericCole'] as ThemeKey[])
                  .filter((t) => t !== activeTheme)
                  .map((t) => (
                    <option key={t} value={t}>
                      {themeMeta[t].label}
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex items-center justify-end gap-3 font-mono text-xs pt-2">
              <button
                onClick={() => setShowCopyModal(false)}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold transition-all"
              >
                CANCEL
              </button>

              <button
                onClick={handleCopyFromTheme}
                className="px-4 py-2 rounded-lg bg-[#00f59b] hover:bg-[#00f59b]/90 text-black font-bold transition-all shadow-md"
              >
                CONFIRM &amp; CLONE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================
          PROJECT EDIT / CREATE MODAL
          ================================================================= */}
      {editingProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#111116] border border-white/20 rounded-2xl p-6 sm:p-8 max-w-2xl w-full space-y-6 my-8 shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FolderGit2 className="w-5 h-5 text-[#00f59b]" />
                <span>{isNewProject ? 'Add New Project' : 'Edit Project Details'}</span>
              </h3>
              <button onClick={() => setEditingProject(null)} className="text-white/60 hover:text-white text-xl font-bold">
                &times;
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-white/70 block uppercase font-bold">Project Title</label>
                <input
                  type="text"
                  value={editingProject.title || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full px-4 py-2 bg-black border border-white/15 rounded-lg text-white font-sans text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-white/70 block uppercase font-bold">Category</label>
                <input
                  type="text"
                  value={editingProject.category || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                  className="w-full px-4 py-2 bg-black border border-white/15 rounded-lg text-white font-sans text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-white/70 block uppercase font-bold">Year</label>
                <input
                  type="text"
                  value={editingProject.year || '2025'}
                  onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                  className="w-full px-4 py-2 bg-black border border-white/15 rounded-lg text-white font-sans text-xs"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-white/70 block uppercase font-bold">Description</label>
                <textarea
                  rows={3}
                  value={editingProject.description || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full px-4 py-2 bg-black border border-white/15 rounded-lg text-white font-sans text-xs resize-none"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-white/70 block uppercase font-bold">Technologies (comma separated)</label>
                <input
                  type="text"
                  value={(editingProject.technologies || []).join(', ')}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      technologies: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                    })
                  }
                  placeholder="React.js, Next.js 14, FastAPI, Python"
                  className="w-full px-4 py-2 bg-black border border-white/15 rounded-lg text-white font-sans text-xs"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-white/70 block uppercase font-bold">Image URL or Upload</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={editingProject.image || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value, thumbnail: e.target.value })}
                    className="flex-1 px-4 py-2 bg-black border border-white/15 rounded-lg text-white font-sans text-xs"
                  />
                  <label className="px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg cursor-pointer flex items-center gap-1 text-[11px] font-bold">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        if (e.target.files && e.target.files[0]) {
                          const url = await uploadFile(e.target.files[0], 'image');
                          if (url) {
                            setEditingProject({ ...editingProject, image: url, thumbnail: url });
                          }
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-white/70 block uppercase font-bold">Live Demo URL</label>
                <input
                  type="text"
                  value={editingProject.liveUrl || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-4 py-2 bg-black border border-white/15 rounded-lg text-white font-sans text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-white/70 block uppercase font-bold">GitHub Repo URL</label>
                <input
                  type="text"
                  value={editingProject.githubUrl || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                  placeholder="https://github.com/..."
                  className="w-full px-4 py-2 bg-black border border-white/15 rounded-lg text-white font-sans text-xs"
                />
              </div>

            </div>

            <div className="flex items-center justify-end gap-3 font-mono text-xs pt-4 border-t border-white/10">
              <button
                onClick={() => setEditingProject(null)}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold transition-all"
              >
                CANCEL
              </button>

              <button
                onClick={() => {
                  if (!editingProject.title) return;
                  if (isNewProject) {
                    updateActiveProfile((prev) => ({
                      ...prev,
                      projects: [...prev.projects, editingProject],
                    }));
                  } else {
                    updateActiveProfile((prev) => ({
                      ...prev,
                      projects: prev.projects.map((p) => (p.id === editingProject.id ? editingProject : p)),
                    }));
                  }
                  setEditingProject(null);
                  showNotification('success', 'Project updated in active workspace!');
                }}
                className="px-5 py-2 rounded-lg bg-[#00f59b] hover:bg-[#00f59b]/90 text-black font-bold transition-all shadow-md"
              >
                SAVE TO {themeMeta[activeTheme].label.toUpperCase()}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* =================================================================
          CREATIVE MEDIA EDIT / CREATE MODAL
          ================================================================= */}
      {editingCreative && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#111116] border border-white/20 rounded-2xl p-6 sm:p-8 max-w-xl w-full space-y-6 my-8 shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Clapperboard className="w-5 h-5 text-[#00f59b]" />
                <span>{isNewCreative ? 'Add Creative Media' : 'Edit Media Details'}</span>
              </h3>
              <button onClick={() => setEditingCreative(null)} className="text-white/60 hover:text-white text-xl font-bold">
                &times;
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-white/70 block uppercase font-bold">Media Title</label>
                <input
                  type="text"
                  value={editingCreative.title || ''}
                  onChange={(e) => setEditingCreative({ ...editingCreative, title: e.target.value })}
                  className="w-full px-4 py-2 bg-black border border-white/15 rounded-lg text-white font-sans text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-white/70 block uppercase font-bold">Category</label>
                <input
                  type="text"
                  value={editingCreative.category || ''}
                  onChange={(e) => setEditingCreative({ ...editingCreative, category: e.target.value })}
                  className="w-full px-4 py-2 bg-black border border-white/15 rounded-lg text-white font-sans text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-white/70 block uppercase font-bold">Aspect Ratio</label>
                <select
                  value={editingCreative.aspectRatio || '9:16'}
                  onChange={(e) => setEditingCreative({ ...editingCreative, aspectRatio: e.target.value as any })}
                  className="w-full px-4 py-2 bg-black border border-white/15 rounded-lg text-white font-mono text-xs"
                >
                  <option value="9:16">9:16 (Vertical Reel)</option>
                  <option value="16:9">16:9 (Cinematic Widescreen)</option>
                </select>
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-white/70 block uppercase font-bold">Video File URL or Upload</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={editingCreative.videoSrc || ''}
                    onChange={(e) => setEditingCreative({ ...editingCreative, videoSrc: e.target.value })}
                    className="flex-1 px-4 py-2 bg-black border border-white/15 rounded-lg text-white font-sans text-xs"
                  />
                  <label className="px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg cursor-pointer flex items-center gap-1 text-[11px] font-bold">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={async (e) => {
                        if (e.target.files && e.target.files[0]) {
                          const url = await uploadFile(e.target.files[0], 'video');
                          if (url) {
                            setEditingCreative({ ...editingCreative, videoSrc: url });
                          }
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

            </div>

            <div className="flex items-center justify-end gap-3 font-mono text-xs pt-4 border-t border-white/10">
              <button
                onClick={() => setEditingCreative(null)}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold transition-all"
              >
                CANCEL
              </button>

              <button
                onClick={() => {
                  if (!editingCreative.title) return;
                  if (isNewCreative) {
                    updateActiveProfile((prev) => ({
                      ...prev,
                      creative: [...prev.creative, editingCreative],
                    }));
                  } else {
                    updateActiveProfile((prev) => ({
                      ...prev,
                      creative: prev.creative.map((c) => (c.id === editingCreative.id ? editingCreative : c)),
                    }));
                  }
                  setEditingCreative(null);
                  showNotification('success', 'Media reel saved to active workspace!');
                }}
                className="px-5 py-2 rounded-lg bg-[#00f59b] hover:bg-[#00f59b]/90 text-black font-bold transition-all shadow-md"
              >
                SAVE MEDIA
              </button>
            </div>

          </div>
        </div>
      )}

      {/* =================================================================
          STICKY BOTTOM SAVE BAR
          ================================================================= */}
      <div className="fixed bottom-0 inset-x-0 bg-[#09090b]/95 backdrop-blur-xl border-t border-white/15 px-6 py-3 z-30 flex items-center justify-between">
        <div className="flex items-center gap-2 font-mono text-xs text-white/70">
          <span className="w-2 h-2 rounded-full bg-[#00f59b] animate-pulse" />
          <span>Active Workspace: <strong>{themeMeta[activeTheme].label}</strong></span>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <button
            onClick={handleSaveAll}
            disabled={saving}
            className="px-6 py-2.5 rounded-lg bg-[#00f59b] hover:bg-[#00f59b]/90 text-black font-bold flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(0,245,155,0.4)] disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'SAVING...' : 'SAVE ALL CHANGES'}</span>
          </button>
        </div>
      </div>

    </div>
  );
}
