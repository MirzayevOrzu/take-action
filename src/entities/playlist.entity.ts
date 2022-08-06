import { EntitySchema } from 'typeorm';

export interface PlaylistI {
    id: number;
    title: string;
    description: string;
    user_id: number;
}

export const PlaylistEntity = new EntitySchema<PlaylistI>({
    name: 'playlists',
    columns: {
        id: {
            primary: true,
            type: 'integer',
            generated: 'increment',
        },
        title: {
            type: 'varchar',
            length: 100,
        },
        description: {
            type: 'varchar',
            length: 250,
        },
    },
    relations: {
        user_id: {
            type: 'many-to-one',
            target: 'users',
        },
    },
});
