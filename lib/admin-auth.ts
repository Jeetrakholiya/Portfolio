import crypto from 'crypto';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'admin_session_token';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const SECRET_KEY = process.env.ADMIN_SECRET_KEY || 'portfolio-j-gaze-secret-jwt-key-2026';

export function verifyPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function createSessionToken(): string {
  const timestamp = Date.now();
  const data = `${timestamp}:${SECRET_KEY}`;
  const hash = crypto.createHmac('sha256', SECRET_KEY).update(data).digest('hex');
  return Buffer.from(`${timestamp}:${hash}`).toString('base64');
}

export function verifySessionToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [timestampStr, hash] = decoded.split(':');
    const timestamp = parseInt(timestampStr, 10);

    if (isNaN(timestamp)) return false;

    // Check expiration: 7 days
    const maxAge = 7 * 24 * 60 * 60 * 1000;
    if (Date.now() - timestamp > maxAge) return false;

    const data = `${timestamp}:${SECRET_KEY}`;
    const expectedHash = crypto.createHmac('sha256', SECRET_KEY).update(data).digest('hex');

    return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(expectedHash));
  } catch {
    return false;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get(COOKIE_NAME);
  if (!sessionCookie || !sessionCookie.value) return false;
  return verifySessionToken(sessionCookie.value);
}

export { COOKIE_NAME };
