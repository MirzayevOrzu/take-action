import {
    IsEnum,
    IsInt,
    IsOptional,
    IsString,
    MaxLength,
} from 'class-validator';
import { ActionStatus } from 'src/entities/actions.entity';

export class ActionDto {
    @IsInt({ groups: ['show'] })
    id: number;

    @IsOptional({ groups: ['update'] })
    @IsString({ groups: ['create', 'update'] })
    @MaxLength(100, { groups: ['create', 'update'] })
    name: string;

    @IsOptional({ groups: ['update'] })
    @IsString({ groups: ['create', 'update'] })
    @MaxLength(250, { groups: ['create', 'update'] })
    link: string;

    @IsInt({ groups: ['list', 'show'] })
    playlist_id: number;

    @IsInt({ groups: ['list', 'show'] })
    user_id: number;

    @IsOptional({ groups: ['update'] })
    @IsEnum(ActionStatus, { groups: ['update'] })
    status: ActionStatus;
}
