'use client';

import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../app/store/features/authSlice';
import { useRouter } from 'next/navigation';
import { User, UserCheck, UserPlus, UserX, UserMinus, Crown, Star, Heart, Smile, Coffee, LogOut, Edit, Settings } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import Image from 'next/image';

/**
 * Navigation Component
 * Provides main navigation with authentication-aware menu items
 */
/**
 * Avatar icon mapping
 */
const avatarIcons = {
  'user-circle': User,
  'user-check': UserCheck,
  'user-plus': UserPlus,
  'user-x': UserX,
  'user-minus': UserMinus,
  'crown': Crown,
  'star': Star,
  'heart': Heart,
  'smile': Smile,
  'coffee': Coffee
};

export default function Navigation() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  // Get user's avatar icon component
  const UserAvatarIcon = avatarIcons[user?.avatar] || User;

  // Debug logging
  console.log('Navigation: isAuthenticated:', isAuthenticated, 'user:', user);

  /**
   * Handle user logout
   * Dispatches logout action and redirects to home
   */
  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and main navigation */}
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              <Image src="/logo.svg" alt="Logo" width={120} height={40} />
            </Link>

            <div className="hidden md:flex space-x-6">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                href="/blog"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Blog
              </Link>
            </div>
          </div>

          {/* Authentication menu */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>

                <Link
                  href="/create-post"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Create Post
                </Link>

                {/* User Dropdown Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    <UserAvatarIcon className="w-5 h-5 text-gray-600" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/edit-profile" className="flex items-center cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Edit Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/my-posts" className="flex items-center cursor-pointer">
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit Posts</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="flex items-center cursor-pointer text-red-600 focus:text-red-600"
                      variant="destructive"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
          <Link
            href="/"
            className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
          >
            Home
          </Link>
          <Link
            href="/blog"
            className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
          >
            Blog
          </Link>
          {isAuthenticated && (
            <Link
              href="/create-post"
              className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
            >
              Create Post
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}