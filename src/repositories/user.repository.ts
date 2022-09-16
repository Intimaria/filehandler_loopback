import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {InMemoryClaseDataSource} from '../datasources';
import {User, UserRelations, Directory, File, Account} from '../models';
import {DirectoryRepository} from './directory.repository';
import {FileRepository} from './file.repository';
import {AccountRepository} from './account.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly directories: HasManyRepositoryFactory<Directory, typeof User.prototype.id>;

  public readonly files: HasManyThroughRepositoryFactory<File, typeof File.prototype.id,
          Directory,
          typeof User.prototype.id
        >;

  public readonly account: HasOneRepositoryFactory<Account, typeof User.prototype.id>;

  constructor(
    @inject('datasources.InMemoryClase') dataSource: InMemoryClaseDataSource, @repository.getter('DirectoryRepository') protected directoryRepositoryGetter: Getter<DirectoryRepository>, @repository.getter('FileRepository') protected fileRepositoryGetter: Getter<FileRepository>, @repository.getter('AccountRepository') protected accountRepositoryGetter: Getter<AccountRepository>,
  ) {
    super(User, dataSource);
    this.account = this.createHasOneRepositoryFactoryFor('account', accountRepositoryGetter);
    this.registerInclusionResolver('account', this.account.inclusionResolver);
    this.files = this.createHasManyThroughRepositoryFactoryFor('files', fileRepositoryGetter, directoryRepositoryGetter,);
    this.registerInclusionResolver('files', this.files.inclusionResolver);
    this.directories = this.createHasManyRepositoryFactoryFor('directories', directoryRepositoryGetter,);
    this.registerInclusionResolver('directories', this.directories.inclusionResolver);
  }
}
