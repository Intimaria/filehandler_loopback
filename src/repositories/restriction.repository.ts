import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {InMemoryClaseDataSource} from '../datasources';
import {Restriction, RestrictionRelations, File} from '../models';
import {FileRepository} from './file.repository';

export class RestrictionRepository extends DefaultCrudRepository<
  Restriction,
  typeof Restriction.prototype.id,
  RestrictionRelations
> {

  public readonly files: HasManyRepositoryFactory<File, typeof Restriction.prototype.id>;

  constructor(
    @inject('datasources.InMemoryClase') dataSource: InMemoryClaseDataSource, @repository.getter('FileRepository') protected fileRepositoryGetter: Getter<FileRepository>,
  ) {
    super(Restriction, dataSource);
    this.files = this.createHasManyRepositoryFactoryFor('files', fileRepositoryGetter,);
  }
}
