import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  EstablishmentRepository,
  EstablishmentService,
} from '../establishment.service';

describe('EstablishmentService', () => {
  let service: EstablishmentService;
  let repository: EstablishmentRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EstablishmentService,
        {
          provide: EstablishmentRepository,
          useFactory: () => ({
            getEstablishments: jest.fn(),
          }),
        },
      ],
    }).compile();

    service = module.get<EstablishmentService>(EstablishmentService);
    repository = module.get<EstablishmentRepository>(EstablishmentRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getEstablishments()', () => {
    it('should be throw if repository throw', async () => {
      (repository.getEstablishments as jest.Mock).mockRejectedValue(
        new InternalServerErrorException()
      );
      await expect(service.getEstablishments).rejects.toThrow(
        new InternalServerErrorException()
      );
    });

    it('should be not throw if repository returns', async () => {
      await expect(service.getEstablishments).not.toThrow(
        new InternalServerErrorException()
      );
    });

    it('should be return when repository returns', async () => {
      (repository.getEstablishments as jest.Mock).mockReturnValue([{}]);
      expect(await service.getEstablishments()).toEqual([{}]);
    });
  });
});
