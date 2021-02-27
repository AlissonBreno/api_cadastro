import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CategoryEntity } from '../../category/entities/category.entity';
import { CategoryRepository } from '../../category/category.repository';
import { EstablishmentController } from '../establishment.controller';
import { EstablishmentService } from '../establishment.service';

describe('EstablishmentController', () => {
  let controller: EstablishmentController;
  let service: EstablishmentService;
  let mockDataCategory;
  let mockData;
  let mockId;

  beforeEach(async () => {
    const mockService = {
      getEstablishments: jest.fn(),
      createEstablishments: jest.fn(),
      updateEstablishments: jest.fn(),
      deleteEstablishments: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstablishmentController, CategoryRepository],
      providers: [
        { provide: EstablishmentService, useFactory: () => mockService },
      ],
    }).compile();

    controller = module.get<EstablishmentController>(EstablishmentController);
    service = module.get<EstablishmentService>(EstablishmentService);
    mockId = 1;
    mockDataCategory = {
      categoria: 'supermercado',
      url_icon: 'icon.png',
    } as CategoryEntity;
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
      categoria: mockDataCategory,
      status: true,
    };
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

    it('should be return when service returns', async () => {
      (service.getEstablishments as jest.Mock).mockReturnValue([mockData]);
      expect(await controller.getEstablishments()).toEqual([mockData]);
    });
  });

  describe('createEstablishments()', () => {
    it('should be throw when service throw', async () => {
      (service.createEstablishments as jest.Mock).mockRejectedValue(
        new BadRequestException()
      );
      await expect(controller.createEstablishments(mockData)).rejects.toThrow(
        new BadRequestException()
      );
    });

    it('should be return with correct params', async () => {
      await controller.createEstablishments(mockData);
      expect(service.createEstablishments).toBeCalledWith(mockData);
    });

    it('should be return when service returns', async () => {
      (service.createEstablishments as jest.Mock).mockReturnValue(mockData);
      expect(await controller.createEstablishments(mockData)).toEqual(mockData);
    });
  });

  describe('updateEstablishments()', () => {
    it('should be throw when service throw', async () => {
      (service.updateEstablishments as jest.Mock).mockRejectedValue(
        new BadRequestException()
      );
      await expect(
        controller.updateEstablishments(mockId, mockData)
      ).rejects.toThrow(new BadRequestException());
    });

    it('should be return with correct params', async () => {
      await controller.updateEstablishments(mockId, mockData);
      expect(service.updateEstablishments).toBeCalledWith(mockId, mockData);
    });

    it('should be return when service returns', async () => {
      (service.updateEstablishments as jest.Mock).mockReturnValue(mockData);
      expect(await controller.updateEstablishments(mockId, mockData)).toEqual(
        mockData
      );
    });
  });

  describe('deleteEstablishments()', () => {
    it('should be throw when service throw', async () => {
      (service.deleteEstablishments as jest.Mock).mockRejectedValue(
        new BadRequestException()
      );
      await expect(controller.deleteEstablishments(mockId)).rejects.toThrow(
        new BadRequestException()
      );
    });

    it('should be called with correct params', async () => {
      await controller.deleteEstablishments(mockId);
      expect(service.deleteEstablishments).toBeCalledWith(mockId);
    });
  });
});
