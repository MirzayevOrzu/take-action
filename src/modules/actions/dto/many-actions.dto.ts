import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsInt, ValidateNested } from 'class-validator';
import { ActionDto } from './action.dto';

export class ManyActionsDto {
    @IsArray({ groups: ['create'] })
    @ArrayMinSize(1, { groups: ['create'] })
    @ValidateNested({ groups: ['create'] })
    @Type(() => ActionDto)
    actions: ActionDto[];

    @IsInt({ groups: ['create'] })
    playlist_id: number;
}
