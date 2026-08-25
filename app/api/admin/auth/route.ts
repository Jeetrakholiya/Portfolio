import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword, createSessionToken, isAuthenticated, COOKIE_NAME } from '@/lib/admin-auth';

export async function GET() {
  const authenticated = await isAuthenticated();
  return NextResponse.json({ authenticated });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, password } = body;

    if (action === 'login') {
      if (!password || !verifyPassword(password)) {
        return NextResponse.json(
          { error: 'Invalid admin password. Please try again.' },
          { status: 401 }
        );
      }

      const token = createSessionToken();
      const response = NextResponse.json({ success: true, message: 'Authenticated successfully' });

      response.cookies.set({
        name: COOKIE_NAME,
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60, // 7 days
      });

      return response;
    }

    if (action === 'logout') {
      const response = NextResponse.json({ success: true, message: 'Logged out' });
      response.cookies.delete(COOKIE_NAME);
      return response;
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    console.error('Auth API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
