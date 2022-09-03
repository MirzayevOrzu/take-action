import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class NewPlaylistInput {
    @Field()
    @MaxLength(100)
    title: string;

    @Field()
    @MaxLength(250)
    description: string;
}
