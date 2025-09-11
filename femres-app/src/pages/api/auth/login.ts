import type { APIRoute } from 'astro';
import { getUserByEmail, getUserByUsername } from '../../../lib/database';
import { verifyPassword, generateToken, validateEmail } from '../../../lib/auth';

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const { identifier, password } = await request.json();

    if (!identifier || !password) {
      return new Response(
        JSON.stringify({ error: 'Email/username and password are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const db = locals.runtime.env.DB;
    const jwtSecret = locals.runtime.env.JWT_SECRET;

    // Determine if identifier is email or username
    const isEmail = validateEmail(identifier);
    const user = isEmail 
      ? await getUserByEmail(db, identifier)
      : await getUserByUsername(db, identifier);

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Invalid credentials' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verify password
    if (!verifyPassword(password, user.password_hash)) {
      return new Response(
        JSON.stringify({ error: 'Invalid credentials' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

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
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Login error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};