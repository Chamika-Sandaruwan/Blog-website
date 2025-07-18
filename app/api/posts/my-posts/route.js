import { connectDB } from '@/app/config/db';
import { Post } from '@/app/models';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    await connectDB();
    
    const query = category ? { category } : {};
    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .populate('author', 'name');

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}