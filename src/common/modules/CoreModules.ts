import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserEntity } from '../../entities/user.entity';
import { PlaylistEntity } from '../../entities/playlist.entity';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) =>
                ({
                    type: configService.get('POSTGRES_TYPE'),
                    host: configService.get('POSTGRES_HOST') || 'localhost',
                    port: configService.get('POSTGRES_PORT') || 5432,
                    username: configService.get('POSTGRES_USERNAME'),
                    password: configService.get('POSTGRES_PASSWORD'),
                    database: configService.get('POSTGRES_DB'),
                    synchronize: true,
                    logging: configService.get('POSTGRES_LOG') === 'true',
                    entities: [UserEntity, PlaylistEntity],
                    migrations: ['src/migrations/*.{ts}'],
                    cli: {
                        entitiesDir: 'src/entities',
                        migrationsDir: 'src/migrations',
                    },
                } as TypeOrmModuleOptions),
            inject: [ConfigService],
        }),
    ],
})
export class CoreModules {}
