import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { PurchaseOrder } from '@/types/templates';

const ordersFilePath = path.join(process.cwd(), 'data', 'orders.json');

async function getSavedOrders(): Promise<PurchaseOrder[]> {
  try {
    if (fs.existsSync(ordersFilePath)) {
      const data = await fs.promises.readFile(ordersFilePath, 'utf-8');
      return JSON.parse(data) as PurchaseOrder[];
    }
  } catch (err) {
    console.error('Failed to read orders.json:', err);
  }
  return [];
}

async function saveOrder(order: PurchaseOrder): Promise<boolean> {
  try {
    const orders = await getSavedOrders();
    orders.unshift(order);
    const dir = path.dirname(ordersFilePath);
    if (!fs.existsSync(dir)) {
      await fs.promises.mkdir(dir, { recursive: true });
    }
    await fs.promises.writeFile(ordersFilePath, JSON.stringify(orders, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Failed to save order to orders.json:', err);
    return false;
  }
}

export async function GET() {
  const orders = await getSavedOrders();
  return NextResponse.json({ success: true, orders });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { templateId, templateName, themeKey, buyerName, buyerEmail, amount, paymentMethod, upiRefId } = body;

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
      paymentMethod: paymentMethod || 'UPI',
    };

    // Save order permanently to data/orders.json
    await saveOrder(order);

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
