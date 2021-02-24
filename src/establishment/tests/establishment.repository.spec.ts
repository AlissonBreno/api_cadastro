import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { EstablishmentEntity } from '../establishment.entity';
import { EstablishmentRepository } from '../establishment.repository';

describe('EstablishmentRepository', () => {
  let repository: EstablishmentRepository;
  let mockData;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstablishmentRepository],
    }).compile();

    repository = module.get<EstablishmentRepository>(EstablishmentRepository);
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
    expect(repository).toBeDefined();
  });

  describe('getEstablishments()', () => {
    it('should be throw if find method throw', async () => {
      repository.find = jest.fn().mockReturnValue(undefined);
      await expect(repository.getEstablishments()).rejects.toThrow(
        new InternalServerErrorException()
      );
    });

    it('should be returns when find method return', async () => {
      repository.find = jest.fn().mockReturnValue([mockData]);
      expect(await repository.getEstablishments()).toEqual([mockData]);
    });
  });
});
