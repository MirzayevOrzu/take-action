import { Module } from '@nestjs/common';
import { CoreModules } from './common/modules/CoreModules';
import { UsersModule } from './modules/users/users.module';

@Module({
    imports: [CoreModules, UsersModule],
})
export class AppModule {}
