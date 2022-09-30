import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'users' })
export class User {
    @Field(() => ID)
    id: number;

    @Field()
    first_name: string;

    @Field()
    last_name: string;

    @Field()
    email: string;
}
