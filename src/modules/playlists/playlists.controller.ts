import {
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PlaylistsService } from './playlists.service';

@Controller('playlists')
export class PlaylistsController {
    constructor(
        private readonly playlistsService: PlaylistsService,
        @Inject('PUB_SUB') private readonly pubSub: PubSub,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Req() req: any, @Body() payload) {
        const playlist = await this.playlistsService.create({
            ...payload,
            user_id: req.user.id,
        });

        this.pubSub.publish('playlistAdded', { playlistAdded: playlist });

        return playlist;
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    list(@Req() req: any) {
        return this.playlistsService.list({ user_id: req.user.id });
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    show(@Req() req: any, @Param('id', ParseIntPipe) id: number) {
        return this.playlistsService.show({ id, user_id: req.user.id });
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(
        @Req() req: any,
        @Param('id', ParseIntPipe) id: number,
        @Body() payload,
    ) {
        return this.playlistsService.update(
            { id, user_id: req.user.id },
            payload,
        );
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    delete(@Req() req: any, @Param('id', ParseIntPipe) id: number) {
        return this.playlistsService.delete({ id, user_id: req.user.id });
    }
}
