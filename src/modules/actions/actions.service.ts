import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { computeValidationErrors } from 'src/common/utils/compute-validation-err';
import { ActionEntity, ActionI } from 'src/entities/actions.entity';
import { Repository } from 'typeorm';
import { PlaylistsService } from '../playlists/playlists.service';
import { ActionDto } from './dto/action.dto';
import { ManyActionsDto } from './dto/many-actions.dto';

@Injectable()
export class ActionsService {
    constructor(
        @InjectRepository(ActionEntity)
        private actionRepository: Repository<ActionI>,
        private playlistsService: PlaylistsService,
    ) {}

    async createMany(payload, user): Promise<ActionI[]> {
        const actionsDto = plainToClass(ManyActionsDto, payload);

        const errors = await validate(actionsDto, {
            whitelist: true,
            groups: ['create'],
        });

        if (errors.length) {
            throw new BadRequestException(computeValidationErrors(errors));
        }

        const { playlist_id } = actionsDto;

        await this.playlistsService.show({
            id: playlist_id,
            user_id: user.id,
        });

        return this.actionRepository.save(
            actionsDto.actions.map((a, i) => ({
                ...a,
                order: i + 1,
                playlist_id,
                user_id: user.id,
            })),
        );
    }

    async list(query) {
        const queryDto = new ActionDto();

        queryDto.user_id = query.user_id;
        queryDto.playlist_id = query.playlist_id;

        const errors = await validate(queryDto, { groups: ['list'] });

        if (errors.length) {
            throw new BadRequestException(computeValidationErrors(errors));
        }

        const actions = await this.actionRepository.find({
            where: {
                playlist_id: {
                    id: queryDto.playlist_id,
                },
                user_id: {
                    id: queryDto.user_id,
                },
            },
        });

        return actions;
    }

    async show(query) {
        const queryDto = new ActionDto();

        queryDto.id = query.id;
        queryDto.user_id = query.user_id;
        queryDto.playlist_id = query.playlist_id;

        const errors = await validate(query, { groups: ['show'] });

        if (errors.length) {
            throw new BadRequestException(computeValidationErrors(errors));
        }

        const action = await this.actionRepository.findOne({
            where: queryDto,
        });

        if (!action) {
            throw new NotFoundException();
        }

        return action;
    }

    async update(query, payload) {
        let action = await this.show(query);
        const payloadDto = new ActionDto();

        for (const i in payload) {
            payloadDto[i] = payload[i];
        }

        const errors = await validate(payloadDto, { groups: ['update'] });

        if (!Object.keys(payloadDto).length)
            throw new BadRequestException('Nothing sent to update');

        if (errors.length) {
            throw new BadRequestException(computeValidationErrors(errors));
        }

        for (const i in payloadDto) {
            action[i] = payloadDto[i];
        }

        action = await this.actionRepository.save(action);

        return action;
    }
}
