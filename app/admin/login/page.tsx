'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Please enter the admin password');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push('/admin');
        router.refresh();
      } else {
        setError(data.error || 'Invalid password. Please try again.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] w-full flex flex-col justify-between p-4 sm:p-12 bg-[#09090b] text-[#f2f2f0]">
      {/* Top Bar */}
      <div className="w-full flex items-center justify-between font-mono text-xs text-muted border-b border-white/[0.08] pb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-white hover:text-[#00f59b] transition-colors uppercase tracking-widest text-[11px] sm:text-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Portfolio</span>
        </Link>
        <span className="uppercase tracking-wider text-[10px] sm:text-[11px] text-[#00f59b] font-medium">
          ● CMS Access
        </span>
      </div>

      {/* Center Box */}
      <div className="w-full max-w-md mx-auto my-auto py-6 sm:py-8">
        <div className="p-6 sm:p-10 bg-white/[0.02] border border-white/[0.12] rounded-[2px] shadow-2xl space-y-6">
          {/* Header */}
          <div className="space-y-2 border-b border-white/[0.08] pb-5 sm:pb-6">
            <div className="w-10 h-10 rounded-[2px] bg-white/[0.04] border border-white/15 flex items-center justify-center text-[#00f59b] mb-3 sm:mb-4">
              <Lock className="w-5 h-5" />
            </div>
            <h1 className="type-h2 font-black tracking-tight text-white uppercase text-xl sm:text-2xl">
              Admin Portal
            </h1>
            <p className="font-mono text-xs text-muted uppercase tracking-wider">
              Authenticate to manage portfolio content, media &amp; reels.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block font-mono text-xs uppercase tracking-widest text-white/80"
              >
                Master Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full px-4 py-3 bg-[#0c0c10] border border-white/15 rounded-[2px] text-white placeholder:text-muted/60 font-mono text-base sm:text-sm focus:outline-none focus:border-[#00f59b] transition-colors"
                autoFocus
              />
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs rounded-[2px]">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 sm:py-3.5 px-6 bg-[#00f59b] text-[#09090b] font-mono text-xs font-black uppercase tracking-widest rounded-[2px] hover:bg-[#00f59b]/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating...' : 'Unlock Admin Panel'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Footer Note */}
          <div className="pt-4 border-t border-white/[0.06] font-mono text-[10px] text-muted text-center uppercase tracking-wider">
            Password configured in <span className="text-white/80">.env.local</span>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="w-full font-mono text-[10px] text-muted text-center uppercase tracking-widest pt-4 border-t border-white/[0.08] pb-safe">
        Jeet Rakholiya &bull; J.GAZE_ Content Management System
      </div>
    </div>
  );
}
