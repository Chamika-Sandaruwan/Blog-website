import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '../../../lib/db';
import Post from '../../../lib/models/post.model';

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
 * GET /api/posts/my-posts
 * Fetches all posts created by the authenticated user
 */
export async function GET(request) {
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

    // Fetch user's posts with author information
    const posts = await Post.find({ author: decoded.userId })
      .populate('author', 'name email')
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      {
        message: 'User posts fetched successfully',
        posts,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Fetch user posts error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}