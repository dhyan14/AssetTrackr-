import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    // Basic validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    try {
      // Connect to database
      await dbConnect();

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json(
          { message: 'User already exists with this email' },
          { status: 409 }
        );
      }

      // Create user
      const user = await User.create({
        name,
        email,
        password, // will be hashed by the pre-save hook in the User model
      });

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
      return NextResponse.json(
        { message: 'Database error: ' + (dbError.message || 'Unknown error') },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Error creating user: ' + (error.message || 'Unknown error') },
      { status: 500 }
    );
  }
} 