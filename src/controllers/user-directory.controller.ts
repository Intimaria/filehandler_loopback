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
} from '../models';
import {UserRepository} from '../repositories';

export class UserDirectoryController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/directories', {
    responses: {
      '200': {
        description: 'Array of User has many Directory',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Directory)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Directory>,
  ): Promise<Directory[]> {
    return this.userRepository.directories(id).find(filter);
  }

  @post('/users/{id}/directories', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Directory)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Directory, {
            title: 'NewDirectoryInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) directory: Omit<Directory, 'id'>,
  ): Promise<Directory> {
    return this.userRepository.directories(id).create(directory);
  }

  @patch('/users/{id}/directories', {
    responses: {
      '200': {
        description: 'User.Directory PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Directory, {partial: true}),
        },
      },
    })
    directory: Partial<Directory>,
    @param.query.object('where', getWhereSchemaFor(Directory)) where?: Where<Directory>,
  ): Promise<Count> {
    return this.userRepository.directories(id).patch(directory, where);
  }

  @del('/users/{id}/directories', {
    responses: {
      '200': {
        description: 'User.Directory DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Directory)) where?: Where<Directory>,
  ): Promise<Count> {
    return this.userRepository.directories(id).delete(where);
  }
}
