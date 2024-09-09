import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { verifyToken } from '../helper/jwt.helper'; // Import your JWT helper function

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Authorization token not provided');
    }

    const token = authHeader.split(' ')[1]; // Expecting 'Bearer <token>'
    
    try {
      // Verify the token using the helper function
      const decoded = verifyToken(token);
      request['user'] = decoded; // Attach decoded payload to request object
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
