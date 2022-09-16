import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {Version} from './version.model';
import {Restriction} from './restriction.model';

@model()
export class File extends Entity {
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
    type: 'number',
    required: true,
  })
  size: number;

  @property({
    type: 'date',
    required: true,
  })
  upload_date: string;

  @property({
    type: 'string',
    required: true,
  })
  download_link: string;

  @property({
    type: 'number',
    required: true,
  })
  download_count: number;

  @property({
    type: 'string',
  })
  directoryId?: string;

  @hasMany(() => Version)
  versions: Version[];

  @property({
    type: 'string',
  })
  versionId?: string;

  @hasOne(() => Restriction)
  restriction: Restriction;

  @property({
    type: 'string',
  })
  restrictionId?: string;

  constructor(data?: Partial<File>) {
    super(data);
  }
}

export interface FileRelations {
  // describe navigational properties here
}

export type FileWithRelations = File & FileRelations;
