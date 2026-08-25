import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { isAuthenticated } from '@/lib/admin-auth';

export async function POST(req: NextRequest) {
  try {
    const auth = await isAuthenticated();
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const category = (formData.get('category') as string) || 'general'; // 'portrait', 'project', 'video', 'general'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_').toLowerCase();
    const ext = path.extname(originalName);
    const baseName = path.basename(originalName, ext);
    const uniqueName = `${baseName}_${Date.now()}${ext}`;

    let targetDir = path.join(process.cwd(), 'public', 'images');
    let publicUrlPrefix = '/images';

    if (category === 'video' || ['.mp4', '.mov', '.webm', '.m4v'].includes(ext)) {
      targetDir = path.join(process.cwd(), 'public', 'videos');
      publicUrlPrefix = '/videos';
    } else if (category === 'project') {
      targetDir = path.join(process.cwd(), 'public', 'images', 'projects');
      publicUrlPrefix = '/images/projects';
    }

    if (!fs.existsSync(targetDir)) {
      await fs.promises.mkdir(targetDir, { recursive: true });
    }

    const filePath = path.join(targetDir, uniqueName);
    await fs.promises.writeFile(filePath, buffer);

    const publicUrl = `${publicUrlPrefix}/${uniqueName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: uniqueName,
      size: file.size,
      message: 'File uploaded successfully',
    });
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
