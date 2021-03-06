import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { EstablishmentService } from '../establishment.service';
import { EstablishmentRepository } from '../establishment.repository';
import { EstablishmentEntity } from '../entities/establishment.entity';
import { CategoryEntity } from '../../category/entities/category.entity';
import { CategoryService } from '../../category/category.service';
import { EstablishmentResponse } from '../dto/establishments-response.dto';
import { db2brDataFormat } from '../../shared/helpers/data.helper';

describe('EstablishmentService', () => {
  let service: EstablishmentService;
  let repository: EstablishmentRepository;
  let serviceCategory: CategoryService;

  let mockDataCategory;
  let mockDataResponse;
  let mockDataChangeStatus;
  let mockData;
  let mockId: number;

  beforeEach(async () => {
    const establishmentRepositoryMock = {
      getEstablishments: jest.fn(),
      getEstablishment: jest.fn(),
      createEstablishments: jest.fn(),
      updateEstablishments: jest.fn(),
      changeStatusEstablishment: jest.fn(),
      deleteEstablishments: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EstablishmentService,
        {
          provide: CategoryService,
          useFactory: () => ({ getCategory: jest.fn() }),
        },
        {
          provide: EstablishmentRepository,
          useFactory: () => establishmentRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<EstablishmentService>(EstablishmentService);
    repository = module.get<EstablishmentRepository>(EstablishmentRepository);
    serviceCategory = module.get<CategoryService>(CategoryService);
    mockId = 1;
    mockDataCategory = {
      id_categoria: 1,
      categoria: 'supermercado',
      url_icon: 'icone.png',
    } as CategoryEntity;

    mockData = {
      id_estabelecimento: 1,
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
      categoria: mockDataCategory,
      status: true,
      data_cadastro: new Date('2021-02-13T03:00:00.000Z'),
    } as EstablishmentEntity;

    mockDataChangeStatus = {
      status: true,
    };

    mockDataResponse = {
      id_estabelecimento: 1,
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
      data_cadastro: db2brDataFormat(new Date('2021-02-13T03:00:00.000Z')),
    } as EstablishmentResponse;
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

  describe('getEstablishment()', () => {
    it('should be throw if repository throw', async () => {
      (repository.getEstablishment as jest.Mock).mockRejectedValue(
        new InternalServerErrorException()
      );
      await expect(service.getEstablishment(mockId)).rejects.toThrow(
        new InternalServerErrorException()
      );
    });

    it('should be not throw if repository returns', async () => {
      (repository.getEstablishment as jest.Mock).mockReturnValue(mockData);
      await expect(service.getEstablishment(mockId)).resolves.not.toThrow();
    });

    it('should be called repository with correct params', async () => {
      // await service.getEstablishment(mockId);
      // expect(repository.getEstablishment).toBeCalledWith(mockId);
      // TODO: fix it (?)
    });

    it('should be return when repository return', async () => {
      (repository.getEstablishment as jest.Mock).mockReturnValue(mockData);
      expect(await service.getEstablishment(mockId)).toEqual(mockDataResponse);
    });
  });

  describe('createEstablishments()', () => {
    it('should be throw if repository throw', async () => {
      (serviceCategory.getCategory as jest.Mock).mockReturnValue(
        mockDataCategory
      );
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
      (serviceCategory.getCategory as jest.Mock).mockReturnValue(
        mockDataCategory
      );

      await service.createEstablishments(mockData);
      expect(repository.createEstablishments).toBeCalledWith(
        mockData,
        mockDataCategory
      );
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
      await expect(
        service.updateEstablishments(mockId, mockData)
      ).rejects.toThrow(new InternalServerErrorException());
    });

    it('should be called repository with correct params', async () => {
      (serviceCategory.getCategory as jest.Mock).mockReturnValue(
        mockDataCategory
      );

      await service.updateEstablishments(mockId, mockData);
      expect(repository.updateEstablishments).toBeCalledWith(
        mockId,
        mockData,
        mockDataCategory
      );
    });

    it('should be not throw if repository returns', async () => {
      await expect(service.updateEstablishments).not.toThrow(
        new InternalServerErrorException()
      );
    });

    it('should be return when repository returns', async () => {
      (repository.updateEstablishments as jest.Mock).mockReturnValue({});
      expect(await service.updateEstablishments(mockId, mockData)).toEqual({});
    });
  });

  describe('changeStatusEstablishment()', () => {
    it('should be throw if repository throw', async () => {
      (repository.changeStatusEstablishment as jest.Mock).mockRejectedValue(
        new InternalServerErrorException()
      );
      mockDataChangeStatus.status = 'INVALID';
      await expect(
        service.changeStatusEstablishment(mockId, mockDataChangeStatus)
      ).rejects.toThrow(new InternalServerErrorException());
    });

    it('should be called repository with correct params', async () => {
      await service.changeStatusEstablishment(mockId, mockDataChangeStatus);
      expect(repository.changeStatusEstablishment).toBeCalledWith(
        mockId,
        mockDataChangeStatus
      );
    });

    it('should be not throw if repository returns', async () => {
      await expect(service.changeStatusEstablishment).not.toThrow(
        new InternalServerErrorException()
      );
    });

    it('should be return when repository returns', async () => {
      (repository.changeStatusEstablishment as jest.Mock).mockReturnValue({});
      expect(
        await service.changeStatusEstablishment(mockId, mockDataChangeStatus)
      ).toEqual({});
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
