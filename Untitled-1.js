import { NextResponse } from 'next/server';

// Add error handling and logging to the handleSubmit function
const handleSubmit = async (event) => {
  event.preventDefault();
  
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const data = await response.json();
    // Handle successful login
    router.push('/dashboard'); // or wherever you want to redirect after login

  } catch (error) {
    console.error('Login error:', error);
    setError(error.message || 'An error occurred during login');
  }
};

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    
    // Your authentication logic here
    
    if (/* authentication successful */) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}