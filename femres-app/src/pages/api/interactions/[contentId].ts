import type { APIRoute } from 'astro';

export const prerender = false;
import { toggleUserInteraction } from '../../../lib/database';
import { verifyToken, extractBearerToken } from '../../../lib/auth';

export const POST: APIRoute = async ({ params, request, locals }) => {
  try {
    const contentId = params.contentId;
    if (!contentId) {
      return new Response(
        JSON.stringify({ error: 'Content ID is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

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
    const payload = verifyToken(token, jwtSecret);

    if (!payload) {
      return new Response(
        JSON.stringify({ error: 'Invalid or expired token' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { content_type, interaction_type } = await request.json();

    if (!content_type || !interaction_type) {
      return new Response(
        JSON.stringify({ error: 'content_type and interaction_type are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!['like', 'bookmark'].includes(interaction_type)) {
      return new Response(
        JSON.stringify({ error: 'interaction_type must be "like" or "bookmark"' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const db = locals.runtime.env.DB;
    const isActive = await toggleUserInteraction(
      db, 
      payload.userId, 
      contentId as string, 
      content_type,
      interaction_type
    );
    
    return new Response(
      JSON.stringify({ 
        active: isActive,
        message: `Content ${isActive ? interaction_type + 'd' : 'un' + interaction_type + 'd'}`
      }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Toggle interaction error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};