import type { APIRoute } from 'astro';
import { toggleCommentLike } from '../../../../lib/database';
import { verifyToken, extractBearerToken } from '../../../../lib/auth';

export const POST: APIRoute = async ({ params, request, locals }) => {
  try {
    const commentId = params.commentId;
    if (!commentId) {
      return new Response(
        JSON.stringify({ error: 'Comment ID is required' }),
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

    const db = locals.runtime.env.DB;
    const isLiked = await toggleCommentLike(db, commentId as string, payload.userId);
    
    return new Response(
      JSON.stringify({ 
        liked: isLiked,
        message: isLiked ? 'Comment liked' : 'Comment unliked'
      }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Toggle comment like error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};