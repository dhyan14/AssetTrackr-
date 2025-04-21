import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function POST(request: Request) {
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
        password, // will be hashed by the pre-save hook in the User model
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
    } catch (dbError: any) {
      console.error('Database operation error:', dbError);
      console.error('Stack trace:', dbError.stack);
      return NextResponse.json(
        { message: 'Database error: ' + (dbError.message || 'Unknown error') },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Registration error:', error);
    console.error('Stack trace:', error.stack);
    return NextResponse.json(
      { message: 'Error creating user: ' + (error.message || 'Unknown error') },
      { status: 500 }
    );
  }
} 