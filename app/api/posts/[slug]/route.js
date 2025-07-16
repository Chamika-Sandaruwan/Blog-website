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
 * GET /api/posts/[slug]
 * Fetches a single blog post by slug
 */
export async function GET(request, { params }) {
  try {
    await dbConnect();

    const { slug } = params;

    // Find post by slug with author information
    const post = await Post.findOne({ slug })
      .populate('author', 'name email')
      .lean();

    if (!post) {
      return NextResponse.json(
        { message: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: 'Post fetched successfully',
        post,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Fetch post error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/posts/[slug]
 * Updates a blog post by slug (requires authentication and ownership)
 */
export async function PUT(request, { params }) {
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

    const { slug } = params;
    const { title, content, imageUrl } = await request.json();

    // Validate required fields
    if (!title || !content) {
      return NextResponse.json(
        { message: 'Title and content are required' },
        { status: 400 }
      );
    }

    // Find the post
    const post = await Post.findOne({ slug });
    if (!post) {
      return NextResponse.json(
        { message: 'Post not found' },
        { status: 404 }
      );
    }

    // Check if user is the author
    if (post.author.toString() !== decoded.userId) {
      return NextResponse.json(
        { message: 'You can only edit your own posts' },
        { status: 403 }
      );
    }

    // Update post
    post.title = title.trim();
    post.content = content.trim();
    post.imageUrl = imageUrl?.trim() || '';

    const updatedPost = await post.save();
    await updatedPost.populate('author', 'name email');

    return NextResponse.json(
      {
        message: 'Post updated successfully',
        post: updatedPost,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Update post error:', error);
    
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

/**
 * DELETE /api/posts/[slug]
 * Deletes a blog post by slug (requires authentication and ownership)
 */
export async function DELETE(request, { params }) {
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

    const { slug } = params;

    // Find the post
    const post = await Post.findOne({ slug });
    if (!post) {
      return NextResponse.json(
        { message: 'Post not found' },
        { status: 404 }
      );
    }

    // Check if user is the author
    if (post.author.toString() !== decoded.userId) {
      return NextResponse.json(
        { message: 'You can only delete your own posts' },
        { status: 403 }
      );
    }

    // Delete the post
    await Post.findOneAndDelete({ slug });

    return NextResponse.json(
      { message: 'Post deleted successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Delete post error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}