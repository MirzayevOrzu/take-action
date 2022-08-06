import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() payload) {
        return this.usersService.create(payload);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    profile(@Req() req: any) {
        return req.user;
    }
}
