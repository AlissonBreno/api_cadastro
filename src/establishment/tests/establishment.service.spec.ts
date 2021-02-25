import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { EstablishmentService } from '../establishment.service';
import { EstablishmentRepository } from '../establishment.repository';
import { EstablishmentEntity } from '../entities/establishment.entity';

describe('EstablishmentService', () => {
  let service: EstablishmentService;
  let repository: EstablishmentRepository;
  let mockData;
  let mockId;

  beforeEach(async () => {
    const establishmentRepositoryMock = {
      getEstablishments: jest.fn(),
      createEstablishments: jest.fn(),
      updateEstablishments: jest.fn(),
      deleteEstablishments: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EstablishmentService,
        {
          provide: EstablishmentRepository,
          useFactory: () => establishmentRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<EstablishmentService>(EstablishmentService);
    repository = module.get<EstablishmentRepository>(EstablishmentRepository);
    mockId = 1;
    mockData = {
      razao_social: 'Tânia Informática ME',
      nome_fantasia: 'Tânia Informática',
      cnpj: '04.902.710/0001-68',
      email: 'compras@suelietaniainformaticame.com.br',
      telefone: '(11) 2575-8202',
      endereco: 'Acesso Araponga Martelo',
      cidade: 'São Paulo',
      estado: 'SP',
      agencia: '048-0',
      conta: '37.586-9',
      categoria: 1,
      status: true,
    } as EstablishmentEntity;
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

      mockData.razao_social = 'INVALID';
      await expect(service.createEstablishments(mockData)).rejects.toThrow(
        new InternalServerErrorException()
      );
    });

    it('should be not throw if repository returns', async () => {
      await expect(service.createEstablishments).not.toThrow(
        new InternalServerErrorException()
      );
    });

    it('should be called repository with correct params', async () => {
      await service.createEstablishments(mockData);
      expect(repository.createEstablishments).toBeCalledWith(mockData);
    });

    it('should be return when repository returns', async () => {
      (repository.createEstablishments as jest.Mock).mockReturnValue({});
      expect(await service.createEstablishments(mockData)).toEqual({});
    });
  });

  describe('updateEstablishments()', () => {
    it('should be throw if repository throw', async () => {
      (repository.updateEstablishments as jest.Mock).mockRejectedValue(
        new InternalServerErrorException()
      );
      mockData.razao_social = 'INVALID';
      await expect(service.updateEstablishments(mockData)).rejects.toThrow(
        new InternalServerErrorException()
      );
    });

    it('should be called repository with correct params', async () => {
      await service.updateEstablishments(mockData);
      expect(repository.updateEstablishments).toBeCalledWith(mockData);
    });

    it('should be not throw if repository returns', async () => {
      await expect(service.updateEstablishments).not.toThrow(
        new InternalServerErrorException()
      );
    });

    it('should be return when repository returns', async () => {
      (repository.updateEstablishments as jest.Mock).mockReturnValue({});
      expect(await service.updateEstablishments(mockData)).toEqual({});
    });
  });

  describe('deleteEstablishments()', () => {
    it('should be throw if repository throw', async () => {
      (repository.deleteEstablishments as jest.Mock).mockRejectedValue(
        new InternalServerErrorException()
      );

      await expect(service.deleteEstablishments(mockId)).rejects.toThrow(
        new InternalServerErrorException()
      );
    });

    it('should be not throw if repository returns', async () => {
      await expect(service.deleteEstablishments).not.toThrow(
        new InternalServerErrorException()
      );
    });

    it('should be called repository with correct params', async () => {
      await service.deleteEstablishments(mockId);
      expect(repository.deleteEstablishments).toBeCalledWith(mockId);
    });
  });
});
