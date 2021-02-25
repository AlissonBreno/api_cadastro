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

  @Column()
  email: string;

  @Column()
  telefone: string;

  @Column()
  endereco: string;

  @Column()
  cidade: string;

  @Column()
  estado: string;

  @Column()
  agencia: string;

  @Column()
  conta: string;

  @Column()
  categoria: number;

  @Column()
  status: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  data_cadastro: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updateAt: Date;
}
