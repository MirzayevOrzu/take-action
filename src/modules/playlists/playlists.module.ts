import { forwardRef, Module } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { PlaylistsController } from './playlists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistEntity } from '../../entities/playlist.entity';
import { PlaylistsResolver } from './playlists.resolver';
import { PubSub } from 'graphql-subscriptions';
import { ActionsModule } from '../actions/actions.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([PlaylistEntity]),
        forwardRef(() => ActionsModule),
    ],
    controllers: [PlaylistsController],
    providers: [
        { provide: 'PUB_SUB', useValue: new PubSub() },
        PlaylistsService,
        PlaylistsResolver,
    ],
    exports: [PlaylistsService],
})
export class PlaylistsModule {}
