import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { EstablishmentController } from '../establishment.controller';
import { EstablishmentService } from '../establishment.service';

describe('EstablishmentController', () => {
  let controller: EstablishmentController;
  let service: EstablishmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstablishmentController],
      providers: [
        {
          provide: EstablishmentService,
          useFactory: () => ({ getEstablishments: jest.fn() }),
        },
      ],
    }).compile();

    controller = module.get<EstablishmentController>(EstablishmentController);
    service = module.get<EstablishmentService>(EstablishmentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getEstablishments()', () => {
    it('should be throw when service throw', async () => {
      (service.getEstablishments as jest.Mock).mockRejectedValue(
        new BadRequestException()
      );
      await expect(controller.getEstablishments()).rejects.toThrow(
        new BadRequestException()
      );
    });
  });
});
