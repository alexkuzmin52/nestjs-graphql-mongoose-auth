import { AuthGuard } from '@nestjs/passport';
import { AuthenticationError } from '@nestjs/apollo';
import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export class GqlJwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    return request;
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      throw err || new AuthenticationError('Could not authenticate with token');
    }
    return user;
  }
}
