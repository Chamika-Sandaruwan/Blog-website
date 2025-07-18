'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { fetchPostBySlug, deletePost, clearCurrentPost } from '../../store/features/postSlice';

/**
 * Individual Blog Post Page Component
 * Displays a single blog post with full content
 */
export default function BlogPostPage() {
  const { slug } = useParams();
  const { currentPost, loading, error } = useSelector((state) => state.posts);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  /**
   * Fetch post on component mount or slug change
   */
  useEffect(() => {
    if (slug) {
      dispatch(fetchPostBySlug(slug));
    }
    
    // Cleanup on unmount
    return () => {
      dispatch(clearCurrentPost());
    };
  }, [slug, dispatch]);

  /**
   * Format date for display
   * @param {string} dateString - ISO date string
   * @returns {string} - Formatted date
   */
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  /**
   * Handle post deletion
   */
  const handleDelete = async () => {
    if (!currentPost || !window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }

    try {
      await dispatch(deletePost(currentPost.slug)).unwrap();
      router.push('/blog');
    } catch (error) {
      console.error('Delete post failed:', error);
    }
  };

  /**
   * Check if current user is the author
   */
  const isAuthor = isAuthenticated && user && currentPost && currentPost.author._id === user.id;

  /**
   * Format content with basic line breaks
   * @param {string} content - Post content
   * @returns {JSX.Element} - Formatted content
   */
  const formatContent = (content) => {
    return content.split('\n').map((paragraph, index) => (
      <p key={index} className="mb-4 text-gray-700 leading-relaxed">
        {paragraph}
      </p>
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading post...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !currentPost) {
    return (
      <div className="min-h-screen bg-gray-50">
        
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">
                {error || 'Post not found'}
              </div>
            </div>
            <div className="mt-6">
              <Link
                href="/blog"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ← Back to Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
     
      
      <article className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Back to Blog Link */}
        <div className="mb-6">
          <Link
            href="/blog"
            className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
        </div>

        {/* Post Header */}
        <header className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {currentPost.title}
          </h1>
          
          {/* Author and Date */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-white font-medium">
                    {currentPost.author?.name?.charAt(0).toUpperCase() || 'A'}
                  </span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  {currentPost.author?.name || 'Anonymous'}
                </p>
                <p className="text-sm text-gray-500">
                  {formatDate(currentPost.createdAt)}
                </p>
              </div>
            </div>
            
            {/* Author Actions */}
            {isAuthor && (
              <div className="flex space-x-2">
                <Link
                  href={`/edit-post/${currentPost.slug}`}
                  className="px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-800 border border-blue-600 hover:border-blue-800 rounded transition-colors"
                >
                  Edit
                </Link>
                <button
                  onClick={handleDelete}
                  className="px-3 py-1 text-sm font-medium text-red-600 hover:text-red-800 border border-red-600 hover:border-red-800 rounded transition-colors"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
          
          {/* Featured Image */}
          {currentPost.imageUrl && (
            <div className="aspect-w-16 aspect-h-9 relative h-64 md:h-96 rounded-lg overflow-hidden">
              <Image
                src={currentPost.imageUrl}
                alt={currentPost.title}
                fill
                className="object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}
        </header>

        {/* Post Content */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="prose prose-lg max-w-none">
            {formatContent(currentPost.content)}
          </div>
        </div>

        {/* Post Footer */}
        <footer className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Published on {formatDate(currentPost.createdAt)}
            </div>
            <div className="flex space-x-4">
              <Link
                href="/blog"
                className="text-blue-600 hover:text-blue-800 font-medium text-sm"
              >
                More Posts →
              </Link>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
}