import { Module } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { PlaylistsController } from './playlists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistEntity } from '../../entities/playlist.entity';
import { PlaylistsResolver } from './playlists.resolver';

@Module({
    imports: [TypeOrmModule.forFeature([PlaylistEntity])],
    controllers: [PlaylistsController],
    providers: [PlaylistsService, PlaylistsResolver],
    exports: [PlaylistsService],
})
export class PlaylistsModule {}
