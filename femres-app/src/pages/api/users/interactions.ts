import type { APIRoute } from 'astro';

export const prerender = false;
import { verifyToken, extractBearerToken } from '../../../lib/auth';

export const GET: APIRoute = async ({ request, locals }) => {
  try {
    // Verify authentication
    const authHeader = request.headers.get('Authorization');
    const token = extractBearerToken(authHeader);

    if (!token) {
      return new Response(
        JSON.stringify({ error: 'Authorization token required' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const jwtSecret = locals.runtime.env.JWT_SECRET;
    const payload = await verifyToken(token, jwtSecret);

    if (!payload) {
      return new Response(
        JSON.stringify({ error: 'Invalid or expired token' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const db = locals.runtime.env.DB;
    
    // Get user's likes and bookmarks
    const likes = await db.prepare(`
      SELECT content_id 
      FROM user_interactions 
      WHERE user_id = ? AND interaction_type = 'like'
    `).bind(payload.userId).all();
    
    const bookmarks = await db.prepare(`
      SELECT content_id 
      FROM user_interactions 
      WHERE user_id = ? AND interaction_type = 'bookmark'
    `).bind(payload.userId).all();
    
    return new Response(
      JSON.stringify({ 
        likes: likes.results.map(row => row.content_id),
        bookmarks: bookmarks.results.map(row => row.content_id)
      }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Get user interactions error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};