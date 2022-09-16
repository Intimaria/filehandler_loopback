import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {InMemoryClaseDataSource} from '../datasources';
import {Directory, DirectoryRelations, File} from '../models';
import {FileRepository} from './file.repository';

export class DirectoryRepository extends DefaultCrudRepository<
  Directory,
  typeof Directory.prototype.id,
  DirectoryRelations
> {

  public readonly files: HasManyRepositoryFactory<File, typeof Directory.prototype.id>;

  constructor(
    @inject('datasources.InMemoryClase') dataSource: InMemoryClaseDataSource, @repository.getter('FileRepository') protected fileRepositoryGetter: Getter<FileRepository>,
  ) {
    super(Directory, dataSource);
    this.files = this.createHasManyRepositoryFactoryFor('files', fileRepositoryGetter,);
    this.registerInclusionResolver('files', this.files.inclusionResolver);
  }
}
