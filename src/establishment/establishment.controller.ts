import { BadRequestException, Controller } from '@nestjs/common';

@Controller('establishment')
export class EstablishmentController {
  getEstablishments() {
    throw new BadRequestException();
  }
}
