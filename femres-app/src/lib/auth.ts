import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { User } from './database';

export interface TokenPayload {
  userId: string;
  username: string;
  email: string;
  iat?: number;
  exp?: number;
}

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 10);
}

export function verifyPassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}

export function generateToken(user: User, secret: string): string {
  const payload: TokenPayload = {
    userId: user.id,
    username: user.username,
    email: user.email
  };

  return jwt.sign(payload, secret, { 
    expiresIn: '7d' // Token expires in 7 days
  });
}

export function verifyToken(token: string, secret: string): TokenPayload | null {
  try {
    return jwt.verify(token, secret) as TokenPayload;
  } catch (error) {
    return null;
  }
}

export function extractBearerToken(authHeader: string | null): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7);
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateUsername(username: string): boolean {
  // Username should be 3-20 characters, alphanumeric plus underscore
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
}

export function validatePassword(password: string): boolean {
  // Password should be at least 6 characters
  return password.length >= 6;
}