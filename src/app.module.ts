import { Module } from '@nestjs/common';
import { CoreModules } from './common/modules/CoreModules';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PlaylistsModule } from './modules/playlists/playlists.module';

@Module({
    imports: [CoreModules, UsersModule, AuthModule, PlaylistsModule],
})
export class AppModule {}
