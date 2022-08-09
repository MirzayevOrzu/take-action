import { Module } from '@nestjs/common';
import { ActionsService } from './actions.service';
import { ActionsController } from './actions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionEntity } from '../../entities/actions.entity';
import { PlaylistsModule } from '../playlists/playlists.module';

@Module({
    imports: [TypeOrmModule.forFeature([ActionEntity]), PlaylistsModule],
    controllers: [ActionsController],
    providers: [ActionsService],
})
export class ActionsModule {}
