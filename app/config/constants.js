/**
 * Application constants
 */

// Blog post categories
export const POST_CATEGORIES = [
  'Technology',
  'Design',
  'Business',
  'Lifestyle',
  'Health',
  'Travel',
  'Food',
  'Fashion',
  'Sports',
  'Entertainment'
];

// User avatar options
export const USER_AVATARS = [
  'user-circle',
  'user-check',
  'user-plus',
  'user-x',
  'user-minus',
  'crown',
  'star',
  'heart',
  'smile',
  'coffee'
];

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 50
};

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    VERIFY: '/api/auth/verify'
  },
  POSTS: {
    LIST: '/api/posts',
    DETAIL: (slug) => `/api/posts/${slug}`,
    MY_POSTS: '/api/posts/my-posts'
  },
  PROFILE: '/api/profile'
};