import { Module } from '@nestjs/common';
import { EstablishmentModule } from './establishment/establishment.module';

@Module({
  imports: [EstablishmentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
