import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { OrderService } from '../order.service';

@Injectable()
export class ActiveOrderGuard implements CanActivate {
  constructor(private _order: OrderService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const body = context.switchToHttp().getRequest()?.body;

    if (!body || !body.orderId) return false;

    return true;
  }
}
