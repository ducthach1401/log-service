import { DomainModel } from 'src/core/models/domain-model';

export class LogModel extends DomainModel {
  public readonly id: string;
  public readonly type: string;
  public readonly data: Record<string, any>;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(
    id: string,
    type: string,
    data: Record<string, any>,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super();
    this.id = id;
    this.type = type;
    this.data = data;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJson(showHidden: boolean): Record<string, any> {
    return this.filterHiddenIfNeed(
      {
        id: this.id,
        type: this.type,
        data: this.data,
        created_at: this.createdAt,
        updated_at: this.updatedAt,
      },
      showHidden,
    );
  }
}
