import { IsNotEmpty } from 'class-validator';
import { EstablishmentEntity } from '../../establishment/entities/establishment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
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
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(
    () => EstablishmentEntity,
    (establishment) => establishment.categoria
  )
  @JoinColumn({ name: 'id_spc_brasil' })
  establishment: EstablishmentEntity;
}
