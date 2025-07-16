'use client';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import { fetchPosts } from './store/features/postSlice';
import Navigation from '../components/Navigation';

/**
 * Home Page Component
 * Landing page showcasing the blog platform with recent posts
 */
export default function Home() {
  const { posts, loading } = useSelector((state) => state.posts);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  /**
   * Categories data
   */
  const categories = [
    { name: 'Technology', emoji: '💻', description: 'Latest in tech trends' },
    { name: 'Design', emoji: '🎨', description: 'Creative inspiration' },
    { name: 'Business', emoji: '💼', description: 'Growth strategies' },
    { name: 'Lifestyle', emoji: '🌱', description: 'Living your best life' },
    { name: 'Health', emoji: '🏥', description: 'Wellness and fitness' },
    { name: 'Travel', emoji: '✈️', description: 'Explore the world' },
    { name: 'Food', emoji: '🍽️', description: 'Culinary adventures' },
    { name: 'Fashion', emoji: '👗', description: 'Style and trends' },
    { name: 'Sports', emoji: '⚽', description: 'Athletic pursuits' },
    { name: 'Entertainment', emoji: '🎬', description: 'Movies, music & more' }
  ];

  /**
   * Dummy blog posts data
   */
  const dummyPosts = [
    {
      _id: '1',
      title: 'Conversations with London Makr & Co.',
      slug: 'conversations-london-makr-co',
      content: 'We sat down with London\'s fast-growing brand and product design studio, Makr & Co, to find out how they\'ve used Untitled UI to 2x their revenue.',
      imageUrl: '/projectImage/1.webp',
      author: { name: 'Olivia Rhye' },
      createdAt: '2024-01-20',
      tags: ['Design', 'Research', 'Interviews']
    },
    {
      _id: '2',
      title: 'A Relentless Pursuit of Perfection in Product Design',
      slug: 'relentless-pursuit-perfection-product-design',
      content: 'I began to notice that there was a sharp contrast between well-made...',
      imageUrl: '/projectImage/5.webp',
      author: { name: 'Phoenix Baker' },
      createdAt: '2024-01-19',
      tags: ['Design', 'Research']
    },
    {
      _id: '3',
      title: 'How to Run a Successful Business With Your Partner',
      slug: 'successful-business-with-partner',
      content: 'Starting a business with your spouse or significant other is an exciting but...',
      imageUrl: '/projectImage/6.webp',
      author: { name: 'Lana Steiner' },
      createdAt: '2024-01-18',
      tags: ['Business', 'Research']
    },
    {
      _id: '4',
      title: 'Why Food Matters — Disease Prevention & Treatment',
      slug: 'food-matters-disease-prevention-treatment',
      content: 'Eating more plants and less meat has been tied to a longer life and a...',
      imageUrl: '/projectImage/8.webp',
      author: { name: 'Lana Steiner' },
      createdAt: '2024-01-18',
      tags: ['Health', 'Research']
    }
  ];

  /**
   * Fetch recent posts on component mount
   */
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  /**
   * Use dummy posts if no real posts are available
   */
  const displayPosts = posts.length > 0 ? posts.slice(0, 4) : dummyPosts;

  /**
   * Handle newsletter subscription
   */
  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle subscription logic here
    console.log('Subscribing email:', email);
    setEmail('');
    alert('Thank you for subscribing!');
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
      day: 'numeric'
    });
  };

  /**
   * Truncate text to specified length
   * @param {string} text - Text to truncate
   * @param {number} maxLength - Maximum length
   * @returns {string} - Truncated text
   */
  const truncateText = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')" }}>
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative text-center text-white px-4 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Gspark</h1>
          <p className="text-lg md:text-xl mb-6">Discover amazing stories, insights, and tips from our community of writers.</p>
          <Link href="/blog" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition">
            Start Reading
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Explore Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition cursor-pointer">
                <div className="text-4xl mb-2">{category.emoji}</div>
                <h3 className="font-semibold text-lg">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Latest Posts Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Latest Posts</h2>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow overflow-hidden animate-pulse">
                  <div className="w-full h-48 bg-gray-300"></div>
                  <div className="p-5">
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-6 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded mb-3"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : displayPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayPosts.slice(0, 6).map((post, index) => (
                <article key={post._id} className="bg-white rounded-xl shadow overflow-hidden hover:shadow-xl transition">
                  <div className="relative h-48 overflow-hidden">
                    {post.imageUrl ? (
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <Image
                        src={
                          index === 0
                            ? "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                            : index === 1
                              ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                              : "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                        }
                        alt="Blog post"
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="p-5">
                    <span className="text-blue-600 text-xs uppercase font-semibold">
                      {post.tags?.[0] || (index === 0 ? 'TECHNOLOGY' : index === 1 ? 'DESIGN' : 'BUSINESS')}
                    </span>
                    <h3 className="text-xl font-bold mt-1 mb-2 text-gray-900">{post.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {truncateText(post.content, 100)}
                    </p>
                    <Link
                      href={`/blog/${post.slug || post._id}`}
                      className="text-blue-600 font-semibold text-sm hover:underline"
                    >
                      Read More →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Default sample cards when no posts */}
              <article className="bg-white rounded-xl shadow overflow-hidden hover:shadow-xl transition">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    alt="Tech"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <span className="text-blue-600 text-xs uppercase font-semibold">TECHNOLOGY</span>
                  <h3 className="text-xl font-bold mt-1 mb-2 text-gray-900">The Future of AI in Web Development</h3>
                  <p className="text-gray-600 text-sm mb-3">Exploring how artificial intelligence is revolutionizing the way we build and design websites...</p>
                  <Link href="/blog" className="text-blue-600 font-semibold text-sm hover:underline">Read More →</Link>
                </div>
              </article>

              <article className="bg-white rounded-xl shadow overflow-hidden hover:shadow-xl transition">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    alt="Design"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <span className="text-blue-600 text-xs uppercase font-semibold">DESIGN</span>
                  <h3 className="text-xl font-bold mt-1 mb-2 text-gray-900">Minimalist Design Principles</h3>
                  <p className="text-gray-600 text-sm mb-3">Less is more. Discover the core principles of minimalist design and how to apply them...</p>
                  <Link href="/blog" className="text-blue-600 font-semibold text-sm hover:underline">Read More →</Link>
                </div>
              </article>

              <article className="bg-white rounded-xl shadow overflow-hidden hover:shadow-xl transition">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    alt="Business"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <span className="text-blue-600 text-xs uppercase font-semibold">BUSINESS</span>
                  <h3 className="text-xl font-bold mt-1 mb-2 text-gray-900">Startup Growth Strategies</h3>
                  <p className="text-gray-600 text-sm mb-3">Proven strategies to scale your startup from zero to hero in today&apos;s competitive market...</p>
                  <Link href="/blog" className="text-blue-600 font-semibold text-sm hover:underline">Read More →</Link>
                </div>
              </article>
            </div>
          )}
        </div>
      </section>
      {/* Newsletter Subscription Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
        <p className="mb-6">Get the latest posts delivered straight to your inbox</p>
        <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 px-4 py-3  bg-white rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            Subscribe
          </button>
        </form>
      </section>

      {/* Social Media Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Connect With Us</h2>
          <p className="text-gray-600 mb-8">Follow us on social media for daily updates and behind-the-scenes content</p>
          <div className="flex justify-center gap-6">
            <a href="#" className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </a>
            <a href="#" className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
              </svg>
            </a>
            <a href="#" className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
              </svg>
            </a>
            <a href="#" className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-orange-600 hover:text-white transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 11.779c0-1.459-1.192-2.645-2.657-2.645-.715 0-1.363.286-1.84.746-1.81-1.191-4.259-1.949-6.971-2.046l1.483-4.669 4.016.941-.006.058c0 1.193.975 2.163 2.174 2.163 1.198 0 2.172-.97 2.172-2.163s-.975-2.164-2.172-2.164c-.92 0-1.704.574-2.021 1.379l-4.329-1.015c-.189-.046-.381.063-.44.249l-1.654 5.207c-2.838.034-5.409.798-7.3 2.025-.474-.438-1.103-.712-1.799-.712-1.465 0-2.656 1.187-2.656 2.646 0 .97.533 1.811 1.317 2.271-.052.282-.086.567-.086.857 0 3.911 4.808 7.093 10.719 7.093s10.72-3.182 10.72-7.093c0-.274-.029-.544-.075-.81.832-.447 1.405-1.312 1.405-2.318zm-17.224 1.816c0-.868.71-1.575 1.582-1.575.872 0 1.581.707 1.581 1.575s-.709 1.574-1.581 1.574-1.582-.706-1.582-1.574zm9.061 4.669c-.797.793-2.048 1.179-3.824 1.179l-.013-.003-.013.003c-1.777 0-3.028-.386-3.824-1.179-.145-.144-.145-.379 0-.523.145-.145.381-.145.526 0 .65.647 1.729.961 3.298.961l.013.003.013-.003c1.569 0 2.648-.315 3.298-.962.145-.145.381-.144.526 0 .145.145.145.379 0 .524zm-.189-3.095c-.872 0-1.581-.706-1.581-1.574 0-.868.709-1.575 1.581-1.575s1.581.707 1.581 1.575-.709 1.574-1.581 1.574z" />
              </svg>
            </a>
            <a href="#" className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-800 hover:text-white transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
              </svg>
            </a>
          </div>
        </div>
      </section>


    </div>
  );
}
