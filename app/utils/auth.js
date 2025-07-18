import jwt from 'jsonwebtoken';

/**
 * Helper function to verify JWT token from cookies
 * @param {Request} request - The incoming request
 * @returns {Object|null} - Decoded token or null if invalid
 */
export function verifyToken(request) {
  try {
    const token = request.cookies.get('token')?.value;
    if (!token) return null;
    
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
}

/**
 * Generate a JWT token for a user
 * @param {Object} user - User object with _id, email, and name
 * @param {String} expiresIn - Token expiration time (default: '7d')
 * @returns {String} JWT token
 */
export function generateToken(user, expiresIn = '7d') {
  return jwt.sign(
    { 
      userId: user._id,
      email: user.email,
      name: user.name
    },
    process.env.JWT_SECRET,
    { expiresIn }
  );
}

/**
 * Set authentication cookie in response
 * @param {NextResponse} response - Next.js response object
 * @param {String} token - JWT token
 * @param {Number} maxAge - Cookie max age in seconds (default: 7 days)
 * @returns {NextResponse} Response with cookie set
 */
export function setAuthCookie(response, token, maxAge = 7 * 24 * 60 * 60) {
  response.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge,
    path: '/'
  });
  
  return response;
}