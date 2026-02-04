import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Roles } from 'src/decorators/roles.decorators';

const fakeUser = {
  username: 'sa',
  roles: ['ADMIN', 'OWNER', 'MODERATOR', 'GUEST'],
};

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const request = context.switchToHttp().getRequest<Request>();
    // request.user.roles
    console.log('inside roles guard');
    const requiredRoles = this.reflector.get(Roles, context.getHandler());
    console.log(requiredRoles); //return all the roles that we specified in our route
    // console.log(request.headers.authorization);

    if (requiredRoles.every((role) => fakeUser.roles.includes(role))) {
      console.log('User has all required roles');
      return true;
    }
    console.log('User does not have all required roles');
    return false;
  }
}
