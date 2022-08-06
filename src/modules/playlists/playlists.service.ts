import { Injectable, BadRequestException } from '@nestjs/common';
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
}
