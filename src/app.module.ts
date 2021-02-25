import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/typeorm';
import { EstablishmentModule } from './establishment/establishment.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmConfig), EstablishmentModule, CategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
