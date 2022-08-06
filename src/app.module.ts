import { Module } from '@nestjs/common';
import { CoreModules } from './common/modules/CoreModules';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

@Module({
    imports: [CoreModules, UsersModule, AuthModule],
})
export class AppModule {}
