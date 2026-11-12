import type { UserType } from './user-type.ts';

import { EntitySchema } from 'typeorm';

export interface User {
    id: number;
    username: string;
    password: string;
    userType?: UserType;
}

export const userSchema = new EntitySchema<User>({
    name: 'User',
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: 'increment'
        },
        username: {
            type: 'varchar',
            length: 32,
            nullable: false
        },
        password: {
            type: 'varchar',
            length: 128,
            nullable: false
        }
    },
    relations: {
        userType: {
            target: 'UserType',
            type: 'many-to-one',
            inverseSide: 'users'
        }
    }
})