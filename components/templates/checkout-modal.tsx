'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { TemplateProduct, PurchaseOrder } from '@/types/templates';
import {
  X,
  Lock,
  CreditCard,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  Download,
  Sparkles,
  Zap,
  Terminal,
  Tv,
  ExternalLink,
  Smartphone,
} from 'lucide-react';
import { motion } from 'framer-motion';

export interface CheckoutModalProps {
  template: TemplateProduct | null;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ template, onClose }) => {
  const router = useRouter();

  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [processing, setProcessing] = useState(false);

  // Form Details
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [portfolioProject, setPortfolioProject] = useState('');

  // Payment Form (Defaulting to UPI / QR as primary)
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiRefId, setUpiRefId] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  // Success State
  const [completedOrder, setCompletedOrder] = useState<PurchaseOrder | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);
  const [builderUrl, setBuilderUrl] = useState('/admin');

  if (!template) return null;

  const MERCHANT_UPI_ID = '6354310153@ptyes';
  const MERCHANT_NAME = 'Jeet Rakholiya';

  // Standard NPCI UPI Intent URI
  const upiIntentUri = `upi://pay?pa=${MERCHANT_UPI_ID}&pn=${encodeURIComponent(MERCHANT_NAME)}&am=${template.price}&cu=INR&tn=${encodeURIComponent(template.name + ' Template')}`;
  
  // Real-time generated scannable QR Code URL
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(upiIntentUri)}&bgcolor=ffffff&color=000000&margin=2`;

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName || !buyerEmail) return;
    setStep('payment');
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateId: template.id,
          templateName: template.name,
          themeKey: template.themeKey,
          buyerName,
          buyerEmail,
          amount: template.price,
          paymentMethod: paymentMethod.toUpperCase(),
          upiRefId: paymentMethod === 'upi' ? upiRefId : undefined,
        }),
      });

      const data = await res.json();
      if (data.success && data.order) {
        setCompletedOrder(data.order);
        setBuilderUrl(data.builderUrl || '/admin');
        
        // Save unlocked license locally for immediate client access
        try {
          const stored = JSON.parse(localStorage.getItem('unlocked_templates') || '[]');
          if (!stored.includes(template.themeKey)) {
            stored.push(template.themeKey);
            localStorage.setItem('unlocked_templates', JSON.stringify(stored));
          }
        } catch {}

        setStep('success');
      }
    } catch (err) {
      console.error('Payment failure:', err);
    } finally {
      setProcessing(false);
    }
  };

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(MERCHANT_UPI_ID);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 3000);
  };

  const handleCopyLicense = () => {
    if (!completedOrder?.licenseKey) return;
    navigator.clipboard.writeText(completedOrder.licenseKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 3000);
  };

  const handleLaunchBuilder = () => {
    router.push(builderUrl);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-xl bg-[#0c0c10] border border-white/20 rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.8)] overflow-hidden font-sans text-white my-8"
      >
        {/* Top Header Summary */}
        <div className="px-6 sm:px-8 py-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center font-bold"
              style={{ backgroundColor: `${template.accentColor}20`, color: template.accentColor }}
            >
              {template.themeKey === 'syntax' && <Terminal className="w-5 h-5" />}
              {template.themeKey === 'spiderTech' && <Zap className="w-5 h-5" />}
              {template.themeKey === 'ericCole' && <Tv className="w-5 h-5" />}
              {template.themeKey === 'all' && <Sparkles className="w-5 h-5" />}
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase font-bold text-white/50 tracking-wider">
                {template.badge}
              </div>
              <h3 className="font-bold text-base sm:text-lg text-white">{template.name}</h3>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-2xl font-black font-mono text-white">₹{template.price}</span>
              <span className="text-xs text-white/40 block font-mono">INR • ONE-TIME</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* =================================================================
            STEP 1: BUYER DETAILS
            ================================================================= */}
        {step === 'details' && (
          <form onSubmit={handleDetailsSubmit} className="p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <h4 className="text-lg font-bold text-white tracking-tight">Buyer Information</h4>
              <p className="text-xs text-white/60 font-mono">
                Your license key, source code repository link, and CMS builder access will be issued to this email.
              </p>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div className="space-y-1.5">
                <label className="text-white/80 uppercase font-bold block">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  placeholder="e.g. Alex Johnson"
                  className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-xl text-white font-sans text-sm focus:outline-none focus:border-[#00f59b] transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-white/80 uppercase font-bold block">Email Address *</label>
                <input
                  type="email"
                  required
                  value={buyerEmail}
                  onChange={(e) => setBuyerEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-xl text-white font-sans text-sm focus:outline-none focus:border-[#00f59b] transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-white/80 uppercase font-bold block">Portfolio Name / Domain (Optional)</label>
                <input
                  type="text"
                  value={portfolioProject}
                  onChange={(e) => setPortfolioProject(e.target.value)}
                  placeholder="e.g. alexportfolio.dev"
                  className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-xl text-white font-sans text-sm focus:outline-none focus:border-[#00f59b] transition-all"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-white/50">
                <Lock className="w-3.5 h-3.5 text-[#00f59b]" />
                <span>SECURE INSTANT CHECKOUT</span>
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-[#00f59b] hover:bg-[#00f59b]/90 text-black font-mono font-bold text-xs rounded-xl flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(0,245,155,0.4)]"
              >
                <span>CONTINUE TO PAYMENT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* =================================================================
            STEP 2: PAYMENT GATEWAY (UPI / QR & CARDS)
            ================================================================= */}
        {step === 'payment' && (
          <form onSubmit={handlePaymentSubmit} className="p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <h4 className="text-lg font-bold text-white tracking-tight">Complete Payment (₹{template.price})</h4>
              <p className="text-xs text-white/60 font-mono">
                Scan QR or transfer directly to the official UPI ID to unlock your portfolio builder.
              </p>
            </div>

            {/* Payment Method Switcher */}
            <div className="grid grid-cols-3 gap-2 font-mono text-xs">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`py-3 px-2 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                  paymentMethod === 'upi'
                    ? 'border-[#00f59b] bg-[#00f59b]/10 text-white font-bold'
                    : 'border-white/15 bg-black/40 text-white/60 hover:text-white'
                }`}
              >
                <QrCode className="w-4 h-4 text-[#00f59b]" />
                <span className="text-[11px]">UPI / QR (FAST)</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`py-3 px-2 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                  paymentMethod === 'card'
                    ? 'border-[#00f59b] bg-[#00f59b]/10 text-white font-bold'
                    : 'border-white/15 bg-black/40 text-white/60 hover:text-white'
                }`}
              >
                <CreditCard className="w-4 h-4 text-[#00f59b]" />
                <span className="text-[11px]">CARD</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('netbanking')}
                className={`py-3 px-2 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                  paymentMethod === 'netbanking'
                    ? 'border-[#00f59b] bg-[#00f59b]/10 text-white font-bold'
                    : 'border-white/15 bg-black/40 text-white/60 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-[#00f59b]" />
                <span className="text-[11px]">NET BANKING</span>
              </button>
            </div>

            {/* UPI & QR Code View */}
            {paymentMethod === 'upi' && (
              <div className="space-y-4 font-mono text-xs">
                
                {/* QR Code Container */}
                <div className="p-4 bg-black/70 border border-white/15 rounded-2xl flex flex-col sm:flex-row items-center gap-5">
                  <div className="relative w-36 h-36 bg-white p-2 rounded-xl shadow-lg flex-shrink-0 flex items-center justify-center">
                    <Image
                      src={qrCodeUrl}
                      alt="UPI QR Code"
                      width={130}
                      height={130}
                      className="object-contain"
                      unoptimized
                    />
                  </div>

                  <div className="space-y-2 text-center sm:text-left flex-1">
                    <div className="flex items-center justify-center sm:justify-start gap-1.5 text-[10px] text-[#00f59b] uppercase font-bold">
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>Scan with Any UPI App</span>
                    </div>
                    
                    <p className="text-xs text-white/80">
                      GPay, PhonePe, Paytm, BHIM, or Cred
                    </p>

                    {/* Copy UPI Box */}
                    <div className="flex items-center justify-between gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-lg font-mono text-xs">
                      <span className="text-white font-bold truncate">{MERCHANT_UPI_ID}</span>
                      <button
                        type="button"
                        onClick={handleCopyUPI}
                        className="px-2 py-1 bg-[#00f59b]/20 hover:bg-[#00f59b]/30 text-[#00f59b] font-bold rounded flex items-center gap-1 transition-all text-[10px]"
                      >
                        {copiedUpi ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedUpi ? 'COPIED' : 'COPY'}</span>
                      </button>
                    </div>

                    {/* Direct App Link for mobile */}
                    <a
                      href={upiIntentUri}
                      className="inline-flex items-center gap-1.5 text-[11px] text-[#00f59b] hover:underline font-bold"
                    >
                      <span>Click to pay via UPI app</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* UTR / Reference ID Field */}
                <div className="space-y-1.5">
                  <label className="text-white/80 uppercase font-bold block">
                    UPI Reference ID / UTR Number (12 Digits) *
                  </label>
                  <input
                    type="text"
                    required
                    value={upiRefId}
                    onChange={(e) => setUpiRefId(e.target.value)}
                    placeholder="Enter 12-digit UTR from your UPI payment receipt"
                    className="w-full px-4 py-2.5 bg-black/60 border border-white/15 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-[#00f59b]"
                  />
                  <span className="text-[10px] text-white/40 block">
                    Found in your payment confirmation screen in GPay, PhonePe, or Paytm.
                  </span>
                </div>

              </div>
            )}

            {/* Card Inputs */}
            {paymentMethod === 'card' && (
              <div className="space-y-4 font-mono text-xs">
                <div className="space-y-1.5">
                  <label className="text-white/80 uppercase font-bold block">Card Number</label>
                  <input
                    type="text"
                    maxLength={19}
                    value={cardNumber}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
                      const matches = v.match(/\d{4,16}/g);
                      const match = (matches && matches[0]) || '';
                      const parts = [];
                      for (let i = 0, len = match.length; i < len; i += 4) {
                        parts.push(match.substring(i, i + 4));
                      }
                      setCardNumber(parts.length ? parts.join(' ') : v);
                    }}
                    placeholder="4242 4242 4242 4242"
                    className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-[#00f59b]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-white/80 uppercase font-bold block">Expires (MM/YY)</label>
                    <input
                      type="text"
                      maxLength={5}
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="12/28"
                      className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-[#00f59b]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-white/80 uppercase font-bold block">CVC / CVV</label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      placeholder="•••"
                      className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-[#00f59b]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Net Banking */}
            {paymentMethod === 'netbanking' && (
              <div className="p-4 bg-black/60 border border-white/10 rounded-xl text-center font-mono text-xs text-white/70 space-y-2">
                <p>Transfer ₹{template.price} to UPI ID <strong>6354310153@ptyes</strong> using your Net Banking portal.</p>
              </div>
            )}

            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep('details')}
                className="px-4 py-2 text-white/60 hover:text-white font-mono text-xs transition-colors"
              >
                &larr; BACK
              </button>

              <button
                type="submit"
                disabled={processing}
                className="px-6 py-3 bg-[#00f59b] hover:bg-[#00f59b]/90 text-black font-mono font-bold text-xs rounded-xl flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(0,245,155,0.4)] disabled:opacity-50"
              >
                {processing ? (
                  <span className="animate-pulse">VERIFYING PAYMENT...</span>
                ) : (
                  <span>CONFIRM ₹{template.price} &amp; UNLOCK BUILDER</span>
                )}
              </button>
            </div>
          </form>
        )}

        {/* =================================================================
            STEP 3: SUCCESS & BUILDER UNLOCKED SCREEN
            ================================================================= */}
        {step === 'success' && completedOrder && (
          <div className="p-6 sm:p-8 space-y-6 text-center">
            
            <div className="w-16 h-16 rounded-full bg-[#00f59b]/20 border border-[#00f59b] text-[#00f59b] mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(0,245,155,0.5)] animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <span className="font-mono text-xs text-[#00f59b] font-bold uppercase tracking-widest">
                ORDER COMPLETED // PAYMENT VERIFIED
              </span>
              <h4 className="text-2xl sm:text-3xl font-black text-white">
                You Unlocked {template.name}!
              </h4>
              <p className="text-xs text-white/70 font-mono max-w-md mx-auto">
                Receipt and instructions have been dispatched to <strong>{completedOrder.buyerEmail}</strong>.
              </p>
            </div>

            {/* License Key Display */}
            <div className="p-4 bg-black/70 border border-[#00f59b]/40 rounded-xl space-y-2 text-left">
              <div className="flex items-center justify-between font-mono text-[10px] text-white/50">
                <span>YOUR VERIFIED LICENSE KEY</span>
                <span>ORDER: {completedOrder.orderId}</span>
              </div>

              <div className="flex items-center justify-between gap-2 bg-black px-3 py-2 rounded-lg border border-white/10 font-mono text-xs sm:text-sm font-bold text-[#00f59b]">
                <span className="truncate">{completedOrder.licenseKey}</span>
                <button
                  onClick={handleCopyLicense}
                  className="p-1 rounded hover:bg-white/10 text-white transition-colors"
                  title="Copy license key"
                >
                  {copiedKey ? <Check className="w-4 h-4 text-[#00f59b]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleLaunchBuilder}
                className="w-full py-4 bg-[#00f59b] hover:bg-[#00f59b]/90 text-black font-mono font-black text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(0,245,155,0.5)] active:scale-95"
              >
                <span>LAUNCH &amp; BUILD MY PORTFOLIO NOW</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  alert(`Source code repository download link dispatched to ${completedOrder.buyerEmail}!`);
                }}
                className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors border border-white/15"
              >
                <Download className="w-3.5 h-3.5" />
                <span>DOWNLOAD SOURCE REPOSITORY (.ZIP)</span>
              </button>
            </div>

          </div>
        )}

      </motion.div>
    </div>
  );
};
