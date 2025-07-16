import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '../../lib/db';
import Post from '../../lib/models/post.model';
import User from '../../lib/models/user.model';

/**
 * Helper function to verify JWT token from cookies
 * @param {Request} request - The incoming request
 * @returns {Object|null} - Decoded token or null if invalid
 */
function verifyToken(request) {
  try {
    const token = request.cookies.get('token')?.value;
    if (!token) return null;
    
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
}

/**
 * GET /api/posts
 * Fetches all blog posts with author information
 */
export async function GET() {
  try {
    await dbConnect();

    // Fetch all posts with author information
    const posts = await Post.find({})
      .populate('author', 'name email')
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      {
        message: 'Posts fetched successfully',
        posts,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Fetch posts error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/posts
 * Creates a new blog post (requires authentication)
 */
export async function POST(request) {
  try {
    await dbConnect();

    // Verify authentication
    const decoded = verifyToken(request);
    if (!decoded) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      );
    }

    // Parse request body
    const { title, content, imageUrl } = await request.json();

    // Validate required fields
    if (!title || !content) {
      return NextResponse.json(
        { message: 'Title and content are required' },
        { status: 400 }
      );
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      + '-' + Date.now();

    // Check if slug already exists (unlikely but safe)
    const existingPost = await Post.findOne({ slug });
    if (existingPost) {
      return NextResponse.json(
        { message: 'Post with this title already exists' },
        { status: 409 }
      );
    }

    // Create new post
    const newPost = new Post({
      title: title.trim(),
      slug,
      content: content.trim(),
      imageUrl: imageUrl?.trim() || '',
      author: decoded.userId,
    });

    // Save post to database
    const savedPost = await newPost.save();

    // Populate author information
    await savedPost.populate('author', 'name email');

    return NextResponse.json(
      {
        message: 'Post created successfully',
        post: savedPost,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Create post error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { message: messages.join(', ') },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}