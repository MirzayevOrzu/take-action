import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class PlaylistDto {
    @IsInt({ groups: ['show'] })
    id: number;

    @IsOptional({ groups: ['update'] })
    @IsString({ groups: ['create', 'update'] })
    @MaxLength(100, { groups: ['create', 'update'] })
    title: string;

    @IsOptional({ groups: ['update'] })
    @IsString({ groups: ['create', 'update'] })
    @MaxLength(250, { groups: ['create', 'update'] })
    description: string;

    @IsOptional({ groups: ['update'] })
    @IsInt({ groups: ['create', 'update', 'list', 'show'] })
    user_id: number;
}
