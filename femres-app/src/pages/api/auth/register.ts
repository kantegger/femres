import type { APIRoute } from 'astro';
import { createUser, getUserByEmail, getUserByUsername } from '../../../lib/database';
import { hashPassword, validateEmail, validateUsername, validatePassword, generateToken } from '../../../lib/auth';

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const { username, email, password } = await request.json();

    // Validation
    if (!validateUsername(username)) {
      return new Response(
        JSON.stringify({ 
          error: 'Username must be 3-20 characters, alphanumeric and underscore only' 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!validateEmail(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!validatePassword(password)) {
      return new Response(
        JSON.stringify({ error: 'Password must be at least 6 characters' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const db = locals.runtime.env.DB;
    const jwtSecret = locals.runtime.env.JWT_SECRET;

    // Check if user already exists
    const existingUserByEmail = await getUserByEmail(db, email);
    if (existingUserByEmail) {
      return new Response(
        JSON.stringify({ error: 'User with this email already exists' }),
        { status: 409, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const existingUserByUsername = await getUserByUsername(db, username);
    if (existingUserByUsername) {
      return new Response(
        JSON.stringify({ error: 'Username already taken' }),
        { status: 409, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create user
    const passwordHash = hashPassword(password);
    const user = await createUser(db, {
      username,
      email,
      password_hash: passwordHash
    });

    // Generate JWT
    const token = generateToken(user, jwtSecret);

    // Return user data (without password hash) and token
    const { password_hash, ...userWithoutPassword } = user;
    
    return new Response(
      JSON.stringify({
        user: userWithoutPassword,
        token
      }),
      { 
        status: 201, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Registration error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};