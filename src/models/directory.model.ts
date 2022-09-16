import {Entity, model, property, hasMany} from '@loopback/repository';
import {File} from './file.model';

@model()
export class Directory extends Entity {
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
  name: string;

  @property({
    type: 'date',
    required: true,
  })
  created: string;

  @property({
    type: 'string',
  })
  userId?: string;

  @hasMany(() => File)
  files: File[];

  @property({
    type: 'string',
  })
  fileId?: string;

  constructor(data?: Partial<Directory>) {
    super(data);
  }
}

export interface DirectoryRelations {
  // describe navigational properties here
}

export type DirectoryWithRelations = Directory & DirectoryRelations;
