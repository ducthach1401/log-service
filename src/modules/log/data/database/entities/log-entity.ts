import { LogModel } from 'src/modules/log/domain/models/log-model';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('logs')
export class LogEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  type: string;

  @Column({ type: 'jsonb' })
  data: Record<string, any>;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  toModel(): LogModel {
    return new LogModel(
      this.id,
      this.type,
      this.data,
      this.created_at,
      this.updated_at,
    );
  }
}
