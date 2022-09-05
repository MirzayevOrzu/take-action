import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'playlists' })
export class Playlist {
    @Field(() => ID)
    id: number;

    @Field()
    title: string;

    @Field()
    description: string;

    @Field(() => ID)
    user_id: number;
}
