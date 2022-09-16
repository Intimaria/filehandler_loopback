import {Entity, model, property} from '@loopback/repository';

@model()
export class Restriction extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  password?: string;

  @property({
    type: 'number',
  })
  time_limit?: number;

  @property({
    type: 'string',
  })
  fileId?: string;

  constructor(data?: Partial<Restriction>) {
    super(data);
  }
}

export interface RestrictionRelations {
  // describe navigational properties here
}

export type RestrictionWithRelations = Restriction & RestrictionRelations;
