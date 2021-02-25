import { IsNotEmpty } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  categoria: string;

  @Column({ type: 'varchar' })
  url_icon: string;

  @CreateDateColumn({ type: 'timestamp' })
  data_cadastro: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updateAt: Date;
}
