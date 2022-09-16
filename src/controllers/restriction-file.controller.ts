import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Restriction,
  File,
} from '../models';
import {RestrictionRepository} from '../repositories';

export class RestrictionFileController {
  constructor(
    @repository(RestrictionRepository) protected restrictionRepository: RestrictionRepository,
  ) { }

  @get('/restrictions/{id}/files', {
    responses: {
      '200': {
        description: 'Array of Restriction has many File',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(File)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<File>,
  ): Promise<File[]> {
    return this.restrictionRepository.files(id).find(filter);
  }

  @post('/restrictions/{id}/files', {
    responses: {
      '200': {
        description: 'Restriction model instance',
        content: {'application/json': {schema: getModelSchemaRef(File)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Restriction.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(File, {
            title: 'NewFileInRestriction',
            exclude: ['id'],
            optional: ['restrictionId']
          }),
        },
      },
    }) file: Omit<File, 'id'>,
  ): Promise<File> {
    return this.restrictionRepository.files(id).create(file);
  }

  @patch('/restrictions/{id}/files', {
    responses: {
      '200': {
        description: 'Restriction.File PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(File, {partial: true}),
        },
      },
    })
    file: Partial<File>,
    @param.query.object('where', getWhereSchemaFor(File)) where?: Where<File>,
  ): Promise<Count> {
    return this.restrictionRepository.files(id).patch(file, where);
  }

  @del('/restrictions/{id}/files', {
    responses: {
      '200': {
        description: 'Restriction.File DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(File)) where?: Where<File>,
  ): Promise<Count> {
    return this.restrictionRepository.files(id).delete(where);
  }
}
