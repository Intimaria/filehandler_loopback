import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {InMemoryClaseDataSource} from '../datasources';
import {Version, VersionRelations, File} from '../models';
import {FileRepository} from './file.repository';

export class VersionRepository extends DefaultCrudRepository<
  Version,
  typeof Version.prototype.id,
  VersionRelations
> {

  public readonly file: HasOneRepositoryFactory<File, typeof Version.prototype.id>;

  constructor(
    @inject('datasources.InMemoryClase') dataSource: InMemoryClaseDataSource, @repository.getter('FileRepository') protected fileRepositoryGetter: Getter<FileRepository>,
  ) {
    super(Version, dataSource);
    this.file = this.createHasOneRepositoryFactoryFor('file', fileRepositoryGetter);
    this.registerInclusionResolver('file', this.file.inclusionResolver);
  }
}
