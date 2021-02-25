import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { EstablishmentController } from '../establishment.controller';
import { EstablishmentService } from '../establishment.service';

describe('EstablishmentController', () => {
  let controller: EstablishmentController;
  let service: EstablishmentService;
  let mockData;

  beforeEach(async () => {
    const mockService = {
      getEstablishments: jest.fn(),
      createEstablishments: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstablishmentController],
      providers: [
        { provide: EstablishmentService, useFactory: () => mockService },
      ],
    }).compile();

    controller = module.get<EstablishmentController>(EstablishmentController);
    service = module.get<EstablishmentService>(EstablishmentService);
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
});
