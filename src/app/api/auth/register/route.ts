import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

// Set timeout for the registration process
const REGISTRATION_TIMEOUT = 15000; // 15 seconds

export async function POST(request: Request) {
  // Create a timeout promise
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('Registration timed out. Please try again.'));
    }, REGISTRATION_TIMEOUT);
  });

  try {
    console.log('Registration request received');
    
    const body = await request.json();
    console.log('Request body:', JSON.stringify(body));
    
    const { name, email, password } = body;

    // Basic validation
    if (!name || !email || !password) {
      console.log('Validation failed: Missing required fields');
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      console.log('Validation failed: Password too short');
      return NextResponse.json(
        { message: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    try {
      // Execute registration with a timeout race
      const registrationPromise = async () => {
        // Connect to database
        console.log('Connecting to database...');
        await dbConnect();
        console.log('Database connected successfully');

        // Check if user already exists
        console.log('Checking for existing user with email:', email);
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          console.log('User already exists with this email');
          return NextResponse.json(
            { message: 'User already exists with this email' },
            { status: 409 }
          );
        }

        // Create user
        console.log('Creating new user...');
        const user = await User.create({
          name,
          email,
          password,
        });
        console.log('User created successfully with ID:', user._id.toString());

        // Return success without sending the password
        return NextResponse.json(
          {
            message: 'User registered successfully',
            user: {
              id: user._id.toString(),
              name: user.name,
              email: user.email,
            },
          },
          { status: 201 }
        );
      };

      // Race between registration and timeout
      return await Promise.race([registrationPromise(), timeoutPromise]);
    } catch (dbError: any) {
      console.error('Database operation error:', dbError);
      console.error('Stack trace:', dbError.stack);
      
      // Provide more specific error messages
      let errorMessage = 'Database error';
      let statusCode = 500;
      
      if (dbError.name === 'MongoServerSelectionError') {
        errorMessage = 'Could not connect to database server. Please try again later.';
        statusCode = 503; // Service Unavailable
      } else if (dbError.code === 11000) {
        errorMessage = 'A user with this email already exists.';
        statusCode = 409; // Conflict
      }
      
      return NextResponse.json(
        { message: errorMessage + (dbError.message ? ': ' + dbError.message : '') },
        { status: statusCode }
      );
    }
  } catch (error: any) {
    console.error('Registration error:', error);
    console.error('Stack trace:', error.stack);
    
    // Handle timeout errors specifically
    if (error.message === 'Registration timed out. Please try again.') {
      return NextResponse.json(
        { message: error.message },
        { status: 504 }  // Gateway Timeout
      );
    }
    
    return NextResponse.json(
      { message: 'Error creating user: ' + (error.message || 'Unknown error') },
      { status: 500 }
    );
  }
} 