import {Entity, hasOne, model, property} from '@loopback/repository';
import {File} from './file.model';

@model()
export class Version extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @property({
    type: 'string',
  })
  fileId?: string;

  @hasOne(() => File)
  file: File;

  constructor(data?: Partial<Version>) {
    super(data);
  }
}

export interface VersionRelations {
  // describe navigational properties here
}

export type VersionWithRelations = Version & VersionRelations;
