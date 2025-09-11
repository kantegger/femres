// Database utility functions for D1
import type { D1Database } from '@cloudflare/workers-types';

export interface User {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: string;
  content: string;
  content_id: string;
  content_type: string;
  user_id: string;
  parent_id?: string;
  likes_count: number;
  created_at: string;
  updated_at: string;
  // Joined data
  username?: string;
  is_liked?: boolean;
  replies?: Comment[];
}

export interface CommentLike {
  id: string;
  comment_id: string;
  user_id: string;
  created_at: string;
}

export interface UserInteraction {
  id: string;
  user_id: string;
  content_id: string;
  content_type: string;
  interaction_type: string;
  created_at: string;
}

// Generate UUID-like ID
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

// User functions
export async function createUser(
  db: D1Database,
  userData: { username: string; email: string; password_hash: string }
): Promise<User> {
  const id = generateId();
  const now = new Date().toISOString();
  
  const result = await db.prepare(`
    INSERT INTO users (id, username, email, password_hash, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).bind(id, userData.username, userData.email, userData.password_hash, now, now).run();

  if (!result.success) {
    throw new Error('Failed to create user');
  }

  return {
    id,
    ...userData,
    created_at: now,
    updated_at: now
  };
}

export async function getUserByEmail(db: D1Database, email: string): Promise<User | null> {
  const result = await db.prepare(`
    SELECT * FROM users WHERE email = ?
  `).bind(email).first();

  return result as User | null;
}

export async function getUserByUsername(db: D1Database, username: string): Promise<User | null> {
  const result = await db.prepare(`
    SELECT * FROM users WHERE username = ?
  `).bind(username).first();

  return result as User | null;
}

export async function getUserById(db: D1Database, id: string): Promise<User | null> {
  const result = await db.prepare(`
    SELECT * FROM users WHERE id = ?
  `).bind(id).first();

  return result as User | null;
}

// Comment functions
export async function createComment(
  db: D1Database,
  commentData: {
    content: string;
    content_id: string;
    content_type: string;
    user_id: string;
    parent_id?: string;
  }
): Promise<Comment> {
  const id = generateId();
  const now = new Date().toISOString();
  
  const result = await db.prepare(`
    INSERT INTO comments (id, content, content_id, content_type, user_id, parent_id, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    id, 
    commentData.content, 
    commentData.content_id, 
    commentData.content_type, 
    commentData.user_id, 
    commentData.parent_id || null,
    now, 
    now
  ).run();

  if (!result.success) {
    throw new Error('Failed to create comment');
  }

  return {
    id,
    ...commentData,
    likes_count: 0,
    created_at: now,
    updated_at: now
  };
}

export async function getCommentsByContent(
  db: D1Database,
  contentId: string,
  userId?: string
): Promise<Comment[]> {
  // Get top-level comments with user information
  const query = `
    SELECT 
      c.*,
      u.username,
      ${userId ? `CASE WHEN cl.user_id IS NOT NULL THEN 1 ELSE 0 END as is_liked` : '0 as is_liked'}
    FROM comments c
    JOIN users u ON c.user_id = u.id
    ${userId ? 'LEFT JOIN comment_likes cl ON c.id = cl.comment_id AND cl.user_id = ?' : ''}
    WHERE c.content_id = ? AND c.parent_id IS NULL
    ORDER BY c.created_at DESC
  `;

  const params = userId ? [userId, contentId] : [contentId];
  const result = await db.prepare(query).bind(...params).all();
  
  const comments = result.results as Comment[];

  // Get replies for each comment
  for (const comment of comments) {
    const repliesQuery = `
      SELECT 
        c.*,
        u.username,
        ${userId ? `CASE WHEN cl.user_id IS NOT NULL THEN 1 ELSE 0 END as is_liked` : '0 as is_liked'}
      FROM comments c
      JOIN users u ON c.user_id = u.id
      ${userId ? 'LEFT JOIN comment_likes cl ON c.id = cl.comment_id AND cl.user_id = ?' : ''}
      WHERE c.parent_id = ?
      ORDER BY c.created_at ASC
    `;

    const repliesParams = userId ? [userId, comment.id] : [comment.id];
    const repliesResult = await db.prepare(repliesQuery).bind(...repliesParams).all();
    comment.replies = repliesResult.results as Comment[];
  }

  return comments;
}

export async function toggleCommentLike(
  db: D1Database,
  commentId: string,
  userId: string
): Promise<boolean> {
  // Check if already liked
  const existingLike = await db.prepare(`
    SELECT id FROM comment_likes WHERE comment_id = ? AND user_id = ?
  `).bind(commentId, userId).first();

  if (existingLike) {
    // Remove like
    await db.prepare(`
      DELETE FROM comment_likes WHERE comment_id = ? AND user_id = ?
    `).bind(commentId, userId).run();

    await db.prepare(`
      UPDATE comments SET likes_count = likes_count - 1 WHERE id = ?
    `).bind(commentId).run();

    return false; // Unlike
  } else {
    // Add like
    const likeId = generateId();
    await db.prepare(`
      INSERT INTO comment_likes (id, comment_id, user_id, created_at)
      VALUES (?, ?, ?, ?)
    `).bind(likeId, commentId, userId, new Date().toISOString()).run();

    await db.prepare(`
      UPDATE comments SET likes_count = likes_count + 1 WHERE id = ?
    `).bind(commentId).run();

    return true; // Liked
  }
}

// User interaction functions
export async function toggleUserInteraction(
  db: D1Database,
  userId: string,
  contentId: string,
  contentType: string,
  interactionType: 'like' | 'bookmark'
): Promise<boolean> {
  // Check if interaction exists
  const existing = await db.prepare(`
    SELECT id FROM user_interactions 
    WHERE user_id = ? AND content_id = ? AND interaction_type = ?
  `).bind(userId, contentId, interactionType).first();

  if (existing) {
    // Remove interaction
    await db.prepare(`
      DELETE FROM user_interactions 
      WHERE user_id = ? AND content_id = ? AND interaction_type = ?
    `).bind(userId, contentId, interactionType).run();
    return false;
  } else {
    // Add interaction
    const id = generateId();
    await db.prepare(`
      INSERT INTO user_interactions (id, user_id, content_id, content_type, interaction_type, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(id, userId, contentId, contentType, interactionType, new Date().toISOString()).run();
    return true;
  }
}

export async function getUserInteractions(
  db: D1Database,
  userId: string
): Promise<UserInteraction[]> {
  const result = await db.prepare(`
    SELECT * FROM user_interactions WHERE user_id = ? ORDER BY created_at DESC
  `).bind(userId).all();

  return result.results as UserInteraction[];
}