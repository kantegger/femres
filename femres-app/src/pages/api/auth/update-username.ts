import type { APIRoute } from 'astro';
import { verifyToken, extractBearerToken } from '../../../lib/auth';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    // Get authorization header
    const authHeader = request.headers.get('Authorization');
    const token = extractBearerToken(authHeader);

    if (!token) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Verify token
    const jwtSecret = locals.runtime?.env?.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
    const decoded = await verifyToken(token, jwtSecret);

    if (!decoded) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Parse request body
    const body = await request.json();
    const { username } = body;

    // Validate input
    if (!username || typeof username !== 'string' || username.trim().length < 2) {
      return new Response(JSON.stringify({ error: '用户名至少需要2个字符' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const trimmedUsername = username.trim();
    const db = locals.runtime?.env?.DB;

    if (db) {
      // Production: Use D1 database
      const existingUser = await db.prepare(
        'SELECT id FROM users WHERE username = ? AND id != ?'
      ).bind(trimmedUsername, decoded.userId).first();

      if (existingUser) {
        return new Response(JSON.stringify({ error: '用户名已被使用' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Update username
      await db.prepare(
        'UPDATE users SET username = ?, updated_at = ? WHERE id = ?'
      ).bind(trimmedUsername, new Date().toISOString(), decoded.userId).run();

      // Get updated user
      const updatedUser = await db.prepare(
        'SELECT id, username, email, avatar_url, created_at, updated_at FROM users WHERE id = ?'
      ).bind(decoded.userId).first();

      return new Response(JSON.stringify({
        success: true,
        user: updatedUser
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      // Development: Mock data fallback
      return new Response(JSON.stringify({
        success: true,
        user: {
          id: decoded.userId,
          username: trimmedUsername,
          email: decoded.email,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    console.error('Update username error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};