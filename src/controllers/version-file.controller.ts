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
  Version,
  File,
} from '../models';
import {VersionRepository} from '../repositories';

export class VersionFileController {
  constructor(
    @repository(VersionRepository) protected versionRepository: VersionRepository,
  ) { }

  @get('/versions/{id}/file', {
    responses: {
      '200': {
        description: 'Version has one File',
        content: {
          'application/json': {
            schema: getModelSchemaRef(File),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<File>,
  ): Promise<File> {
    return this.versionRepository.file(id).get(filter);
  }

  @post('/versions/{id}/file', {
    responses: {
      '200': {
        description: 'Version model instance',
        content: {'application/json': {schema: getModelSchemaRef(File)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Version.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(File, {
            title: 'NewFileInVersion',
            exclude: ['id'],
            optional: ['versionId']
          }),
        },
      },
    }) file: Omit<File, 'id'>,
  ): Promise<File> {
    return this.versionRepository.file(id).create(file);
  }

  @patch('/versions/{id}/file', {
    responses: {
      '200': {
        description: 'Version.File PATCH success count',
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
    return this.versionRepository.file(id).patch(file, where);
  }

  @del('/versions/{id}/file', {
    responses: {
      '200': {
        description: 'Version.File DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(File)) where?: Where<File>,
  ): Promise<Count> {
    return this.versionRepository.file(id).delete(where);
  }
}
