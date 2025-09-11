import type { APIRoute } from 'astro';

export const prerender = false;
import { getUserById } from '../../../lib/database';
import { verifyToken, extractBearerToken } from '../../../lib/auth';

export const GET: APIRoute = async ({ request, locals }) => {
  try {
    const authHeader = request.headers.get('Authorization');
    const token = extractBearerToken(authHeader);

    if (!token) {
      return new Response(
        JSON.stringify({ error: 'Authorization token required' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const jwtSecret = locals.runtime.env.JWT_SECRET;
    const payload = verifyToken(token, jwtSecret);

    if (!payload) {
      return new Response(
        JSON.stringify({ error: 'Invalid or expired token' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const db = locals.runtime.env.DB;
    const user = await getUserById(db, payload.userId);

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'User not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Return user data without password hash
    const { password_hash, ...userWithoutPassword } = user;
    
    return new Response(
      JSON.stringify({ user: userWithoutPassword }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Me endpoint error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};