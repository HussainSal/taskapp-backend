import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { instanceToInstance } from "class-transformer";
import {  map } from "rxjs";


@Injectable()
export class TransformerInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>) {
        return next.handle().pipe(map((data) => instanceToInstance(data)));
    }
}