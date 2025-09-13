import type { APIRoute } from 'astro';
import jwt from 'jsonwebtoken';

// Types
interface User {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

// Environment checks
const JWT_SECRET = import.meta.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';

// Mock database for development
const mockUsers: User[] = [
  {
    id: '1',
    username: 'demo_user',
    email: 'demo@example.com',
    password_hash: 'demo_hash', // This is just for mock data, not used in update-username
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
];

// Database interface
let DB: any = null;

// Initialize database connection
async function initDB() {
  if (DB) return DB;

  try {
    // Try to get D1 database binding
    // @ts-ignore - D1 is available in Cloudflare Workers environment
    DB = globalThis.DB || process.env.DB;

    if (!DB) {
      console.log('D1 database not available, using mock data');
      return null;
    }

    return DB;
  } catch (error) {
    console.log('Database connection failed, using mock data:', error);
    return null;
  }
}

// Helper function to verify JWT token
function verifyToken(token: string): { userId: string; email: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
    return decoded;
  } catch (error) {
    return null;
  }
}

export const POST: APIRoute = async ({ request }) => {
  const db = await initDB();

  try {
    // Get authorization header
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

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

    // Check if username already exists (if not the current user)
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
      // Development: Use mock data
      const userIndex = mockUsers.findIndex(u => u.id === decoded.userId);

      if (userIndex === -1) {
        return new Response(JSON.stringify({ error: 'User not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Check if username already exists
      const existingUser = mockUsers.find(u => u.username === trimmedUsername && u.id !== decoded.userId);
      if (existingUser) {
        return new Response(JSON.stringify({ error: '用户名已被使用' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Update username
      mockUsers[userIndex].username = trimmedUsername;
      mockUsers[userIndex].updated_at = new Date().toISOString();

      const { password_hash, ...userWithoutPassword } = mockUsers[userIndex];

      return new Response(JSON.stringify({
        success: true,
        user: userWithoutPassword
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