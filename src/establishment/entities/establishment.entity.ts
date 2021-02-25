import { IsNotEmpty } from 'class-validator';
import { CategoryEntity } from '../../category/entities/category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('establishment')
export class EstablishmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  @IsNotEmpty()
  razao_social: string;

  @Column()
  nome_fantasia: string;

  @Column({ type: 'varchar', length: 14 })
  @IsNotEmpty()
  cnpj: string;

  @Column({ type: 'varchar', length: 200 })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  telefone: string;

  @Column({ type: 'varchar' })
  endereco: string;

  @Column({ type: 'varchar' })
  cidade: string;

  @Column({ type: 'varchar', length: 2 })
  estado: string;

  @Column({ type: 'varchar', length: 4 })
  agencia: string;

  @Column({ type: 'varchar', length: 6 })
  conta: string;

  @ManyToOne(() => CategoryEntity, (categoria) => categoria.estabelecimento)
  @JoinColumn({ name: 'id' })
  categoria: CategoryEntity;

  @Column({ type: 'boolean' })
  status: boolean;

  @Column({ type: 'date' })
  data_cadastro: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
