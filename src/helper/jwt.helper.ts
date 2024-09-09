import * as jwt from 'jsonwebtoken';


const JWT_SECRET = process.env.JWT_SECRET || 'default_secret'; 
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

// Helper function to generate a JWT token
export const generateToken = (payload: any): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN });
};

// Helper function to verify a JWT token
export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};
