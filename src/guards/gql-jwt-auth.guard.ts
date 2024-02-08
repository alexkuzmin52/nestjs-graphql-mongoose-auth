import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';
import { AuthenticationError } from '@nestjs/apollo';
import { GqlExecutionContext } from '@nestjs/graphql';

export class GqlJwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    // console.log('00000000000000000000000000 GqlJwtAuthGuard');
    const ctx = GqlExecutionContext.create(context);
    // console.log('0000000000000000000000000000000000000000000000');
    const request = ctx.getContext().req;
    const token = request.headers.authorization;
    // console.log('request. token ***********************', token);
    return request;
  }

  handleRequest(err: any, user: any, info: any) {
    // console.log('44444444444444444444444444 GqlJwtAuthGuard handleRequest');
    // console.log('user :', user);
    // console.log('err :', err);
    // console.log('info :', info);
    if (err || !user) {
      throw err || new AuthenticationError('Could not authenticate with token');
    }
    return user;
  }
}
