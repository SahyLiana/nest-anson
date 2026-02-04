import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
//use the strategy name 'local'
export class LocalGuard extends AuthGuard('local') {
  //use the strategy name 'local'
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('local guard');
    return super.canActivate(context);
  }
}
