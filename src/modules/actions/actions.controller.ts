import {
    Body,
    Controller,
    Get,
    ParseIntPipe,
    Post,
    Query,
    Req,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ActionsService } from './actions.service';

@Controller('actions')
export class ActionsController {
    constructor(private readonly actionsService: ActionsService) {}

    @UseGuards(JwtAuthGuard)
    @Post('many')
    createMany(@Req() req, @Body() payload) {
        return this.actionsService.createMany(payload, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    list(@Req() req, @Query('playlist_id', ParseIntPipe) playlist_id) {
        return this.actionsService.list({ playlist_id, user_id: req.user.id });
    }
}
