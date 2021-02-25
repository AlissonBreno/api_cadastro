import { IsNotEmpty } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
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

  @Column({ type: 'int4' })
  categoria: number;

  @Column({ type: 'boolean' })
  status: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  data_cadastro: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updateAt: Date;
}
