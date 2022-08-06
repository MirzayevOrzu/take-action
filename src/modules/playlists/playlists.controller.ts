import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PlaylistsService } from './playlists.service';

@Controller('playlists')
export class PlaylistsController {
    constructor(private readonly playlistsService: PlaylistsService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Req() req: any, @Body() payload) {
        return this.playlistsService.create({
            ...payload,
            user_id: req.user.id,
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    list(@Req() req: any) {
        return this.playlistsService.list({ user_id: req.user.id });
    }
}
