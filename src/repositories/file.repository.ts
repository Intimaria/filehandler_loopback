import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {InMemoryClaseDataSource} from '../datasources';
import {File, FileRelations, Version, Restriction} from '../models';
import {VersionRepository} from './version.repository';
import {RestrictionRepository} from './restriction.repository';

export class FileRepository extends DefaultCrudRepository<
  File,
  typeof File.prototype.id,
  FileRelations
> {

  public readonly versions: HasManyRepositoryFactory<Version, typeof File.prototype.id>;

  public readonly restriction: HasOneRepositoryFactory<Restriction, typeof File.prototype.id>;

  constructor(
    @inject('datasources.InMemoryClase') dataSource: InMemoryClaseDataSource, @repository.getter('VersionRepository') protected versionRepositoryGetter: Getter<VersionRepository>, @repository.getter('RestrictionRepository') protected restrictionRepositoryGetter: Getter<RestrictionRepository>,
  ) {
    super(File, dataSource);
    this.restriction = this.createHasOneRepositoryFactoryFor('restriction', restrictionRepositoryGetter);
    this.registerInclusionResolver('restriction', this.restriction.inclusionResolver);
    this.versions = this.createHasManyRepositoryFactoryFor('versions', versionRepositoryGetter,);
    this.registerInclusionResolver('versions', this.versions.inclusionResolver);
  }
}
