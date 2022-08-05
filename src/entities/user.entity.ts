import { EntitySchema } from 'typeorm';

export interface UserI {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

export const UserEntity = new EntitySchema<UserI>({
    name: 'users',
    columns: {
        id: {
            primary: true,
            type: 'integer',
            generated: 'increment',
        },
        first_name: {
            type: 'varchar',
            length: 30,
        },
        last_name: {
            type: 'varchar',
            length: 30,
        },
        email: {
            type: 'varchar',
            length: 50,
        },
        password: {
            type: 'varchar',
            length: 250,
        },
    },
    uniques: [
        {
            name: 'USER_UNIQUE_EMAIL',
            columns: ['email'],
        },
    ],
});
