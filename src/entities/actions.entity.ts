import { EntitySchema } from 'typeorm';

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
    playlist_id: number;
    user_id: number;
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
        },
        user_id: {
            type: 'many-to-one',
            target: 'users',
        },
    },
});
