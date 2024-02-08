import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from '@nestjs/core';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    // private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),

    ]);
    console.log('requiredRoles  : ', requiredRoles);
    if (!requiredRoles) return true;
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;
    console.log('user    :', user);
    return requiredRoles.includes(user.role);
  }
}
