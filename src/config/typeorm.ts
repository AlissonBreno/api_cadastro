import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: '127.0.0.1',
  port: 15432,
  username: 'postgres',
  password: 'pass123',
  database: 'teste_fitcard',
  synchronize: true,
  dropSchema: false,
  logging: false,
  entities: ['dist/**/entities/*.entity.js'],
};
