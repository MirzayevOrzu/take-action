import { Field, InputType } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

@InputType()
export class NewUserInput {
    @Field()
    @IsString()
    first_name: string;

    @Field()
    @IsString()
    last_name: string;

    @Field()
    @IsString()
    email: string;

    @Field()
    @IsString()
    @MinLength(6)
    password: string;
}
