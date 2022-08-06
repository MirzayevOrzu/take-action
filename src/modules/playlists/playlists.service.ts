import {
    Injectable,
    BadRequestException,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { PlaylistEntity, PlaylistI } from '../../entities/playlist.entity';
import { PlaylistDto } from './dto/playlist.dto';

@Injectable()
export class PlaylistsService {
    constructor(
        @InjectRepository(PlaylistEntity)
        private playlistRepository: Repository<PlaylistI>,
    ) {}

    async create(payload): Promise<PlaylistI> {
        const playlistDto = new PlaylistDto();

        playlistDto.title = payload.title;
        playlistDto.description = payload.description;
        playlistDto.user_id = payload.user_id;

        const errors = await validate(playlistDto, { groups: ['create'] });

        if (errors.length) {
            throw new BadRequestException(
                errors.reduce((prev, curr) => {
                    return [...prev, ...Object.values(curr.constraints)];
                }, []),
            );
        }

        const playlist = await this.playlistRepository.save(playlistDto);

        return playlist;
    }

    async list(query): Promise<PlaylistI[]> {
        const queryDto = new PlaylistDto();

        queryDto.user_id = query.user_id;

        const errors = await validate(query, { groups: ['list'] });

        if (errors.length) {
            throw new BadRequestException(
                errors.reduce((prev, curr) => {
                    return [...prev, ...Object.values(curr.constraints)];
                }, []),
            );
        }

        const playlists = await this.playlistRepository.find({
            where: queryDto,
        });

        return playlists;
    }

    async show(query) {
        const queryDto = new PlaylistDto();

        queryDto.id = query.id;
        queryDto.user_id = query.user_id;

        const errors = await validate(query, { groups: ['show'] });

        if (errors.length) {
            throw new BadRequestException(
                errors.reduce((prev, curr) => {
                    return [...prev, ...Object.values(curr.constraints)];
                }, []),
            );
        }

        const playlist = await this.playlistRepository.findOne({
            where: queryDto,
        });

        if (!playlist) {
            throw new NotFoundException();
        }

        return playlist;
    }
}
