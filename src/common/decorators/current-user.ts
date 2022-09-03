import { createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
    (data: unknown, context: GqlExecutionContext) => {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req.user;
    },
);
