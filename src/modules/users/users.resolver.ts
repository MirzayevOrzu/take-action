import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CurrentUser } from 'src/common/decorators/current-user';
import { UserI } from 'src/entities/user.entity';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { NewUserInput } from './dto/new-user.input';
import { User } from './models/user.model';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(GqlAuthGuard)
    @Query(() => User)
    async me(@CurrentUser() user): Promise<User> {
        return this.usersService.findOne({ id: user.id } as UserI);
    }

    @Mutation(() => User)
    addUser(@Args('newUserInput') newUserInput: NewUserInput): Promise<User> {
        return this.usersService.create(newUserInput);
    }
}
