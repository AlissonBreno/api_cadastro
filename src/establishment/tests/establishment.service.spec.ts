import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  EstablishmentRepository,
  EstablishmentService,
} from '../establishment.service';

describe('EstablishmentService', () => {
  let service: EstablishmentService;
  let repository: EstablishmentRepository;
  let mockData;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EstablishmentService,
        {
          provide: EstablishmentRepository,
          useFactory: () => ({
            getEstablishments: jest.fn(),
            createEstablishments: jest.fn(),
          }),
        },
      ],
    }).compile();

    service = module.get<EstablishmentService>(EstablishmentService);
    repository = module.get<EstablishmentRepository>(EstablishmentRepository);
    mockData = {
      razao_social: 'string',
      nome_fantasia: 'string',
      cnpj: 'string',
      email: 'string',
      telefone: 'string',
      endereco: 'string',
      cidade: 'string',
      estado: 'string',
      agencia: 'string',
      conta: 'string',
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getEstablishments()', () => {
    it('should be throw if repository throw', async () => {
      (repository.getEstablishments as jest.Mock).mockRejectedValue(
        new InternalServerErrorException()
      );
      await expect(service.getEstablishments()).rejects.toThrow(
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

  describe('createEstablishments()', () => {
    it('should be throw if repository throw', async () => {
      (repository.createEstablishments as jest.Mock).mockRejectedValue(
        new InternalServerErrorException()
      );
      await expect(service.createEstablishments(mockData)).rejects.toThrow(
        new InternalServerErrorException()
      );
    });

    it('should be called repository with correct params', async () => {
      await service.createEstablishments(mockData);
      expect(repository.createEstablishments).toBeCalledWith(mockData);
    });

    it('should be not throw if repository returns', async () => {
      await expect(service.createEstablishments).not.toThrow(
        new InternalServerErrorException()
      );
    });
  });
});
