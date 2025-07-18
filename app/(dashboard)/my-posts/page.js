'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Edit, Trash2, Plus, Calendar, User } from 'lucide-react';
import Navigation from '../../components/Navigation';

/**
 * My Posts Page Component
 * Displays and manages user's blog posts with edit/delete functionality
 */
export default function MyPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(null);
  
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const router = useRouter();

  /**
   * Fetch user's posts from API
   */
  const fetchMyPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/posts/my-posts', {
        credentials: 'include',
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setPosts(data); // API returns posts array directly
      } else {
        setError(data.message || 'Failed to fetch posts');
      }
    } catch (error) {
      console.error('Fetch posts error:', error);
      setError('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle post deletion
   * @param {string} slug - Post slug to delete
   */
  const handleDeletePost = async (slug) => {
    if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }

    try {
      setDeleteLoading(slug);
      const response = await fetch(`/api/posts/${slug}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Remove deleted post from state
        setPosts(posts.filter(post => post.slug !== slug));
      } else {
        setError(data.message || 'Failed to delete post');
      }
    } catch (error) {
      console.error('Delete post error:', error);
      setError('Failed to delete post');
    } finally {
      setDeleteLoading(null);
    }
  };

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
    });
  };

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    fetchMyPosts();
  }, [isAuthenticated, router]);

  // Show loading state
  if (!isAuthenticated || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Posts</h1>
              <p className="mt-2 text-gray-600">
                Manage your blog posts - edit, delete, or create new ones
              </p>
            </div>
            <Link
              href="/create-post"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New Post
            </Link>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Edit className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
            <p className="text-gray-600 mb-6">Start sharing your thoughts with the world!</p>
            <Link
              href="/create-post"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Post
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <div key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {/* Post Image */}
                <div className="aspect-video bg-gray-200 relative">
                  {post.imageUrl ? (
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Edit className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Post Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
                  </p>

                  {/* Post Meta */}
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{formatDate(post.createdAt)}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="flex-1 text-center px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm"
                    >
                      View
                    </Link>
                    <Link
                      href={`/edit-post/${post.slug}`}
                      className="flex-1 text-center px-3 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors text-sm flex items-center justify-center"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeletePost(post.slug)}
                      disabled={deleteLoading === post.slug}
                      className="flex-1 px-3 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors text-sm flex items-center justify-center disabled:opacity-50"
                    >
                      {deleteLoading === post.slug ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                      ) : (
                        <>
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}