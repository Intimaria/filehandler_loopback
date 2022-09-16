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
User,
Directory,
File,
} from '../models';
import {UserRepository} from '../repositories';

export class UserFileController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/files', {
    responses: {
      '200': {
        description: 'Array of User has many File through Directory',
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
    return this.userRepository.files(id).find(filter);
  }

  @post('/users/{id}/files', {
    responses: {
      '200': {
        description: 'create a File model instance',
        content: {'application/json': {schema: getModelSchemaRef(File)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(File, {
            title: 'NewFileInUser',
            exclude: ['id'],
          }),
        },
      },
    }) file: Omit<File, 'id'>,
  ): Promise<File> {
    return this.userRepository.files(id).create(file);
  }

  @patch('/users/{id}/files', {
    responses: {
      '200': {
        description: 'User.File PATCH success count',
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
    return this.userRepository.files(id).patch(file, where);
  }

  @del('/users/{id}/files', {
    responses: {
      '200': {
        description: 'User.File DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(File)) where?: Where<File>,
  ): Promise<Count> {
    return this.userRepository.files(id).delete(where);
  }
}
