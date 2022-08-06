import { Body, Controller, Post } from '@nestjs/common';
import { UserI } from 'src/entities/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    login(@Body() payload: UserI) {
        return this.authService.login(payload);
    }
}
