# ModernBlog - Full-Stack Blog Platform

A modern, full-stack blog platform built with Next.js, Redux, and MongoDB featuring custom JWT authentication.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 15, React 19, and MongoDB
- **Custom Authentication**: Secure JWT-based authentication with bcryptjs password hashing
- **State Management**: Redux Toolkit for global state management
- **Responsive Design**: Beautiful UI with Tailwind CSS
- **CRUD Operations**: Full blog post management (Create, Read, Update, Delete)
- **Route Protection**: Middleware-based route protection for authenticated users
- **SEO Optimized**: Server-side rendering with Next.js

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose ODM
- **State Management**: Redux Toolkit, React-Redux
- **Authentication**: Custom JWT with jsonwebtoken, bcryptjs
- **Styling**: Tailwind CSS
- **Language**: JavaScript

## 📁 Project Structure

```
/app
├── /api
│   ├── /auth            # Authentication API routes
│   │   ├── /login        # User login endpoint
│   │   ├── /logout       # User logout endpoint
│   │   └── /register     # User registration endpoint
│   └── /posts           # Blog posts API routes
│       └── /[slug]       # Dynamic post routes
├── /blog
│   └── /[slug]          # Individual blog post pages
├── /lib
│   ├── db.js            # MongoDB connection
│   └── /models
│       ├── user.model.js # User schema
│       └── post.model.js # Post schema
├── /components
│   └── Navigation.js    # Navigation component
├── /store
│   ├── /features
│   │   ├── authSlice.js # Authentication state
│   │   └── postSlice.js # Posts state
│   ├── provider.js      # Redux provider
│   └── store.js         # Redux store configuration
├── /create-post         # Create post page
├── /login               # Login page
├── /register            # Registration page
├── layout.js            # Root layout
└── page.js              # Home page
/middleware.js           # Route protection middleware
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB database (local or MongoDB Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd modernblog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Authentication Flow

### Registration
1. User provides name, email, and password
2. Password is hashed using bcryptjs
3. User data is saved to MongoDB
4. JWT token is generated and set as HTTP-only cookie

### Login
1. User provides email and password
2. System verifies credentials against hashed password
3. JWT token is generated and set as HTTP-only cookie
4. User is redirected to dashboard

### Route Protection
- Middleware checks for valid JWT token in cookies
- Protected routes redirect unauthenticated users to login
- Invalid tokens are automatically cleared

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/logout` - User logout

### Blog Posts
- `GET /api/posts` - Fetch all posts
- `POST /api/posts` - Create new post (protected)
- `GET /api/posts/[slug]` - Fetch single post
- `PUT /api/posts/[slug]` - Update post (protected)
- `DELETE /api/posts/[slug]` - Delete post (protected)

## 🎨 Pages

- **Home (`/`)** - Landing page with recent posts and features
- **Blog (`/blog`)** - All blog posts listing
- **Post (`/blog/[slug]`)** - Individual blog post view
- **Create Post (`/create-post`)** - Create new blog post (protected)
- **Login (`/login`)** - User authentication
- **Register (`/register`)** - User registration

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT tokens stored in HTTP-only cookies
- Route protection middleware
- Input validation and sanitization
- Secure authentication flow

## 🎯 Key Features

### For Users
- Create and manage blog posts
- Rich text content support
- Image support for posts
- User authentication and authorization
- Responsive design for all devices

### For Developers
- Clean, modular code structure
- Redux for predictable state management
- Custom authentication implementation
- RESTful API design
- MongoDB integration with Mongoose

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Environment Variables for Production
```env
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
NEXTAUTH_URL=your_production_url
```

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/) - learn about Redux Toolkit
- [MongoDB Documentation](https://docs.mongodb.com/) - learn about MongoDB
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - learn about Tailwind CSS

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

**Built with ❤️ using Next.js, Redux, and MongoDB**
