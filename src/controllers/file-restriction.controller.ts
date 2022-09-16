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
  File,
  Restriction,
} from '../models';
import {FileRepository} from '../repositories';

export class FileRestrictionController {
  constructor(
    @repository(FileRepository) protected fileRepository: FileRepository,
  ) { }

  @get('/files/{id}/restriction', {
    responses: {
      '200': {
        description: 'File has one Restriction',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Restriction),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Restriction>,
  ): Promise<Restriction> {
    return this.fileRepository.restriction(id).get(filter);
  }

  @post('/files/{id}/restriction', {
    responses: {
      '200': {
        description: 'File model instance',
        content: {'application/json': {schema: getModelSchemaRef(Restriction)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof File.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Restriction, {
            title: 'NewRestrictionInFile',
            exclude: ['id'],
            optional: ['fileId']
          }),
        },
      },
    }) restriction: Omit<Restriction, 'id'>,
  ): Promise<Restriction> {
    return this.fileRepository.restriction(id).create(restriction);
  }

  @patch('/files/{id}/restriction', {
    responses: {
      '200': {
        description: 'File.Restriction PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Restriction, {partial: true}),
        },
      },
    })
    restriction: Partial<Restriction>,
    @param.query.object('where', getWhereSchemaFor(Restriction)) where?: Where<Restriction>,
  ): Promise<Count> {
    return this.fileRepository.restriction(id).patch(restriction, where);
  }

  @del('/files/{id}/restriction', {
    responses: {
      '200': {
        description: 'File.Restriction DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Restriction)) where?: Where<Restriction>,
  ): Promise<Count> {
    return this.fileRepository.restriction(id).delete(where);
  }
}
