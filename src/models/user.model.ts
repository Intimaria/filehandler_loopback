import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {Directory} from './directory.model';
import {File} from './file.model';
import {Account} from './account.model';

@model()
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @hasMany(() => Directory)
  directories: Directory[];

  @hasMany(() => File, {through: {model: () => Directory}})
  files: File[];

  @hasOne(() => Account)
  account: Account;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
