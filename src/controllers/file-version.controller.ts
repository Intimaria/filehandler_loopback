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
  Version,
} from '../models';
import {FileRepository} from '../repositories';

export class FileVersionController {
  constructor(
    @repository(FileRepository) protected fileRepository: FileRepository,
  ) { }

  @get('/files/{id}/versions', {
    responses: {
      '200': {
        description: 'Array of File has many Version',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Version)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Version>,
  ): Promise<Version[]> {
    return this.fileRepository.versions(id).find(filter);
  }

  @post('/files/{id}/versions', {
    responses: {
      '200': {
        description: 'File model instance',
        content: {'application/json': {schema: getModelSchemaRef(Version)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof File.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Version, {
            title: 'NewVersionInFile',
            exclude: ['id'],
            optional: ['fileId']
          }),
        },
      },
    }) version: Omit<Version, 'id'>,
  ): Promise<Version> {
    return this.fileRepository.versions(id).create(version);
  }

  @patch('/files/{id}/versions', {
    responses: {
      '200': {
        description: 'File.Version PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Version, {partial: true}),
        },
      },
    })
    version: Partial<Version>,
    @param.query.object('where', getWhereSchemaFor(Version)) where?: Where<Version>,
  ): Promise<Count> {
    return this.fileRepository.versions(id).patch(version, where);
  }

  @del('/files/{id}/versions', {
    responses: {
      '200': {
        description: 'File.Version DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Version)) where?: Where<Version>,
  ): Promise<Count> {
    return this.fileRepository.versions(id).delete(where);
  }
}
