import { Module } from '@nestjs/common';
import { CoreModules } from './common/modules/CoreModules';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PlaylistsModule } from './modules/playlists/playlists.module';
import { ActionsModule } from './modules/actions/actions.module';

@Module({
    imports: [CoreModules, UsersModule, AuthModule, PlaylistsModule, ActionsModule],
})
export class AppModule {}
