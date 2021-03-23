import { CrudRequest } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';

export class CrudHelper<T> extends TypeOrmCrudService<T> {
  constructor(repo: Repository<T>) {
    super(repo);
  }

  async deleteOne(req: CrudRequest): Promise<void | T> {
    const id = req.parsed.paramsFilter.find(
      (f) => f.field === 'id' && f.operator === '$eq',
    ).value;
    await this.repo.softRemove(id);
  }
}
