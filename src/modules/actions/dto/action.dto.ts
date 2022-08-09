import { PickType } from '@nestjs/mapped-types';
import { IsInt, IsString, MaxLength } from 'class-validator';

export class ActionDto {
    @IsString({ groups: ['create'] })
    @MaxLength(100, { groups: ['create'] })
    name: string;

    @IsString({ groups: ['create'] })
    @MaxLength(250, { groups: ['create'] })
    link: string;
}
