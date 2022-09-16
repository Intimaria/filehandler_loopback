import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Directory} from '../models';
import {DirectoryRepository} from '../repositories';

export class DirectoryController {
  constructor(
    @repository(DirectoryRepository)
    public directoryRepository : DirectoryRepository,
  ) {}

  @post('/directories')
  @response(200, {
    description: 'Directory model instance',
    content: {'application/json': {schema: getModelSchemaRef(Directory)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Directory, {
            title: 'NewDirectory',
            exclude: ['id'],
          }),
        },
      },
    })
    directory: Omit<Directory, 'id'>,
  ): Promise<Directory> {
    return this.directoryRepository.create(directory);
  }

  @get('/directories/count')
  @response(200, {
    description: 'Directory model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Directory) where?: Where<Directory>,
  ): Promise<Count> {
    return this.directoryRepository.count(where);
  }

  @get('/directories')
  @response(200, {
    description: 'Array of Directory model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Directory, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Directory) filter?: Filter<Directory>,
  ): Promise<Directory[]> {
    return this.directoryRepository.find(filter);
  }

  @patch('/directories')
  @response(200, {
    description: 'Directory PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Directory, {partial: true}),
        },
      },
    })
    directory: Directory,
    @param.where(Directory) where?: Where<Directory>,
  ): Promise<Count> {
    return this.directoryRepository.updateAll(directory, where);
  }

  @get('/directories/{id}')
  @response(200, {
    description: 'Directory model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Directory, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Directory, {exclude: 'where'}) filter?: FilterExcludingWhere<Directory>
  ): Promise<Directory> {
    return this.directoryRepository.findById(id, filter);
  }

  @patch('/directories/{id}')
  @response(204, {
    description: 'Directory PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Directory, {partial: true}),
        },
      },
    })
    directory: Directory,
  ): Promise<void> {
    await this.directoryRepository.updateById(id, directory);
  }

  @put('/directories/{id}')
  @response(204, {
    description: 'Directory PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() directory: Directory,
  ): Promise<void> {
    await this.directoryRepository.replaceById(id, directory);
  }

  @del('/directories/{id}')
  @response(204, {
    description: 'Directory DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.directoryRepository.deleteById(id);
  }
}
