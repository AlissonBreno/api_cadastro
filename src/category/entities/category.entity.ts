import { IsNotEmpty } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('category', { synchronize: true })
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ type: 'varchar', length: 150 })
  categoria: string;

  @Column({ type: 'varchar', length: 100 })
  url_icon: string;

  @CreateDateColumn({ type: 'timestamp' })
  data_cadastro: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updateAt: Date;
}
