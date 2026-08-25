'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  LayoutTemplate,
  Settings,
  FolderGit2,
  Clapperboard,
  Sparkles,
  GraduationCap,
  Save,
  LogOut,
  ArrowUpRight,
  Plus,
  Trash2,
  Upload,
  Check,
  AlertCircle,
  Film,
  Eye,
  Terminal,
  Tv,
  CheckCircle2,
  ArrowLeft,
  Sliders,
  Palette,
  FileImage,
} from 'lucide-react';
import { AppContent, defaultTemplatesConfig, TemplatesConfig } from '@/types/content';
import { Project } from '@/types/project';
import { CreativeWork } from '@/types/creative';
import { SkillItem } from '@/types/skills';
import { Certification } from '@/types/certifications';

export default function AdminDashboardPage() {
  const [content, setContent] = useState<AppContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'templates' | 'profile' | 'projects' | 'creative' | 'skills' | 'academic'>('templates');
  
  // Theme Workspace State: Gallery View vs Dedicated Theme Management View
  const [selectedTemplateToEdit, setSelectedTemplateToEdit] = useState<'syntax' | 'spiderTech' | 'ericCole'>('syntax');
  const [isEditingThemeWorkspace, setIsEditingThemeWorkspace] = useState(false);
  
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Modals / Selected Items
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isNewProject, setIsNewProject] = useState(false);
  const [editingCreative, setEditingCreative] = useState<CreativeWork | null>(null);
  const [isNewCreative, setIsNewCreative] = useState(false);

  // New Skill / Cert Inputs
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('Programming');
  const [newSkillHighlight, setNewSkillHighlight] = useState(false);

  const [newCertTitle, setNewCertTitle] = useState('');
  const [newCertIssuer, setNewCertIssuer] = useState('Coursera');
  const [newCertDate, setNewCertDate] = useState('2025');

  const router = useRouter();

  const fetchContent = React.useCallback(async () => {
    try {
      // Check auth first
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
        setContent(loadedContent);
      }
    } catch (err) {
      console.error('Failed to fetch content:', err);
      showNotification('error', 'Failed to load content from server.');
    } finally {
      setLoading(false);
    }
  }, [router]);

  // Load Content
  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const handleSaveAll = async () => {
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
        showNotification('success', 'All template & portfolio changes saved live!');
      } else {
        showNotification('error', data.error || 'Failed to save changes.');
      }
    } catch {
      showNotification('error', 'Network error occurred while saving.');
    } finally {
      setSaving(false);
    }
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

  const updateSiteField = (field: string, value: any) => {
    if (!content) return;
    setContent({
      ...content,
      site: {
        ...content.site,
        [field]: value,
      },
    });
  };

  const handleUpdateTemplate = (
    templateKey: 'syntax' | 'spiderTech' | 'ericCole',
    field: string,
    value: any
  ) => {
    if (!content) return;
    const currentTemplates: TemplatesConfig = content.templates || defaultTemplatesConfig;
    setContent({
      ...content,
      templates: {
        ...currentTemplates,
        [templateKey]: {
          ...currentTemplates[templateKey],
          [field]: value,
        },
      },
    });
  };

  const handleSetActiveTemplate = (active: 'syntax' | 'fuel' | 'eric-cole') => {
    if (!content) return;
    const currentTemplates: TemplatesConfig = content.templates || defaultTemplatesConfig;
    setContent({
      ...content,
      templates: {
        ...currentTemplates,
        activeTemplate: active,
      },
    });
    showNotification('success', `Active default public template set to ${active.toUpperCase()}!`);
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#09090b] text-[#00f59b] font-mono text-sm">
        <span className="animate-pulse">Loading Admin Control Center...</span>
      </div>
    );
  }

  if (!content) return null;

  const currentTemplates = content.templates || defaultTemplatesConfig;

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#09090b] text-[#f2f2f0] pb-24 lg:pb-12">
      {/* =================================================================
          TOP APP BAR (MOBILE & DESKTOP RESPONSIVE)
          ================================================================= */}
      <header className="sticky top-0 z-50 w-full bg-[#0c0c10]/95 backdrop-blur-md border-b border-white/[0.08] px-4 sm:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00f59b] animate-pulse shrink-0" />
            <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-white truncate">
              CMS Studio
            </span>
          </div>
          <span className="text-white/20 hidden sm:inline">|</span>
          <span className="font-mono text-[10px] sm:text-[11px] text-muted uppercase tracking-widest hidden md:inline">
            Active: <strong className="text-[#00f59b]">{currentTemplates.activeTemplate.toUpperCase()}</strong>
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 font-mono text-xs">
          {/* Notification Pill */}
          {notification && (
            <div
              className={`px-2.5 py-1 rounded-[2px] flex items-center gap-1.5 text-[11px] font-semibold ${
                notification.type === 'success'
                  ? 'bg-[#00f59b]/15 text-[#00f59b] border border-[#00f59b]/30'
                  : 'bg-red-500/15 text-red-400 border border-red-500/30'
              }`}
            >
              {notification.type === 'success' ? <Check className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
              <span className="hidden sm:inline">{notification.message}</span>
              <span className="sm:hidden">{notification.type === 'success' ? 'Saved' : 'Error'}</span>
            </div>
          )}

          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white/5 hover:bg-white/10 rounded-[2px] text-muted hover:text-white transition-colors uppercase tracking-widest text-[10px] sm:text-[11px]"
            title="Preview Live Portfolio"
          >
            <span className="hidden sm:inline">Live Site</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleSaveAll}
            disabled={saving}
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#00f59b] text-[#09090b] font-bold uppercase tracking-widest text-[10px] sm:text-[11px] rounded-[2px] hover:bg-[#00f59b]/90 transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saving ? 'Saving...' : 'Save'}</span>
          </button>

          <button
            onClick={handleLogout}
            className="p-1.5 sm:p-2 text-muted hover:text-red-400 transition-colors"
            title="Logout"
            aria-label="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* =================================================================
          MOBILE HORIZONTAL TAB BAR (< 1024px)
          ================================================================= */}
      <div className="lg:hidden w-full bg-[#09090b] border-b border-white/[0.08] px-3 py-2 sticky top-[49px] z-40 backdrop-blur-md overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 min-w-max">
          <button
            onClick={() => {
              setActiveTab('templates');
              setIsEditingThemeWorkspace(false);
            }}
            className={`px-3 py-1.5 rounded-[2px] font-mono text-[11px] uppercase tracking-wider flex items-center gap-1.5 transition-colors ${
              activeTab === 'templates'
                ? 'bg-[#00f59b] text-[#09090b] font-bold'
                : 'bg-white/[0.04] text-muted hover:text-white'
            }`}
          >
            <LayoutTemplate className="w-3.5 h-3.5" />
            <span>Themes</span>
            <span className={`text-[9px] px-1 rounded ${activeTab === 'templates' ? 'bg-black/20 text-black' : 'bg-white/10 text-white/70'}`}>
              3
            </span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3 py-1.5 rounded-[2px] font-mono text-[11px] uppercase tracking-wider flex items-center gap-1.5 transition-colors ${
              activeTab === 'profile'
                ? 'bg-[#00f59b] text-[#09090b] font-bold'
                : 'bg-white/[0.04] text-muted hover:text-white'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Profile</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`px-3 py-1.5 rounded-[2px] font-mono text-[11px] uppercase tracking-wider flex items-center gap-1.5 transition-colors ${
              activeTab === 'projects'
                ? 'bg-[#00f59b] text-[#09090b] font-bold'
                : 'bg-white/[0.04] text-muted hover:text-white'
            }`}
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Projects</span>
            <span className={`text-[9px] px-1 rounded ${activeTab === 'projects' ? 'bg-black/20 text-black' : 'bg-white/10 text-white/70'}`}>
              {content.projects.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('creative')}
            className={`px-3 py-1.5 rounded-[2px] font-mono text-[11px] uppercase tracking-wider flex items-center gap-1.5 transition-colors ${
              activeTab === 'creative'
                ? 'bg-[#00f59b] text-[#09090b] font-bold'
                : 'bg-white/[0.04] text-muted hover:text-white'
            }`}
          >
            <Clapperboard className="w-3.5 h-3.5" />
            <span>Reels</span>
            <span className={`text-[9px] px-1 rounded ${activeTab === 'creative' ? 'bg-black/20 text-black' : 'bg-white/10 text-white/70'}`}>
              {content.creative.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('skills')}
            className={`px-3 py-1.5 rounded-[2px] font-mono text-[11px] uppercase tracking-wider flex items-center gap-1.5 transition-colors ${
              activeTab === 'skills'
                ? 'bg-[#00f59b] text-[#09090b] font-bold'
                : 'bg-white/[0.04] text-muted hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Skills</span>
            <span className={`text-[9px] px-1 rounded ${activeTab === 'skills' ? 'bg-black/20 text-black' : 'bg-white/10 text-white/70'}`}>
              {content.skills.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('academic')}
            className={`px-3 py-1.5 rounded-[2px] font-mono text-[11px] uppercase tracking-wider flex items-center gap-1.5 transition-colors ${
              activeTab === 'academic'
                ? 'bg-[#00f59b] text-[#09090b] font-bold'
                : 'bg-white/[0.04] text-muted hover:text-white'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Certs</span>
            <span className={`text-[9px] px-1 rounded ${activeTab === 'academic' ? 'bg-black/20 text-black' : 'bg-white/10 text-white/70'}`}>
              {content.certifications.length}
            </span>
          </button>
        </div>
      </div>

      {/* =================================================================
          MAIN ADMIN WORKSPACE: SIDEBAR TABS + CONTENT
          ================================================================= */}
      <div className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Desktop Sidebar Nav (>= 1024px) */}
        <aside className="hidden lg:block lg:col-span-3 space-y-1.5">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted block mb-3 px-3">
            Management Modules
          </span>

          <button
            onClick={() => {
              setActiveTab('templates');
              setIsEditingThemeWorkspace(false);
            }}
            className={`w-full px-4 py-3 rounded-[2px] font-mono text-xs uppercase tracking-wider flex items-center justify-between transition-colors text-left ${
              activeTab === 'templates'
                ? 'bg-white/10 text-white font-bold border-l-2 border-[#00f59b]'
                : 'text-muted hover:text-white hover:bg-white/[0.03]'
            }`}
          >
            <div className="flex items-center gap-3">
              <LayoutTemplate className="w-4 h-4 text-[#00f59b]" />
              <span>Theme Gallery &amp; Studio</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#00f59b]/20 text-[#00f59b] font-mono">
              3 Themes
            </span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full px-4 py-3 rounded-[2px] font-mono text-xs uppercase tracking-wider flex items-center gap-3 transition-colors text-left ${
              activeTab === 'profile'
                ? 'bg-white/10 text-white font-bold border-l-2 border-[#00f59b]'
                : 'text-muted hover:text-white hover:bg-white/[0.03]'
            }`}
          >
            <Settings className="w-4 h-4 text-[#00f59b]" />
            <span>Profile &amp; Hero</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`w-full px-4 py-3 rounded-[2px] font-mono text-xs uppercase tracking-wider flex items-center justify-between transition-colors text-left ${
              activeTab === 'projects'
                ? 'bg-white/10 text-white font-bold border-l-2 border-[#00f59b]'
                : 'text-muted hover:text-white hover:bg-white/[0.03]'
            }`}
          >
            <div className="flex items-center gap-3">
              <FolderGit2 className="w-4 h-4 text-[#00f59b]" />
              <span>Projects Studio</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white font-mono">
              {content.projects.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('creative')}
            className={`w-full px-4 py-3 rounded-[2px] font-mono text-xs uppercase tracking-wider flex items-center justify-between transition-colors text-left ${
              activeTab === 'creative'
                ? 'bg-white/10 text-white font-bold border-l-2 border-[#00f59b]'
                : 'text-muted hover:text-white hover:bg-white/[0.03]'
            }`}
          >
            <div className="flex items-center gap-3">
              <Clapperboard className="w-4 h-4 text-[#00f59b]" />
              <span>J.GAZE_ Reels</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white font-mono">
              {content.creative.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('skills')}
            className={`w-full px-4 py-3 rounded-[2px] font-mono text-xs uppercase tracking-wider flex items-center justify-between transition-colors text-left ${
              activeTab === 'skills'
                ? 'bg-white/10 text-white font-bold border-l-2 border-[#00f59b]'
                : 'text-muted hover:text-white hover:bg-white/[0.03]'
            }`}
          >
            <div className="flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-[#00f59b]" />
              <span>Skills &amp; Stack</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white font-mono">
              {content.skills.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('academic')}
            className={`w-full px-4 py-3 rounded-[2px] font-mono text-xs uppercase tracking-wider flex items-center justify-between transition-colors text-left ${
              activeTab === 'academic'
                ? 'bg-white/10 text-white font-bold border-l-2 border-[#00f59b]'
                : 'text-muted hover:text-white hover:bg-white/[0.03]'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-[#00f59b]" />
            <span>Education &amp; Certs</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white font-mono">
              {content.certifications.length}
            </span>
          </button>
        </aside>

        {/* Content Pane */}
        <main className="lg:col-span-9 space-y-8">
          {/* =================================================================
              TAB 0: THEME GALLERY & DEDICATED WORKSPACE
              ================================================================= */}
          {activeTab === 'templates' && (
            <div className="space-y-8">
              
              {/* -------------------------------------------------------------
                  VIEW A: THEME SELECTION GALLERY (WITH VISUAL PHOTOS)
                  ------------------------------------------------------------- */}
              {!isEditingThemeWorkspace ? (
                <div className="space-y-6">
                  {/* Gallery Intro Banner */}
                  <div className="p-6 sm:p-8 bg-white/[0.02] border border-white/[0.08] rounded-[4px] space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h2 className="type-h2 font-black uppercase text-white flex items-center gap-2.5">
                          <LayoutTemplate className="w-6 h-6 text-[#00f59b]" />
                          <span>Choose Your Portfolio Theme</span>
                        </h2>
                        <p className="font-mono text-xs text-muted pt-1">
                          Review preview photos for each theme below. Choose a theme to enter its dedicated management studio, customize photos, colors, and content, or set it as the live public default.
                        </p>
                      </div>

                      <div className="flex items-center gap-2 font-mono text-xs bg-black/60 px-3.5 py-2 rounded border border-white/15 whitespace-nowrap">
                        <span className="text-muted">Live Public Default:</span>
                        <span className="text-[#00f59b] font-black uppercase">{currentTemplates.activeTemplate}</span>
                      </div>
                    </div>
                  </div>

                  {/* 3 High-Impact Visual Theme Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* THEME 1: SYNTAX */}
                    <div className="bg-[#0c0c10] border border-white/10 hover:border-[#00f59b]/60 rounded-[6px] overflow-hidden flex flex-col justify-between transition-all duration-300 group shadow-lg">
                      <div>
                        {/* Theme Photo / Mockup Banner */}
                        <div className="relative aspect-[16/10] w-full bg-black overflow-hidden border-b border-white/10">
                          <Image
                            src="/images/templates/preview-syntax.png"
                            alt="Syntax Theme Preview"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-[#00f59b]/50 font-mono text-[9px] font-bold text-[#00f59b] uppercase tracking-widest">
                            CYBER MONOSPACE
                          </div>
                          {currentTemplates.activeTemplate === 'syntax' && (
                            <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-[#00f59b] text-black font-mono text-[9px] font-black uppercase tracking-wider flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>LIVE DEFAULT</span>
                            </div>
                          )}
                        </div>

                        {/* Description & Specs */}
                        <div className="p-5 space-y-3">
                          <div className="flex items-center gap-2 font-mono text-base font-bold text-white">
                            <Terminal className="w-4 h-4 text-[#00f59b]" />
                            <span>Syntax</span>
                          </div>
                          <p className="font-mono text-xs text-muted leading-relaxed">
                            A high-precision developer terminal theme featuring green CRT telemetry, monospace typography, and framed dossier layout.
                          </p>
                          <div className="pt-2 flex flex-wrap gap-1.5 font-mono text-[10px]">
                            <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-white/70">CRT Grid</span>
                            <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-white/70">CLI Accents</span>
                            <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-white/70">Dossier Viewfinder</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="p-5 pt-0 space-y-2">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedTemplateToEdit('syntax');
                            setIsEditingThemeWorkspace(true);
                          }}
                          className="w-full py-2.5 bg-white/10 hover:bg-[#00f59b] text-white hover:text-black font-mono text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2"
                        >
                          <Sliders className="w-3.5 h-3.5" />
                          <span>Manage &amp; Customize Theme</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleSetActiveTemplate('syntax')}
                          className={`w-full py-1.5 font-mono text-[10px] uppercase tracking-wider rounded transition-colors ${
                            currentTemplates.activeTemplate === 'syntax'
                              ? 'bg-[#00f59b]/20 text-[#00f59b] border border-[#00f59b]/40 font-bold'
                              : 'text-muted hover:text-white border border-white/10'
                          }`}
                        >
                          {currentTemplates.activeTemplate === 'syntax' ? '✓ Currently Live Default' : 'Set as Live Public Theme'}
                        </button>
                      </div>
                    </div>

                    {/* THEME 2: SPIDER-TECH */}
                    <div className="bg-[#0c0c10] border border-white/10 hover:border-[#c40c24]/80 rounded-[6px] overflow-hidden flex flex-col justify-between transition-all duration-300 group shadow-lg">
                      <div>
                        {/* Theme Photo / Mockup Banner */}
                        <div className="relative aspect-[16/10] w-full bg-black overflow-hidden border-b border-white/10">
                          <Image
                            src="/images/templates/preview-spider.png"
                            alt="Spider-Tech Theme Preview"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-[#c40c24]/60 font-mono text-[9px] font-bold text-[#c40c24] uppercase tracking-widest">
                            SPIDER-MAN UNIVERSE
                          </div>
                          {currentTemplates.activeTemplate === 'fuel' && (
                            <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-[#c40c24] text-white font-mono text-[9px] font-black uppercase tracking-wider flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>LIVE DEFAULT</span>
                            </div>
                          )}
                        </div>

                        {/* Description & Specs */}
                        <div className="p-5 space-y-3">
                          <div className="flex items-center gap-2 font-mono text-base font-bold text-white">
                            <span>🕷️</span>
                            <span>Spider-Tech</span>
                          </div>
                          <p className="font-mono text-xs text-muted leading-relaxed">
                            Spider-Man Sci-Fi Universe with crawling hardware cursor, hanging Spider-Man at the navbar, and pure white click-to-shoot webs.
                          </p>
                          <div className="pt-2 flex flex-wrap gap-1.5 font-mono text-[10px]">
                            <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-white/70">Slingshot Spidey</span>
                            <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-white/70">Dark Suit Red</span>
                            <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-white/70">White Web Canvas</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="p-5 pt-0 space-y-2">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedTemplateToEdit('spiderTech');
                            setIsEditingThemeWorkspace(true);
                          }}
                          className="w-full py-2.5 bg-white/10 hover:bg-[#c40c24] text-white font-mono text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2"
                        >
                          <Sliders className="w-3.5 h-3.5" />
                          <span>Manage &amp; Customize Theme</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleSetActiveTemplate('fuel')}
                          className={`w-full py-1.5 font-mono text-[10px] uppercase tracking-wider rounded transition-colors ${
                            currentTemplates.activeTemplate === 'fuel'
                              ? 'bg-[#c40c24]/20 text-[#c40c24] border border-[#c40c24]/50 font-bold'
                              : 'text-muted hover:text-white border border-white/10'
                          }`}
                        >
                          {currentTemplates.activeTemplate === 'fuel' ? '✓ Currently Live Default' : 'Set as Live Public Theme'}
                        </button>
                      </div>
                    </div>

                    {/* THEME 3: ERIC COLE */}
                    <div className="bg-[#0c0c10] border border-white/10 hover:border-white/60 rounded-[6px] overflow-hidden flex flex-col justify-between transition-all duration-300 group shadow-lg">
                      <div>
                        {/* Theme Photo / Mockup Banner */}
                        <div className="relative aspect-[16/10] w-full bg-black overflow-hidden border-b border-white/10">
                          <Image
                            src="/images/templates/preview-eric-cole.png"
                            alt="Eric Cole Theme Preview"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-white/40 font-mono text-[9px] font-bold text-white uppercase tracking-widest">
                            RETRO CRT EDITORIAL
                          </div>
                          {currentTemplates.activeTemplate === 'eric-cole' && (
                            <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-white text-black font-mono text-[9px] font-black uppercase tracking-wider flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>LIVE DEFAULT</span>
                            </div>
                          )}
                        </div>

                        {/* Description & Specs */}
                        <div className="p-5 space-y-3">
                          <div className="flex items-center gap-2 font-mono text-base font-bold text-white">
                            <Tv className="w-4 h-4 text-white" />
                            <span>Eric Cole</span>
                          </div>
                          <p className="font-mono text-xs text-muted leading-relaxed">
                            Vintage 90s CRT TV with horizontal video reel playback, old money serif typography, and tactile channel switcher.
                          </p>
                          <div className="pt-2 flex flex-wrap gap-1.5 font-mono text-[10px]">
                            <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-white/70">CRT TV Reel</span>
                            <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-white/70">Editorial Serif</span>
                            <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-white/70">Filmstrip Morph</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="p-5 pt-0 space-y-2">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedTemplateToEdit('ericCole');
                            setIsEditingThemeWorkspace(true);
                          }}
                          className="w-full py-2.5 bg-white/10 hover:bg-white text-white hover:text-black font-mono text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2"
                        >
                          <Sliders className="w-3.5 h-3.5" />
                          <span>Manage &amp; Customize Theme</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleSetActiveTemplate('eric-cole')}
                          className={`w-full py-1.5 font-mono text-[10px] uppercase tracking-wider rounded transition-colors ${
                            currentTemplates.activeTemplate === 'eric-cole'
                              ? 'bg-white/20 text-white border border-white/50 font-bold'
                              : 'text-muted hover:text-white border border-white/10'
                          }`}
                        >
                          {currentTemplates.activeTemplate === 'eric-cole' ? '✓ Currently Live Default' : 'Set as Live Public Theme'}
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              ) : (

                /* -------------------------------------------------------------
                   VIEW B: DEDICATED THEME MANAGEMENT WORKSPACE
                   ------------------------------------------------------------- */
                <div className="space-y-6">
                  {/* Dedicated Workspace Header Bar */}
                  <div className="p-5 bg-white/[0.03] border border-white/15 rounded-[4px] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setIsEditingThemeWorkspace(false)}
                        className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider rounded flex items-center gap-1.5 transition-colors"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Back to Gallery</span>
                      </button>

                      <div className="h-4 w-px bg-white/20" />

                      <div className="flex items-center gap-2 font-mono text-sm font-bold text-white">
                        {selectedTemplateToEdit === 'syntax' && <Terminal className="w-4 h-4 text-[#00f59b]" />}
                        {selectedTemplateToEdit === 'spiderTech' && <span>🕷️</span>}
                        {selectedTemplateToEdit === 'ericCole' && <Tv className="w-4 h-4 text-white" />}
                        <span>
                          Managing: {selectedTemplateToEdit === 'syntax' ? 'Syntax (Cyber Terminal)' : selectedTemplateToEdit === 'spiderTech' ? 'Spider-Tech (Spider-Man Universe)' : 'Eric Cole (Vintage CRT TV)'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 font-mono text-xs">
                      {/* Set as Default Button */}
                      <button
                        type="button"
                        onClick={() => {
                          const modeMap = {
                            syntax: 'syntax' as const,
                            spiderTech: 'fuel' as const,
                            ericCole: 'eric-cole' as const,
                          };
                          handleSetActiveTemplate(modeMap[selectedTemplateToEdit]);
                        }}
                        className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded border border-white/20 transition-colors"
                      >
                        Set as Active Public Theme
                      </button>

                      {/* Live Preview Button */}
                      <Link
                        href="/"
                        target="_blank"
                        className="px-3 py-1.5 bg-[#00f59b]/20 text-[#00f59b] border border-[#00f59b]/50 rounded flex items-center gap-1.5 hover:bg-[#00f59b]/30 transition-colors font-bold"
                      >
                        <span>Preview Live</span>
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* =========================================================
                      1. EDIT SYNTAX THEME
                      ========================================================= */}
                  {selectedTemplateToEdit === 'syntax' && (
                    <div className="p-6 sm:p-8 bg-[#0c0c10] border border-[#00f59b]/40 rounded-[4px] space-y-6 shadow-xl">
                      <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <div>
                          <h3 className="text-xl font-bold uppercase font-mono text-white flex items-center gap-2">
                            <Terminal className="w-5 h-5 text-[#00f59b]" />
                            <span>Syntax Theme Customizer</span>
                          </h3>
                          <p className="text-xs font-mono text-muted">Configure color palette, typography headlines, and CRT telemetry.</p>
                        </div>
                      </div>

                      {/* Theme Photo / Dossier Management */}
                      <div className="p-4 bg-black/60 border border-white/10 rounded space-y-3">
                        <span className="font-mono text-xs uppercase text-white font-bold flex items-center gap-2">
                          <FileImage className="w-4 h-4 text-[#00f59b]" />
                          <span>Syntax Dossier Profile Photo</span>
                        </span>
                        <div className="flex flex-col sm:flex-row items-center gap-5">
                          <div className="relative w-44 h-28 bg-black rounded border border-white/20 overflow-hidden">
                            <Image
                              src={content.site.portraitImage || '/images/jeet-syntax.png'}
                              alt="Syntax Profile Preview"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="space-y-2 flex-1 font-mono text-xs">
                            <p className="text-muted">
                              Natural 1024:612 aspect ratio recommended for the dossier viewfinder frame.
                            </p>
                            <label className="inline-flex items-center gap-2 px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white rounded cursor-pointer transition-colors uppercase text-[11px] font-bold">
                              <Upload className="w-3.5 h-3.5 text-[#00f59b]" />
                              <span>Upload New Photo</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const url = await uploadFile(file, 'portrait');
                                    if (url) updateSiteField('portraitImage', url);
                                  }
                                }}
                              />
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Core Content Form */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block font-mono text-xs uppercase text-muted">Accent Neon Color</label>
                          <div className="flex items-center gap-3">
                            <input
                              type="color"
                              value={currentTemplates.syntax.accentColor || '#00f59b'}
                              onChange={(e) => handleUpdateTemplate('syntax', 'accentColor', e.target.value)}
                              className="w-10 h-10 rounded border border-white/20 bg-black cursor-pointer"
                            />
                            <input
                              type="text"
                              value={currentTemplates.syntax.accentColor || '#00f59b'}
                              onChange={(e) => handleUpdateTemplate('syntax', 'accentColor', e.target.value)}
                              className="flex-1 px-3 py-2 bg-black border border-white/15 rounded font-mono text-sm text-white"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="block font-mono text-xs uppercase text-muted">Badge / Category Tag</label>
                          <input
                            type="text"
                            value={currentTemplates.syntax.badge || 'HACKER / CYBER MONOSPACE'}
                            onChange={(e) => handleUpdateTemplate('syntax', 'badge', e.target.value)}
                            className="w-full px-3 py-2.5 bg-black border border-white/15 rounded font-mono text-sm text-white focus:outline-none focus:border-[#00f59b]"
                          />
                        </div>

                        <div className="space-y-2 sm:col-span-2">
                          <label className="block font-mono text-xs uppercase text-muted">Hero Main Headline</label>
                          <input
                            type="text"
                            value={currentTemplates.syntax.heroHeadline || 'I BUILD SYSTEMS. I FRAME STORIES.'}
                            onChange={(e) => handleUpdateTemplate('syntax', 'heroHeadline', e.target.value)}
                            className="w-full px-3 py-2.5 bg-black border border-white/15 rounded font-mono text-sm text-white focus:outline-none focus:border-[#00f59b]"
                          />
                        </div>

                        <div className="space-y-2 sm:col-span-2">
                          <label className="block font-mono text-xs uppercase text-muted">Hero Subtitle</label>
                          <input
                            type="text"
                            value={currentTemplates.syntax.heroSubtitle || 'Full-Stack Developer & Visual Creator (@j.gaze_)'}
                            onChange={(e) => handleUpdateTemplate('syntax', 'heroSubtitle', e.target.value)}
                            className="w-full px-3 py-2.5 bg-black border border-white/15 rounded font-mono text-sm text-white focus:outline-none focus:border-[#00f59b]"
                          />
                        </div>

                        <div className="space-y-2 sm:col-span-2">
                          <label className="block font-mono text-xs uppercase text-muted">Infinite Marquee Ticker Strip</label>
                          <input
                            type="text"
                            value={currentTemplates.syntax.marqueeText || 'REACT 19 • NEXT.JS 14 • FASTAPI • PYTHON • AI INTEGRATION • TAILWIND CSS'}
                            onChange={(e) => handleUpdateTemplate('syntax', 'marqueeText', e.target.value)}
                            className="w-full px-3 py-2.5 bg-black border border-white/15 rounded font-mono text-sm text-white focus:outline-none focus:border-[#00f59b]"
                          />
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/10 flex flex-wrap gap-6 font-mono text-xs">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={currentTemplates.syntax.showScanlines}
                            onChange={(e) => handleUpdateTemplate('syntax', 'showScanlines', e.target.checked)}
                            className="accent-[#00f59b] w-4 h-4 rounded"
                          />
                          <span>CRT Scanlines Effect</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={currentTemplates.syntax.customCursor}
                            onChange={(e) => handleUpdateTemplate('syntax', 'customCursor', e.target.checked)}
                            className="accent-[#00f59b] w-4 h-4 rounded"
                          />
                          <span>Custom Cyber Pointer Cursor</span>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* =========================================================
                      2. EDIT SPIDER-TECH THEME
                      ========================================================= */}
                  {selectedTemplateToEdit === 'spiderTech' && (
                    <div className="p-6 sm:p-8 bg-[#0c0c10] border border-[#c40c24]/60 rounded-[4px] space-y-6 shadow-xl">
                      <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <div>
                          <h3 className="text-xl font-bold uppercase font-mono text-white flex items-center gap-2">
                            <span>🕷️</span>
                            <span>Spider-Tech Theme Customizer</span>
                          </h3>
                          <p className="text-xs font-mono text-muted">Spider-Man Sci-Fi Universe, Web Physics, and Character Controls</p>
                        </div>
                      </div>

                      {/* Character & Visual Assets Card */}
                      <div className="p-4 bg-black/60 border border-white/10 rounded space-y-3">
                        <span className="font-mono text-xs uppercase text-white font-bold flex items-center gap-2">
                          <FileImage className="w-4 h-4 text-[#c40c24]" />
                          <span>Hanging Spider-Man Character Asset</span>
                        </span>
                        <div className="flex flex-col sm:flex-row items-center gap-5">
                          <div className="relative w-24 h-36 bg-black rounded border border-white/20 overflow-hidden flex items-center justify-center">
                            <Image
                              src="/images/spiderman-body.png"
                              alt="Hanging Spidey Character"
                              fill
                              className="object-contain"
                            />
                          </div>
                          <div className="space-y-2 flex-1 font-mono text-xs">
                            <p className="text-muted">
                              Interactive hanging &amp; slingshot Spider-Man asset suspended from the navbar with twisted braided web physics.
                            </p>
                            <label className="inline-flex items-center gap-2 px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white rounded cursor-pointer transition-colors uppercase text-[11px] font-bold">
                              <Upload className="w-3.5 h-3.5 text-[#c40c24]" />
                              <span>Upload New Spidey Cutout (.png)</span>
                              <input
                                type="file"
                                accept="image/png"
                                className="hidden"
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    await uploadFile(file, 'image');
                                  }
                                }}
                              />
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Content & Taglines */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block font-mono text-xs uppercase text-muted">Spider-Man Suit Crimson Color</label>
                          <div className="flex items-center gap-3">
                            <input
                              type="color"
                              value={currentTemplates.spiderTech.suitColor || '#c40c24'}
                              onChange={(e) => handleUpdateTemplate('spiderTech', 'suitColor', e.target.value)}
                              className="w-10 h-10 rounded border border-white/20 bg-black cursor-pointer"
                            />
                            <input
                              type="text"
                              value={currentTemplates.spiderTech.suitColor || '#c40c24'}
                              onChange={(e) => handleUpdateTemplate('spiderTech', 'suitColor', e.target.value)}
                              className="flex-1 px-3 py-2 bg-black border border-white/15 rounded font-mono text-sm text-white"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="block font-mono text-xs uppercase text-muted">Hero Main Name</label>
                          <input
                            type="text"
                            value={currentTemplates.spiderTech.heroTitle || 'JEET RAKHOLIYA'}
                            onChange={(e) => handleUpdateTemplate('spiderTech', 'heroTitle', e.target.value)}
                            className="w-full px-3 py-2.5 bg-black border border-white/15 rounded font-mono text-sm text-white focus:outline-none focus:border-[#c40c24]"
                          />
                        </div>

                        <div className="space-y-2 sm:col-span-2">
                          <label className="block font-mono text-xs uppercase text-muted">Spider-Man Tagline</label>
                          <input
                            type="text"
                            value={currentTemplates.spiderTech.heroTagline || 'WHO ARE YOU UNDER THE MASK?'}
                            onChange={(e) => handleUpdateTemplate('spiderTech', 'heroTagline', e.target.value)}
                            className="w-full px-3 py-2.5 bg-black border border-white/15 rounded font-mono text-sm text-white focus:outline-none focus:border-[#c40c24]"
                          />
                        </div>

                        <div className="space-y-2 sm:col-span-2">
                          <label className="block font-mono text-xs uppercase text-muted">Hero Mission Statement</label>
                          <textarea
                            rows={2}
                            value={currentTemplates.spiderTech.heroMission}
                            onChange={(e) => handleUpdateTemplate('spiderTech', 'heroMission', e.target.value)}
                            className="w-full px-3 py-2.5 bg-black border border-white/15 rounded font-mono text-xs text-white focus:outline-none focus:border-[#c40c24]"
                          />
                        </div>

                        <div className="space-y-2 sm:col-span-2">
                          <label className="block font-mono text-xs uppercase text-muted">Classified Manifesto Protocol Quote</label>
                          <textarea
                            rows={2}
                            value={currentTemplates.spiderTech.manifesto}
                            onChange={(e) => handleUpdateTemplate('spiderTech', 'manifesto', e.target.value)}
                            className="w-full px-3 py-2.5 bg-black border border-white/15 rounded font-mono text-xs text-white focus:outline-none focus:border-[#c40c24]"
                          />
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/10 flex flex-wrap gap-6 font-mono text-xs">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={currentTemplates.spiderTech.hangingSpiderman}
                            onChange={(e) => handleUpdateTemplate('spiderTech', 'hangingSpiderman', e.target.checked)}
                            className="accent-[#c40c24] w-4 h-4 rounded"
                          />
                          <span>Hanging &amp; Slingshot Spider-Man at Navbar</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={currentTemplates.spiderTech.interactiveWebs}
                            onChange={(e) => handleUpdateTemplate('spiderTech', 'interactiveWebs', e.target.checked)}
                            className="accent-[#c40c24] w-4 h-4 rounded"
                          />
                          <span>Click-to-Shoot Pure White Web Physics</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={currentTemplates.spiderTech.backgroundWebNets}
                            onChange={(e) => handleUpdateTemplate('spiderTech', 'backgroundWebNets', e.target.checked)}
                            className="accent-[#c40c24] w-4 h-4 rounded"
                          />
                          <span>Background Spider Web Nets</span>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* =========================================================
                      3. EDIT ERIC COLE THEME
                      ========================================================= */}
                  {selectedTemplateToEdit === 'ericCole' && (
                    <div className="p-6 sm:p-8 bg-[#0c0c10] border border-white/50 rounded-[4px] space-y-6 shadow-xl">
                      <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <div>
                          <h3 className="text-xl font-bold uppercase font-mono text-white flex items-center gap-2">
                            <Tv className="w-5 h-5 text-white" />
                            <span>Eric Cole Theme Customizer</span>
                          </h3>
                          <p className="text-xs font-mono text-muted">90s Vintage CRT TV, Video Reel Playback, and Editorial Typography</p>
                        </div>
                      </div>

                      {/* Video Reel Upload & TV Media */}
                      <div className="p-4 bg-black/60 border border-white/10 rounded space-y-3">
                        <span className="font-mono text-xs uppercase text-white font-bold flex items-center gap-2">
                          <Film className="w-4 h-4 text-white" />
                          <span>Vintage CRT TV Video Reel Showcase</span>
                        </span>
                        <div className="flex flex-col sm:flex-row items-center gap-5">
                          <div className="relative w-44 h-28 bg-black rounded border border-white/20 overflow-hidden flex items-center justify-center">
                            <video
                              src={currentTemplates.ericCole.videoSrc || '/images/IMG_1935.MOV'}
                              muted
                              loop
                              playsInline
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="space-y-2 flex-1 font-mono text-xs">
                            <p className="text-muted">
                              Video plays inside the retro TV bezel on scroll. Support for .mp4, .mov, and .webm formats.
                            </p>
                            <div className="flex items-center gap-3">
                              <input
                                type="text"
                                value={currentTemplates.ericCole.videoSrc || '/images/IMG_1935.MOV'}
                                onChange={(e) => handleUpdateTemplate('ericCole', 'videoSrc', e.target.value)}
                                className="flex-1 px-3 py-2 bg-black border border-white/15 rounded text-white"
                              />
                              <label className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white rounded cursor-pointer transition-colors uppercase text-[11px] font-bold whitespace-nowrap flex items-center gap-1.5">
                                <Upload className="w-3.5 h-3.5" />
                                <span>Upload Reel</span>
                                <input
                                  type="file"
                                  accept="video/*"
                                  className="hidden"
                                  onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      const url = await uploadFile(file, 'video');
                                      if (url) handleUpdateTemplate('ericCole', 'videoSrc', url);
                                    }
                                  }}
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Content Headlines */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block font-mono text-xs uppercase text-muted">Hero Title</label>
                          <input
                            type="text"
                            value={currentTemplates.ericCole.heroTitle || 'ERIC COLE'}
                            onChange={(e) => handleUpdateTemplate('ericCole', 'heroTitle', e.target.value)}
                            className="w-full px-3 py-2.5 bg-black border border-white/15 rounded font-mono text-sm text-white focus:outline-none focus:border-white"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block font-mono text-xs uppercase text-muted">TV Channel Label</label>
                          <input
                            type="text"
                            value={currentTemplates.ericCole.tvChannel || 'CH 04 • J.GAZE_ EDITORIAL'}
                            onChange={(e) => handleUpdateTemplate('ericCole', 'tvChannel', e.target.value)}
                            className="w-full px-3 py-2.5 bg-black border border-white/15 rounded font-mono text-sm text-white focus:outline-none focus:border-white"
                          />
                        </div>

                        <div className="space-y-2 sm:col-span-2">
                          <label className="block font-mono text-xs uppercase text-muted">Editorial Subtitle</label>
                          <input
                            type="text"
                            value={currentTemplates.ericCole.heroSubtitle || 'Editorial Portfolio of Jeet Rakholiya'}
                            onChange={(e) => handleUpdateTemplate('ericCole', 'heroSubtitle', e.target.value)}
                            className="w-full px-3 py-2.5 bg-black border border-white/15 rounded font-mono text-sm text-white focus:outline-none focus:border-white"
                          />
                        </div>

                        <div className="space-y-2 sm:col-span-2">
                          <label className="block font-mono text-xs uppercase text-muted">Editorial About Headline</label>
                          <input
                            type="text"
                            value={currentTemplates.ericCole.aboutHeadline || 'A Visual Storyteller in Code and Cinematography'}
                            onChange={(e) => handleUpdateTemplate('ericCole', 'aboutHeadline', e.target.value)}
                            className="w-full px-3 py-2.5 bg-black border border-white/15 rounded font-mono text-sm text-white focus:outline-none focus:border-white"
                          />
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/10 flex flex-wrap gap-6 font-mono text-xs">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={currentTemplates.ericCole.soundEnabled}
                            onChange={(e) => handleUpdateTemplate('ericCole', 'soundEnabled', e.target.checked)}
                            className="accent-white w-4 h-4 rounded"
                          />
                          <span>TV Audio &amp; CRT Static Sound Control</span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* =================================================================
              TAB 1: PROFILE & HERO CONFIGURATION
              ================================================================= */}
          {activeTab === 'profile' && (
            <div className="p-6 sm:p-8 bg-white/[0.02] border border-white/[0.08] rounded-[2px] space-y-6">
              <div className="border-b border-white/[0.08] pb-4">
                <h2 className="type-h2 font-black uppercase text-white">Hero &amp; Profile Setup</h2>
                <p className="font-mono text-xs text-muted">Update names, headline titles, quotes, and portrait photo.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block font-mono text-xs uppercase text-muted">Full Name</label>
                  <input
                    type="text"
                    value={content.site.name}
                    onChange={(e) => updateSiteField('name', e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#0c0c10] border border-white/15 rounded-[2px] font-mono text-sm text-white focus:outline-none focus:border-[#00f59b]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-mono text-xs uppercase text-muted">Creative Brand Tag</label>
                  <input
                    type="text"
                    value={content.site.creativeName}
                    onChange={(e) => updateSiteField('creativeName', e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#0c0c10] border border-white/15 rounded-[2px] font-mono text-sm text-white focus:outline-none focus:border-[#00f59b]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-mono text-xs uppercase text-muted">Availability Status</label>
                  <input
                    type="text"
                    value={content.site.availability}
                    onChange={(e) => updateSiteField('availability', e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#0c0c10] border border-white/15 rounded-[2px] font-mono text-sm text-white focus:outline-none focus:border-[#00f59b]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-mono text-xs uppercase text-muted">Location</label>
                  <input
                    type="text"
                    value={content.site.location}
                    onChange={(e) => updateSiteField('location', e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#0c0c10] border border-white/15 rounded-[2px] font-mono text-sm text-white focus:outline-none focus:border-[#00f59b]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-mono text-xs uppercase text-muted">Hero Timeline Tag (Left)</label>
                  <input
                    type="text"
                    value={content.site.heroTimeline}
                    onChange={(e) => updateSiteField('heroTimeline', e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#0c0c10] border border-white/15 rounded-[2px] font-mono text-sm text-white focus:outline-none focus:border-[#00f59b]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-mono text-xs uppercase text-muted">Hero Academic Standing</label>
                  <input
                    type="text"
                    value={content.site.heroAcademic}
                    onChange={(e) => updateSiteField('heroAcademic', e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#0c0c10] border border-white/15 rounded-[2px] font-mono text-sm text-white focus:outline-none focus:border-[#00f59b]"
                  />
                </div>
              </div>

              {/* Philosophy Quote */}
              <div className="space-y-2">
                <label className="block font-mono text-xs uppercase text-muted">Hero Philosophy Quote (Framed Glass Box)</label>
                <textarea
                  rows={3}
                  value={content.site.heroQuote}
                  onChange={(e) => updateSiteField('heroQuote', e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#0c0c10] border border-white/15 rounded-[2px] font-mono text-xs text-white focus:outline-none focus:border-[#00f59b]"
                />
              </div>

              {/* Subtitle */}
              <div className="space-y-2">
                <label className="block font-mono text-xs uppercase text-muted">Hero Subtitle Under Name</label>
                <input
                  type="text"
                  value={content.site.heroSubtitle}
                  onChange={(e) => updateSiteField('heroSubtitle', e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#0c0c10] border border-white/15 rounded-[2px] font-mono text-sm text-white focus:outline-none focus:border-[#00f59b]"
                />
              </div>

              {/* Portrait Photo Upload */}
              <div className="pt-4 border-t border-white/[0.08] space-y-4">
                <label className="block font-mono text-xs uppercase text-white font-bold">
                  Background Portrait Photo
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-[#0c0c10] border border-white/10 rounded-[2px]">
                  <div className="relative w-40 h-24 sm:w-48 sm:h-28 overflow-hidden rounded-[2px] bg-black border border-white/15">
                    <Image
                      src={content.site.portraitImage || '/images/jeet-syntax.png'}
                      alt="Portrait preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-2 flex-1">
                    <span className="font-mono text-xs text-muted block">
                      Current Path: <code className="text-white/90">{content.site.portraitImage}</code>
                    </span>
                    <label className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider rounded-[2px] cursor-pointer transition-colors">
                      <Upload className="w-3.5 h-3.5 text-[#00f59b]" />
                      <span>Upload New Portrait (.png / .jpg)</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = await uploadFile(file, 'portrait');
                            if (url) updateSiteField('portraitImage', url);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Contact Links */}
              <div className="pt-4 border-t border-white/[0.08] space-y-4">
                <span className="block font-mono text-xs uppercase text-white font-bold">Social &amp; Contact Coordinates</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-muted mb-1">Email</label>
                    <input
                      type="email"
                      value={content.site.email}
                      onChange={(e) => updateSiteField('email', e.target.value)}
                      className="w-full px-3 py-2 bg-[#0c0c10] border border-white/15 rounded-[2px] font-mono text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-muted mb-1">GitHub URL</label>
                    <input
                      type="text"
                      value={content.site.github}
                      onChange={(e) => updateSiteField('github', e.target.value)}
                      className="w-full px-3 py-2 bg-[#0c0c10] border border-white/15 rounded-[2px] font-mono text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-muted mb-1">LinkedIn URL</label>
                    <input
                      type="text"
                      value={content.site.linkedin}
                      onChange={(e) => updateSiteField('linkedin', e.target.value)}
                      className="w-full px-3 py-2 bg-[#0c0c10] border border-white/15 rounded-[2px] font-mono text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-muted mb-1">Instagram URL</label>
                    <input
                      type="text"
                      value={content.site.instagram}
                      onChange={(e) => updateSiteField('instagram', e.target.value)}
                      className="w-full px-3 py-2 bg-[#0c0c10] border border-white/15 rounded-[2px] font-mono text-xs text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =================================================================
              TAB 2: PROJECTS STUDIO
              ================================================================= */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between p-6 bg-white/[0.02] border border-white/[0.08] rounded-[2px]">
                <div>
                  <h2 className="type-h2 font-black uppercase text-white">Projects Studio</h2>
                  <p className="font-mono text-xs text-muted">Manage showcase software artifacts &amp; technical builds.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingProject({
                      id: `project-${Date.now()}`,
                      slug: `project-${Date.now()}`,
                      title: 'New Project',
                      category: 'Full-Stack',
                      shortDescription: 'Brief summary of the build',
                      description: 'Comprehensive project architecture details.',
                      year: '2025',
                      technologies: ['React', 'Next.js', 'TypeScript'],
                      status: 'Live Deployment',
                      featured: true,
                      order: content.projects.length + 1,
                    });
                    setIsNewProject(true);
                  }}
                  className="px-4 py-2 bg-[#00f59b] text-[#09090b] font-bold font-mono text-xs uppercase tracking-wider rounded-[2px] hover:bg-[#00f59b]/90 transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Project</span>
                </button>
              </div>

              {/* Projects List Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.projects.map((proj, idx) => (
                  <div
                    key={proj.id || idx}
                    className="p-5 bg-white/[0.02] border border-white/[0.08] hover:border-white/20 rounded-[2px] space-y-4 flex flex-col justify-between transition-all"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between font-mono text-[10px] text-muted uppercase">
                        <span className="text-[#00f59b]">{proj.category}</span>
                        <span>{proj.year}</span>
                      </div>
                      <h3 className="type-h3 font-bold text-white">{proj.title}</h3>
                      <p className="font-mono text-xs text-muted line-clamp-2">{proj.description}</p>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-white/[0.06]">
                      <div className="flex flex-wrap gap-1.5">
                        {proj.technologies?.slice(0, 4).map((tech) => (
                          <span key={tech} className="px-2 py-0.5 bg-white/[0.05] rounded-[2px] font-mono text-[10px] text-white/80">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-2">
                        <button
                          onClick={() => {
                            setEditingProject({ ...proj });
                            setIsNewProject(false);
                          }}
                          className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider rounded-[2px] transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete project "${proj.title}"?`)) {
                              setContent({
                                ...content,
                                projects: content.projects.filter((_, i) => i !== idx),
                              });
                            }
                          }}
                          className="p-1.5 text-muted hover:text-red-400 transition-colors"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =================================================================
              TAB 3: CREATIVE / J.GAZE_ REELS
              ================================================================= */}
          {activeTab === 'creative' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between p-6 bg-white/[0.02] border border-white/[0.08] rounded-[2px]">
                <div>
                  <h2 className="type-h2 font-black uppercase text-white">J.GAZE_ Video Reels</h2>
                  <p className="font-mono text-xs text-muted">Manage cinematography showcases, video URLs, and metadata.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingCreative({
                      id: `creative-${Date.now()}`,
                      title: 'Cinematic Reel',
                      category: 'Cinematography',
                      description: 'Visual cinematography project showcasing composition and grading.',
                      year: '2025',
                      role: 'Director & Editor',
                      orientation: 'vertical',
                      video: '/videos/reel-1.mp4',
                      featured: true,
                      order: content.creative.length + 1,
                    });
                    setIsNewCreative(true);
                  }}
                  className="px-4 py-2 bg-[#00f59b] text-[#09090b] font-bold font-mono text-xs uppercase tracking-wider rounded-[2px] hover:bg-[#00f59b]/90 transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Reel</span>
                </button>
              </div>

              {/* Creative Works Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {content.creative.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="p-4 bg-white/[0.02] border border-white/[0.08] hover:border-white/20 rounded-[2px] space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="relative aspect-[9/14] w-full rounded-[2px] overflow-hidden bg-black border border-white/10 flex items-center justify-center">
                        {item.video ? (
                          <video
                            src={item.video}
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Film className="w-8 h-8 text-muted" />
                        )}
                        <span className="absolute top-2 right-2 px-1.5 py-0.5 bg-black/80 font-mono text-[9px] text-[#00f59b] rounded">
                          {item.orientation || '9:16'}
                        </span>
                      </div>

                      <h3 className="font-mono text-sm font-bold text-white truncate">{item.title}</h3>
                      <p className="font-mono text-[11px] text-muted line-clamp-2">{item.description}</p>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/[0.06]">
                      <button
                        onClick={() => {
                          setEditingCreative({ ...item });
                          setIsNewCreative(false);
                        }}
                        className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase rounded-[2px] transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete creative reel "${item.title}"?`)) {
                            setContent({
                              ...content,
                              creative: content.creative.filter((_, i) => i !== idx),
                            });
                          }
                        }}
                        className="p-1 text-muted hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =================================================================
              TAB 4: SKILLS & TECHNICAL ARSENAL
              ================================================================= */}
          {activeTab === 'skills' && (
            <div className="p-6 sm:p-8 bg-white/[0.02] border border-white/[0.08] rounded-[2px] space-y-6">
              <div className="border-b border-white/[0.08] pb-4">
                <h2 className="type-h2 font-black uppercase text-white">Skills &amp; Technical Stack</h2>
                <p className="font-mono text-xs text-muted">Add, categorize, and organize programming languages and frameworks.</p>
              </div>

              {/* Add New Skill Form */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end p-4 bg-[#0c0c10] border border-white/10 rounded-[2px]">
                <div className="sm:col-span-4 space-y-1">
                  <label className="block font-mono text-[10px] uppercase text-muted">Skill / Technology</label>
                  <input
                    type="text"
                    value={newSkillName}
                    onChange={(e) => setNewSkillName(e.target.value)}
                    placeholder="e.g. Next.js, Python, Tailwind"
                    className="w-full px-3 py-2 bg-black border border-white/15 rounded-[2px] font-mono text-xs text-white"
                  />
                </div>

                <div className="sm:col-span-4 space-y-1">
                  <label className="block font-mono text-[10px] uppercase text-muted">Category</label>
                  <select
                    value={newSkillCategory}
                    onChange={(e) => setNewSkillCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-black border border-white/15 rounded-[2px] font-mono text-xs text-white"
                  >
                    <option value="Programming">Programming</option>
                    <option value="Frameworks &amp; Libraries">Frameworks &amp; Libraries</option>
                    <option value="Databases">Databases &amp; Cloud</option>
                    <option value="Tools">Tools</option>
                    <option value="Creative Skills">Creative &amp; Cinematography</option>
                  </select>
                </div>

                <div className="sm:col-span-2 flex items-center gap-2 pb-2">
                  <label className="font-mono text-xs text-muted flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newSkillHighlight}
                      onChange={(e) => setNewSkillHighlight(e.target.checked)}
                      className="accent-[#00f59b]"
                    />
                    <span>Highlight</span>
                  </label>
                </div>

                <div className="sm:col-span-2">
                  <button
                    onClick={() => {
                      if (!newSkillName.trim()) return;
                      const newSkill: SkillItem = {
                        name: newSkillName.trim(),
                        category: newSkillCategory as any,
                        highlight: newSkillHighlight,
                      };
                      setContent({
                        ...content,
                        skills: [...content.skills, newSkill],
                      });
                      setNewSkillName('');
                    }}
                    className="w-full py-2 bg-[#00f59b] text-black font-bold font-mono text-xs uppercase rounded-[2px] hover:bg-[#00f59b]/90 transition-colors"
                  >
                    + Add Skill
                  </button>
                </div>
              </div>

              {/* Existing Skills Chip Matrix */}
              <div className="space-y-4 pt-4">
                <span className="block font-mono text-xs uppercase text-muted">Current Stack ({content.skills.length})</span>
                <div className="flex flex-wrap gap-2">
                  {content.skills.map((skill, idx) => (
                    <div
                      key={`${skill.name}-${idx}`}
                      className={`px-3 py-1.5 rounded-[2px] font-mono text-xs flex items-center gap-2 border ${
                        skill.highlight
                          ? 'bg-[#00f59b]/10 text-[#00f59b] border-[#00f59b]/30'
                          : 'bg-white/5 text-white/80 border-white/10'
                      }`}
                    >
                      <span>{skill.name}</span>
                      <button
                        onClick={() => {
                          setContent({
                            ...content,
                            skills: content.skills.filter((_, i) => i !== idx),
                          });
                        }}
                        className="text-white/40 hover:text-red-400 transition-colors"
                        title="Remove"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* =================================================================
              TAB 5: EDUCATION & CERTIFICATIONS
              ================================================================= */}
          {activeTab === 'academic' && (
            <div className="p-6 sm:p-8 bg-white/[0.02] border border-white/[0.08] rounded-[2px] space-y-6">
              <div className="border-b border-white/[0.08] pb-4">
                <h2 className="type-h2 font-black uppercase text-white">Education &amp; Credentials</h2>
                <p className="font-mono text-xs text-muted">Manage academic background and verified credentials.</p>
              </div>

              {/* Add Certification */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end p-4 bg-[#0c0c10] border border-white/10 rounded-[2px]">
                <div className="sm:col-span-5 space-y-1">
                  <label className="block font-mono text-[10px] uppercase text-muted">Certification Title</label>
                  <input
                    type="text"
                    value={newCertTitle}
                    onChange={(e) => setNewCertTitle(e.target.value)}
                    placeholder="e.g. Meta Front-End Developer"
                    className="w-full px-3 py-2 bg-black border border-white/15 rounded-[2px] font-mono text-xs text-white"
                  />
                </div>

                <div className="sm:col-span-3 space-y-1">
                  <label className="block font-mono text-[10px] uppercase text-muted">Issuer</label>
                  <input
                    type="text"
                    value={newCertIssuer}
                    onChange={(e) => setNewCertIssuer(e.target.value)}
                    placeholder="e.g. Coursera / Google"
                    className="w-full px-3 py-2 bg-black border border-white/15 rounded-[2px] font-mono text-xs text-white"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="block font-mono text-[10px] uppercase text-muted">Year</label>
                  <input
                    type="text"
                    value={newCertDate}
                    onChange={(e) => setNewCertDate(e.target.value)}
                    placeholder="2025"
                    className="w-full px-3 py-2 bg-black border border-white/15 rounded-[2px] font-mono text-xs text-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <button
                    onClick={() => {
                      if (!newCertTitle.trim()) return;
                      const newCert: Certification = {
                        id: `cert-${Date.now()}`,
                        title: newCertTitle.trim(),
                        issuer: newCertIssuer.trim(),
                        issueDate: newCertDate.trim(),
                      };
                      setContent({
                        ...content,
                        certifications: [...content.certifications, newCert],
                      });
                      setNewCertTitle('');
                    }}
                    className="w-full py-2 bg-[#00f59b] text-black font-bold font-mono text-xs uppercase rounded-[2px] hover:bg-[#00f59b]/90 transition-colors"
                  >
                    + Add Cert
                  </button>
                </div>
              </div>

              {/* Certifications List */}
              <div className="space-y-3 pt-4">
                <span className="block font-mono text-xs uppercase text-muted">Verified Certifications ({content.certifications.length})</span>
                {content.certifications.map((cert, idx) => (
                  <div
                    key={cert.id || idx}
                    className="p-3 bg-white/5 border border-white/10 rounded-[2px] flex items-center justify-between font-mono text-xs"
                  >
                    <div>
                      <span className="font-bold text-white block">{cert.title}</span>
                      <span className="text-muted text-[11px]">{cert.issuer} &bull; {cert.issueDate}</span>
                    </div>
                    <button
                      onClick={() => {
                        setContent({
                          ...content,
                          certifications: content.certifications.filter((_, i) => i !== idx),
                        });
                      }}
                      className="p-1 text-muted hover:text-red-400 transition-colors"
                      title="Remove Certificate"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* =================================================================
          PROJECT EDIT / CREATE MODAL (MOBILE RESPONSIVE FULL-SCREEN SHEET)
          ================================================================= */}
      {editingProject && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
          <div className="w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-2xl bg-[#000000] border-0 sm:border border-white/20 sm:rounded-[4px] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="sticky top-0 bg-[#000000]/98 border-b border-white/10 px-5 sm:px-8 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-[#00f59b]" />
                <h3 className="type-h3 font-bold uppercase text-white text-sm sm:text-base">
                  {isNewProject ? 'Create New Project' : 'Edit Project Details'}
                </h3>
              </div>
              <button
                onClick={() => setEditingProject(null)}
                className="w-8 h-8 rounded bg-white/5 hover:bg-white/10 text-muted hover:text-white flex items-center justify-center font-mono text-lg transition-colors"
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-4 font-mono text-xs">
              <div className="space-y-1">
                <label className="text-muted uppercase text-[11px] font-semibold">Project Title</label>
                <input
                  type="text"
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-black border border-white/15 rounded text-white text-sm focus:outline-none focus:border-[#00f59b]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-muted uppercase text-[11px]">Category</label>
                  <input
                    type="text"
                    value={editingProject.category}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    className="w-full px-3.5 py-2 bg-black border border-white/15 rounded text-white text-sm focus:outline-none focus:border-[#00f59b]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-muted uppercase text-[11px]">Year</label>
                  <input
                    type="text"
                    value={editingProject.year}
                    onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                    className="w-full px-3.5 py-2 bg-black border border-white/15 rounded text-white text-sm focus:outline-none focus:border-[#00f59b]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-muted uppercase text-[11px]">Short Summary (Marquee / Card)</label>
                <input
                  type="text"
                  value={editingProject.shortDescription}
                  onChange={(e) => setEditingProject({ ...editingProject, shortDescription: e.target.value })}
                  className="w-full px-3.5 py-2 bg-black border border-white/15 rounded text-white text-sm focus:outline-none focus:border-[#00f59b]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-muted uppercase text-[11px]">Full Description</label>
                <textarea
                  rows={3}
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full px-3.5 py-2 bg-black border border-white/15 rounded text-white text-sm focus:outline-none focus:border-[#00f59b]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-muted uppercase text-[11px]">Live Deployment URL</label>
                  <input
                    type="text"
                    value={editingProject.liveUrl || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                    placeholder="https://example.com"
                    className="w-full px-3.5 py-2 bg-black border border-white/15 rounded text-white text-sm focus:outline-none focus:border-[#00f59b]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-muted uppercase text-[11px]">GitHub Source URL</label>
                  <input
                    type="text"
                    value={editingProject.githubUrl || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-3.5 py-2 bg-black border border-white/15 rounded text-white text-sm focus:outline-none focus:border-[#00f59b]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-muted uppercase text-[11px]">Technologies (comma separated)</label>
                <input
                  type="text"
                  value={editingProject.technologies?.join(', ') || ''}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      technologies: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                    })
                  }
                  className="w-full px-3.5 py-2 bg-black border border-white/15 rounded text-white text-sm focus:outline-none focus:border-[#00f59b]"
                />
              </div>
            </div>

            {/* Modal Sticky Footer */}
            <div className="sticky bottom-0 bg-[#000000]/98 border-t border-white/10 px-5 sm:px-8 py-3.5 flex items-center justify-end gap-3 pb-safe z-10">
              <button
                onClick={() => setEditingProject(null)}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase rounded transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (isNewProject) {
                    setContent({
                      ...content,
                      projects: [...content.projects, editingProject],
                    });
                  } else {
                    setContent({
                      ...content,
                      projects: content.projects.map((p) => (p.id === editingProject.id ? editingProject : p)),
                    });
                  }
                  setEditingProject(null);
                  showNotification('success', 'Project updated in workspace!');
                }}
                className="px-5 py-2.5 bg-[#00f59b] text-black font-mono text-xs font-bold uppercase rounded hover:bg-[#00f59b]/90 transition-colors"
              >
                Save Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================
          CREATIVE EDIT / CREATE MODAL (MOBILE RESPONSIVE FULL-SCREEN SHEET)
          ================================================================= */}
      {editingCreative && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
          <div className="w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-xl bg-[#000000] border-0 sm:border border-white/20 sm:rounded-[4px] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="sticky top-0 bg-[#000000]/98 border-b border-white/10 px-5 sm:px-8 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <Clapperboard className="w-4 h-4 text-[#00f59b]" />
                <h3 className="type-h3 font-bold uppercase text-white text-sm sm:text-base">
                  {isNewCreative ? 'Add Creative Reel' : 'Edit Reel Metadata'}
                </h3>
              </div>
              <button
                onClick={() => setEditingCreative(null)}
                className="w-8 h-8 rounded bg-white/5 hover:bg-white/10 text-muted hover:text-white flex items-center justify-center font-mono text-lg transition-colors"
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-4 font-mono text-xs">
              <div className="space-y-1">
                <label className="text-muted uppercase text-[11px] font-semibold">Reel Title</label>
                <input
                  type="text"
                  value={editingCreative.title}
                  onChange={(e) => setEditingCreative({ ...editingCreative, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-black border border-white/15 rounded text-white text-sm focus:outline-none focus:border-[#00f59b]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-muted uppercase text-[11px]">Description</label>
                <textarea
                  rows={2}
                  value={editingCreative.description}
                  onChange={(e) => setEditingCreative({ ...editingCreative, description: e.target.value })}
                  className="w-full px-3.5 py-2 bg-black border border-white/15 rounded text-white text-sm focus:outline-none focus:border-[#00f59b]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-muted uppercase text-[11px]">Video File URL / Path</label>
                <input
                  type="text"
                  value={editingCreative.video || ''}
                  onChange={(e) => setEditingCreative({ ...editingCreative, video: e.target.value })}
                  placeholder="/videos/reel-1.mp4"
                  className="w-full px-3.5 py-2 bg-black border border-white/15 rounded text-white text-sm focus:outline-none focus:border-[#00f59b]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-muted uppercase text-[11px]">Orientation</label>
                  <select
                    value={editingCreative.orientation || 'vertical'}
                    onChange={(e) => setEditingCreative({ ...editingCreative, orientation: e.target.value as any })}
                    className="w-full px-3.5 py-2 bg-black border border-white/15 rounded text-white text-sm focus:outline-none focus:border-[#00f59b]"
                  >
                    <option value="vertical">Vertical (9:16)</option>
                    <option value="landscape">Landscape (16:9)</option>
                    <option value="square">Square (1:1)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-muted uppercase text-[11px]">Role</label>
                  <input
                    type="text"
                    value={Array.isArray(editingCreative.role) ? editingCreative.role.join(', ') : editingCreative.role || ''}
                    onChange={(e) => setEditingCreative({ ...editingCreative, role: e.target.value })}
                    className="w-full px-3.5 py-2 bg-black border border-white/15 rounded text-white text-sm focus:outline-none focus:border-[#00f59b]"
                  />
                </div>
              </div>
            </div>

            {/* Modal Sticky Footer */}
            <div className="sticky bottom-0 bg-[#000000]/98 border-t border-white/10 px-5 sm:px-8 py-3.5 flex items-center justify-end gap-3 pb-safe z-10">
              <button
                onClick={() => setEditingCreative(null)}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase rounded transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (isNewCreative) {
                    setContent({
                      ...content,
                      creative: [...content.creative, editingCreative],
                    });
                  } else {
                    setContent({
                      ...content,
                      creative: content.creative.map((c) => (c.id === editingCreative.id ? editingCreative : c)),
                    });
                  }
                  setEditingCreative(null);
                  showNotification('success', 'Creative reel updated in workspace!');
                }}
                className="px-5 py-2.5 bg-[#00f59b] text-black font-mono text-xs font-bold uppercase rounded hover:bg-[#00f59b]/90 transition-colors"
              >
                Save Reel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================
          MOBILE STICKY BOTTOM ACTION BAR (< 1024px)
          ================================================================= */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-[#0c0c10]/95 backdrop-blur-xl border-t border-white/10 px-4 py-3 z-40 pb-safe flex items-center justify-between shadow-[0_-8px_30px_rgba(0,0,0,0.9)]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00f59b] animate-pulse" />
          <span className="font-mono text-[11px] uppercase tracking-wider text-white font-semibold">
            {activeTab.toUpperCase()}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            target="_blank"
            className="px-3 py-1.5 bg-white/10 text-white rounded font-mono text-[11px] uppercase tracking-wider flex items-center gap-1"
          >
            <span>Live Site</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>

          <button
            onClick={handleSaveAll}
            disabled={saving}
            className="px-4 py-1.5 bg-[#00f59b] text-black font-mono text-[11px] font-bold uppercase tracking-wider rounded flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,245,155,0.3)] disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saving ? 'Saving...' : 'Save Live'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
