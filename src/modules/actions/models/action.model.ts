import { Field, ID, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ActionStatus } from 'src/entities/actions.entity';

registerEnumType(ActionStatus, {
    name: 'ActionStatus',
});

@ObjectType({ description: 'actions' })
export class Action {
    @Field(() => ID)
    id: number;

    @Field()
    name: string;

    @Field()
    link: string;

    @Field(() => Int)
    order: number;

    @Field(() => ActionStatus)
    status: ActionStatus;

    @Field(() => ID)
    playlist_id: number;

    @Field(() => ID)
    user_id: number;

    @Field(() => Date)
    created_at: Date;
}
