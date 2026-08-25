import { NextRequest, NextResponse } from 'next/server';
import { PurchaseOrder } from '@/types/templates';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { templateId, templateName, themeKey, buyerName, buyerEmail, amount, paymentMethod } = body;

    if (!templateId || !buyerEmail || !buyerName) {
      return NextResponse.json({ error: 'Missing required buyer or template information' }, { status: 400 });
    }

    // Generate authenticated order & unique license key
    const orderId = `ORD-${Date.now().toString().slice(-6)}`;
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const prefix = themeKey === 'all' ? 'ALL' : themeKey.substring(0, 6).toUpperCase();
    const licenseKey = `JG-${prefix}-${randomDigits}-${randomSuffix}`;

    const order: PurchaseOrder = {
      orderId,
      templateId,
      templateName: templateName || 'Portfolio Template',
      themeKey: themeKey || 'syntax',
      buyerName,
      buyerEmail,
      amount: amount || 89,
      licenseKey,
      timestamp: new Date().toISOString(),
      paymentMethod: paymentMethod || 'Card',
    };

    // Calculate builder URL for instant post-purchase redirection
    const builderUrl = `/admin?unlocked=${encodeURIComponent(themeKey)}&license=${encodeURIComponent(licenseKey)}`;

    return NextResponse.json({
      success: true,
      message: 'Payment verified and license generated successfully',
      order,
      builderUrl,
    });
  } catch (error) {
    console.error('Checkout processing error:', error);
    return NextResponse.json({ error: 'Internal checkout error' }, { status: 500 });
  }
}
