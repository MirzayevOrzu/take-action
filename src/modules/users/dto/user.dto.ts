import { IsString, MinLength, IsOptional } from 'class-validator';

export class UserDto {
    @IsOptional({ groups: ['update'] })
    @IsString({ groups: ['create', 'update'] })
    first_name: string;

    @IsOptional({ groups: ['update'] })
    @IsString({ groups: ['create', 'update'] })
    last_name: string;

    @IsOptional({ groups: ['update'] })
    @IsString({ groups: ['create', 'update'] })
    email: string;

    @IsOptional({ groups: ['update'] })
    @IsString({ groups: ['create'] })
    @MinLength(6, { groups: ['create'] })
    password: string;
}
