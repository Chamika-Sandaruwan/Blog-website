'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../app/store/features/authSlice';

/**
 * Authentication Provider Component
 * Initializes authentication state from stored cookies on app load
 */
export default function AuthProvider({ children }) {
  const dispatch = useDispatch();

  /**
   * Check for existing authentication on component mount
   * Restores user session from cookies if available
   */
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        console.log('AuthProvider: Checking authentication...');
        // Verify token by making a request to the verify endpoint
        // The token is in HTTP-only cookie, so we don't need to check it manually
        const response = await fetch('/api/auth/verify', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          console.log('AuthProvider: Token verified, user:', data.user);
          // Set user data in Redux store
          dispatch(setUser(data.user));
        } else {
          console.log('AuthProvider: Token verification failed, status:', response.status);
          // Token is invalid or doesn't exist
          const errorData = await response.json().catch(() => ({}));
          console.log('AuthProvider: Error details:', errorData);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      }
    };

    initializeAuth();
  }, [dispatch]);

  return children;
}