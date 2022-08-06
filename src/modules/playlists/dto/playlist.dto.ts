import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class PlaylistDto {
    @IsOptional({ groups: ['update'] })
    @IsString({ groups: ['create', 'update'] })
    @MaxLength(100, { groups: ['create', 'update'] })
    title: string;

    @IsOptional({ groups: ['update'] })
    @IsString({ groups: ['create', 'update'] })
    @MaxLength(250, { groups: ['create', 'update'] })
    description: string;

    @IsOptional({ groups: ['update'] })
    @IsInt({ groups: ['create', 'update', 'list'] })
    user_id: number;
}
