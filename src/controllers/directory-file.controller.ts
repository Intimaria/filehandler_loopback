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
  Directory,
  File,
} from '../models';
import {DirectoryRepository} from '../repositories';

export class DirectoryFileController {
  constructor(
    @repository(DirectoryRepository) protected directoryRepository: DirectoryRepository,
  ) { }

  @get('/directories/{id}/files', {
    responses: {
      '200': {
        description: 'Array of Directory has many File',
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
    return this.directoryRepository.files(id).find(filter);
  }

  @post('/directories/{id}/files', {
    responses: {
      '200': {
        description: 'Directory model instance',
        content: {'application/json': {schema: getModelSchemaRef(File)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Directory.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(File, {
            title: 'NewFileInDirectory',
            exclude: ['id'],
            optional: ['directoryId']
          }),
        },
      },
    }) file: Omit<File, 'id'>,
  ): Promise<File> {
    return this.directoryRepository.files(id).create(file);
  }

  @patch('/directories/{id}/files', {
    responses: {
      '200': {
        description: 'Directory.File PATCH success count',
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
    return this.directoryRepository.files(id).patch(file, where);
  }

  @del('/directories/{id}/files', {
    responses: {
      '200': {
        description: 'Directory.File DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(File)) where?: Where<File>,
  ): Promise<Count> {
    return this.directoryRepository.files(id).delete(where);
  }
}
