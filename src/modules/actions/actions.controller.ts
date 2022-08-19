import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Patch,
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
    list(@Req() req: any, @Query('playlist_id', ParseIntPipe) playlist_id) {
        return this.actionsService.list({ playlist_id, user_id: req.user.id });
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(
        @Req() req: any,
        @Param('id', ParseIntPipe) id: number,
        @Body() payload,
    ) {
        return this.actionsService.update(
            { id, user_id: req.user.id },
            payload,
        );
    }
}
