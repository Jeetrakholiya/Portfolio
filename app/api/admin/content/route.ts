import { NextRequest, NextResponse } from 'next/server';
import { getContent, saveContent, updateSection, AppContent } from '@/lib/content-service';
import { isAuthenticated } from '@/lib/admin-auth';

export async function GET() {
  try {
    const content = await getContent();
    return NextResponse.json({ success: true, data: content });
  } catch (error) {
    console.error('Failed to get content:', error);
    return NextResponse.json({ error: 'Failed to retrieve content' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await isAuthenticated();
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { section, data, content } = body;

    if (content) {
      const saved = await saveContent(content as AppContent);
      if (saved) {
        return NextResponse.json({ success: true, message: 'Full content updated successfully' });
      }
      return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
    }

    if (section && data) {
      const saved = await updateSection(section as keyof AppContent, data);
      if (saved) {
        return NextResponse.json({ success: true, message: `Section '${section}' updated successfully` });
      }
      return NextResponse.json({ error: `Failed to update section '${section}'` }, { status: 500 });
    }

    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  } catch (error) {
    console.error('Content update error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
