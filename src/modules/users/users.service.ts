import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { UserEntity, UserI } from '../../entities/user.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserI>,
    ) {}

    async create(payload): Promise<UserI> {
        const userDto = new UserDto();

        userDto.first_name = payload.first_name;
        userDto.last_name = payload.last_name;
        userDto.email = payload.email;
        userDto.password = payload.password;

        const errors = await validate(userDto, { groups: ['create'] });

        if (errors.length) {
            throw new BadRequestException(
                errors.reduce((prev, curr) => {
                    return [...prev, ...Object.values(curr.constraints)];
                }, []),
            );
        }

        const user = await this.userRepository.save(userDto);

        return user;
    }

    findOne(query: UserI): Promise<UserI> {
        return this.userRepository.findOne({ where: query });
    }
}
