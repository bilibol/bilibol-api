import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JsonWebTokenError, verify } from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';
import { HttpError } from 'src/common/http/error.http';
import { env } from 'src/common/config';

export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoels = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      const request = context.switchToHttp().getRequest();
      let bearerToken = request.headers['authorization'];
      if (!bearerToken) HttpError({ code: 'JWT_NOT_PROVIDED' });

      bearerToken = bearerToken.split(' ')[1];

      const validUser: any = verify(bearerToken, env.JWT_ACCESS_SECRET);
      if (!validUser) HttpError({ code: 'LOGIN_FAILED' });

      request.user = { ...validUser };
      return requiredRoels.includes(validUser.role);
    } catch (error) {
      if (error instanceof JsonWebTokenError) HttpError({ code: 'JWT_ERROR' });
      throw error;
    }
  }
}
