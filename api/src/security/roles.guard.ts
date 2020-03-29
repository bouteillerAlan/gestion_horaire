import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import {Reflector} from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  /**
   * check the user role and returns true or false depending on whether the user has the right or not
   * @param {ExecutionContext} context the route context
   * @return {boolean} boolean
   */
  canActivate(context: ExecutionContext): boolean {
    // get the role to the decorator
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    // if decorator has 0 role the route is open
    if (!roles) {
      return true;
    }
    // get the role to the request
    // request.user is the "return" of the function validate() in the jwt.strategy.ts
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    // check if the user have the role
    const hasRole = () => roles.some((role) => role === user.role);

    // if user exist && user have a role && role is equal to role route
    return user && user.role && hasRole();
  }

}
