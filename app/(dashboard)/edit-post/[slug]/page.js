'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import Navigation from '../../../../components/Navigation';

/**
 * Edit Post Page Component
 * Allows users to edit their existing blog posts
 */
export default function EditPostPage() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    imageUrl: ''
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { isAuthenticated } = useSelector((state) => state.auth);
  const router = useRouter();
  const params = useParams();
  const { slug } = params;

  /**
   * Fetch post data for editing
   */
  const fetchPost = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/posts/${slug}`, {
        credentials: 'include',
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setFormData({
          title: data.post.title,
          content: data.post.content,
          imageUrl: data.post.imageUrl || ''
        });
      } else {
        setError(data.message || 'Failed to fetch post');
      }
    } catch (error) {
      console.error('Fetch post error:', error);
      setError('Failed to fetch post');
    } finally {
      setLoading(false);
    }
  }, [slug]);

  /**
   * Handle form input changes
   * @param {Event} e - Input change event
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear messages when user starts typing
    if (error) setError('');
    if (success) setSuccess('');
  };

  /**
   * Handle form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Title and content are required');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      
      const response = await fetch(`/api/posts/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          title: formData.title.trim(),
          content: formData.content.trim(),
          imageUrl: formData.imageUrl.trim()
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccess('Post updated successfully!');
        // Redirect to my posts after a short delay
        setTimeout(() => {
          router.push('/my-posts');
        }, 1500);
      } else {
        setError(data.message || 'Failed to update post');
      }
    } catch (error) {
      console.error('Update post error:', error);
      setError('Failed to update post');
    } finally {
      setSubmitting(false);
    }
  };

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    if (slug) {
      fetchPost();
    }
  }, [isAuthenticated, router, slug, fetchPost]);

  // Show loading state
  if (!isAuthenticated || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/my-posts"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to My Posts
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Edit Post</h1>
          <p className="mt-2 text-gray-600">
            Update your blog post content and settings
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
            {success}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        {/* Edit Form */}
        <div className="bg-white rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Title Field */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Post Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your post title"
                maxLength={100}
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                {formData.title.length}/100 characters
              </p>
            </div>

            {/* Image URL Field */}
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-2">
                Featured Image URL
              </label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
              <p className="mt-1 text-sm text-gray-500">
                Optional: Add a featured image for your post
              </p>
            </div>

            {/* Content Field */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Post Content *
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows={12}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                placeholder="Write your post content here..."
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                Share your thoughts, ideas, and stories
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <Link
                href="/my-posts"
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Update Post
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}