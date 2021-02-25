import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/typeorm';
import { EstablishmentModule } from './establishment/establishment.module';

@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmConfig), EstablishmentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
