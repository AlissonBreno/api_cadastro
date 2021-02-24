import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstablishmentModule } from './establishment/establishment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
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
    }),
    EstablishmentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
