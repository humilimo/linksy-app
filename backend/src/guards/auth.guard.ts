import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException  } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import secret from 'src/secret';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;

    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    try {
      const decoded = this.jwtService.verify(token, { secret: secret.jwtSecret });
      request.user = decoded;

      const userIdFromToken = decoded.userId;
      const loggedIdFromRoute = parseInt(request.params.loggedId, 10);

      if (userIdFromToken !== loggedIdFromRoute) {
        throw new ForbiddenException('User ID does not match the token');
      }

      return true;
    } catch (error) {
      throw new UnauthorizedException(`Token verification error: ${error.message}`);
    }
  }
}