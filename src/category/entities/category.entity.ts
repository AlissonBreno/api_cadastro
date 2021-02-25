import { IsNotEmpty } from 'class-validator';
import { EstablishmentEntity } from '../../establishment/entities/establishment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('category', { synchronize: true })
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id_categoria: number;

  @IsNotEmpty()
  @Column({ type: 'varchar', length: 150 })
  categoria: string;

  @Column({ type: 'varchar', length: 100 })
  url_icon: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(
    () => EstablishmentEntity,
    (estabelecimento) => estabelecimento.categoria
  )
  estabelecimento: EstablishmentEntity;
}
