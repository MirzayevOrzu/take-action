import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserEntity } from '../../entities/user.entity';
import { PlaylistEntity } from '../../entities/playlist.entity';
import { ActionEntity } from '../../entities/actions.entity';

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
                    entities: [UserEntity, PlaylistEntity, ActionEntity],
                    migrations: ['src/migrations/*.{ts}'],
                    cli: {
                        entitiesDir: 'src/entities',
                        migrationsDir: 'src/migrations',
                    },
                } as TypeOrmModuleOptions),
            inject: [ConfigService],
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: 'schema.gql',
            installSubscriptionHandlers: true,
        }),
    ],
})
export class CoreModules {}
