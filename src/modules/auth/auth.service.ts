import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserI } from '../../entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { validate } from 'class-validator';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne({ email } as UserI);

        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(payload: UserI) {
        const loginDto = new LoginDto();

        loginDto.email = payload.email;
        loginDto.password = payload.password;

        const errors = await validate(loginDto);

        if (errors.length) {
            throw new BadRequestException(
                errors.reduce((prev, curr) => {
                    return [...prev, ...Object.values(curr.constraints)];
                }, []),
            );
        }

        const user = await this.validateUser(loginDto.email, loginDto.password);

        if (!user) {
            throw new BadRequestException('Invalid credentials');
        }

        return {
            access_token: this.jwtService.sign(user),
        };
    }
}
