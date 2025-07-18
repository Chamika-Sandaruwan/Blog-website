'use client';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/**
 * Async thunk for fetching all posts
 * Handles API call to get all blog posts
 */
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/posts');
      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Failed to fetch posts');
      }

      return data; // API returns posts array directly
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

/**
 * Async thunk for fetching a single post by slug
 * Handles API call to get specific blog post
 */
export const fetchPostBySlug = createAsyncThunk(
  'posts/fetchPostBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/posts/${slug}`);
      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Failed to fetch post');
      }

      return data.post;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

/**
 * Async thunk for creating a new post
 * Handles API call to create blog post
 */
export const createPost = createAsyncThunk(
  'posts/createPost',
  async (postData, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Failed to create post');
      }

      return data.post;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

/**
 * Async thunk for updating a post
 * Handles API call to update blog post
 */
export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async ({ slug, postData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/posts/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Failed to update post');
      }

      return data.post;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

/**
 * Async thunk for deleting a post
 * Handles API call to delete blog post
 */
export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/posts/${slug}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        return rejectWithValue(data.message || 'Failed to delete post');
      }

      return slug;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

/**
 * Async thunk for fetching posts by category
 * Handles API call to get blog posts filtered by category
 */
export const fetchPostsByCategory = createAsyncThunk(
  'posts/fetchByCategory',
  async (category) => {
    try {
      const response = await fetch(`/api/posts${category ? `?category=${category}` : ''}`);
      if (!response.ok) throw new Error('Failed to fetch posts');
      return await response.json();
    } catch (error) {
      throw error;
    }
  }
);

/**
 * Initial state for posts
 */
const initialState = {
  posts: [],
  currentPost: null,
  loading: false,
  error: null,
  selectedCategory: null,
};

/**
 * Posts slice
 * Manages blog posts state and actions
 */
const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentPost: (state) => {
      state.currentPost = null;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch posts cases
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.error = null;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch single post cases
      .addCase(fetchPostBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPost = action.payload;
        state.error = null;
      })
      .addCase(fetchPostBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create post cases
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.unshift(action.payload);
        state.error = null;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update post cases
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.posts.findIndex(post => post.slug === action.payload.slug);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
        state.currentPost = action.payload;
        state.error = null;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete post cases
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter(post => post.slug !== action.payload);
        state.error = null;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch posts by category cases
      .addCase(fetchPostsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.error = null;
      })
      .addCase(fetchPostsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearCurrentPost, setSelectedCategory } = postSlice.actions;
export default postSlice.reducer;