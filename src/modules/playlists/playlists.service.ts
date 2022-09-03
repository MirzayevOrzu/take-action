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
import { Playlist } from './models/playlist.model';

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

    async list(query): Promise<Playlist[]> {
        const queryDto = new PlaylistDto();

        queryDto.user_id = query.user_id;

        const errors = await validate(queryDto, { groups: ['list'] });

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

        const errors = await validate(queryDto, { groups: ['show'] });

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

    async update(query, payload) {
        let playlist = await this.show(query);
        const payloadDto = new PlaylistDto();

        for (const i in payload) {
            // works with first layer properties only
            payloadDto[i] = payload[i];
        }

        const errors = await validate(payloadDto, {
            groups: ['update'],
            whitelist: true,
        });

        if (!Object.keys(payloadDto).length)
            throw new BadRequestException('Nothing sent to update');

        if (errors.length) {
            throw new BadRequestException(
                errors.reduce((prev, curr) => {
                    return [...prev, ...Object.values(curr.constraints)];
                }, []),
            );
        }

        for (const i in payloadDto) {
            // works with first layer properties only
            playlist[i] = payloadDto[i];
        }

        playlist = await this.playlistRepository.save(playlist);

        return playlist;
    }

    async delete(query) {
        const playlist = await this.show(query);

        return await this.playlistRepository.remove(playlist);
    }
}
