import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ActionsService } from './actions.service';

@Controller('actions')
export class ActionsController {
    constructor(private readonly actionsService: ActionsService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    createMany(@Req() req, @Body() payload) {
        return this.actionsService.createMany(payload, req.user);
    }
}
