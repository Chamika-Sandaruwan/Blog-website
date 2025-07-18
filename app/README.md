# App Directory Structure

This document outlines the organization of the Next.js app directory.

## Directory Structure

```
app/
├── (dashboard)/         # Dashboard routes (grouped route)
├── api/                 # API routes
│   ├── auth/            # Authentication endpoints
│   ├── posts/           # Blog post endpoints
│   └── profile/         # User profile endpoints
├── blog/                # Blog pages
├── config/              # Application configuration
│   ├── constants.js     # App constants
│   ├── db.js            # Database configuration
│   └── metadata.js      # SEO and metadata
├── lib/                 # Legacy directory (for backward compatibility)
├── models/              # Mongoose models
│   ├── Post.js          # Blog post model
│   ├── User.js          # User model
│   └── index.js         # Models barrel file
├── store/               # Redux store
│   ├── features/        # Redux slices
│   ├── provider.js      # Redux provider
│   └── store.js         # Store configuration
├── utils/               # Utility functions
│   ├── auth.js          # Authentication utilities
│   ├── index.js         # General utilities
│   └── validation.js    # Form validation utilities
├── favicon.ico          # Site favicon
├── globals.css          # Global styles
├── layout.js            # Root layout
└── page.js              # Home page
```

## Key Directories

### `/config`
Contains application configuration files including database setup, constants, and metadata.

### `/models`
Mongoose models for MongoDB data structures.

### `/utils`
Utility functions used throughout the application.

### `/api`
API routes organized by resource type.

### `/store`
Redux store configuration and slices.

## Best Practices

1. Keep related functionality together
2. Use barrel files (index.js) for cleaner imports
3. Maintain backward compatibility with legacy imports
4. Follow consistent naming conventions
5. Document complex functions and components