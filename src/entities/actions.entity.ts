import { EntitySchema } from 'typeorm';
import { PlaylistI } from './playlist.entity';
import { UserI } from './user.ent

export enum ActionStatus {
    TODO = 'todo',
    IN_PROCESS = 'in_process',
    DONE = 'done',
}

export interface ActionI {
    id: number;
    name: string;
    link: string;
    order: number;
    status: ActionStatus;
    playlist_id: number | PlaylistI;
    user_id: number | UserI;
    created_at: Date;
}

export const ActionEntity = new EntitySchema<ActionI>({
    name: 'actions',
    columns: {
        id: {
            primary: true,
            type: 'integer',
            generated: 'increment',
        },
        name: {
            type: 'varchar',
            length: 100,
        },
        link: {
            type: 'varchar',
            length: 250,
        },
        order: {
            type: 'smallint',
        },
        status: {
            type: 'enum',
            enum: ActionStatus,
            default: ActionStatus.TODO,
        },
        created_at: {
            type: 'timestamp',
            default: () => 'NOW()',
        },
    },
    relations: {
        playlist_id: {
            type: 'many-to-one',
            target: 'playlists',
            joinColumn: {
                name: 'playlist_id',
            },
            joinTable: false,
        },
        user_id: {
            type: 'many-to-one',
            target: 'users',
            joinColumn: {
                name: 'user_id',
            },
            joinTable: false,
        },
    },
});
