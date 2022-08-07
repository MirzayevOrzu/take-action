import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
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
