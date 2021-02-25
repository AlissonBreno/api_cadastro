import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { EstablishmentEntity } from '../entities/establishment.entity';
import { EstablishmentRepository } from '../establishment.repository';

describe('EstablishmentRepository', () => {
  let repository: EstablishmentRepository;
  let mockData;
  let mockId;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstablishmentRepository],
    }).compile();

    repository = module.get<EstablishmentRepository>(EstablishmentRepository);
    repository.create = jest.fn();
    repository.save = jest.fn();
    repository.update = jest.fn();
    repository.delete = jest.fn();
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

  describe('createEstablishments()', () => {
    it('should be called save with correct params', async () => {
      repository.create = jest.fn().mockReturnValue(mockData);
      repository.save = jest.fn().mockReturnValue(repository.create);

      await repository.createEstablishments(mockData);
      expect(repository.save).toBeCalledWith(mockData);
    });

    it('should be throw if called with invalid params', async () => {
      mockData.razao_social = null;
      await expect(repository.createEstablishments(mockData)).rejects.toThrow();
    });

    it('should be throw when save throw', async () => {
      repository.save = jest
        .fn()
        .mockRejectedValue(new InternalServerErrorException());
      await expect(repository.createEstablishments(mockData)).rejects.toThrow();
    });

    it('should be return created data', async () => {
      expect(await repository.createEstablishments(mockData)).toEqual(mockData);
    });
  });

  describe('updateEstablishments()', () => {
    it('should be throw when update throw', async () => {
      repository.update = jest
        .fn()
        .mockRejectedValue(new InternalServerErrorException());
      await expect(
        repository.updateEstablishments(mockId, mockData)
      ).rejects.toThrow();
    });

    it('should be called findOne with correct params', async () => {
      repository.findOne = jest.fn().mockReturnValue(mockData);
      await repository.updateEstablishments(mockId, mockData);
      expect(repository.findOne).toBeCalledWith(mockId);
    });

    it('should be throw if called with invalid params', async () => {
      mockData.razao_social = null;
      await expect(
        repository.updateEstablishments(mockId, mockData)
      ).rejects.toThrow();
    });

    it('should be throw if findOne returns empty', async () => {
      repository.findOne = jest.fn().mockReturnValue(undefined);

      await expect(
        repository.updateEstablishments(mockId, mockData)
      ).rejects.toThrow(
        new NotFoundException(`The establishment was not found.`)
      );
    });

    it('should be called findOne twice', async () => {
      repository.findOne = jest.fn().mockReturnValue(mockData);
      await repository.updateEstablishments(mockId, mockData);
      expect(repository.findOne).toBeCalledTimes(2);
    });

    it('should be return updated data', async () => {
      repository.findOne = jest.fn().mockReturnValue(mockData);
      repository.update = jest.fn().mockReturnValue({});
      const result = await repository.updateEstablishments(mockId, mockData);

      expect(result).toEqual(mockData);
    });
  });

  describe('deleteEstablishments()', () => {
    it('should be called findOne with correct params', async () => {
      repository.findOne = jest.fn().mockReturnValue(mockData);

      await repository.deleteEstablishments(mockId);
      expect(repository.findOne).toBeCalledWith(mockId);
    });

    it('should be throw if findOne returns empty', async () => {
      repository.findOne = jest.fn().mockReturnValue(undefined);

      await expect(repository.deleteEstablishments(mockId)).rejects.toThrow(
        new NotFoundException(`The establishment was not found.`)
      );
    });

    it('should be called with corret params', async () => {
      repository.findOne = jest.fn().mockReturnValue(mockData);
      repository.delete = jest.fn().mockReturnValue({});

      await repository.deleteEstablishments(mockId);
      expect(repository.delete).toBeCalledWith(mockId);
    });

    it('should be throw when delete throw', async () => {
      repository.findOne = jest.fn().mockReturnValue(mockData);
      repository.delete = jest.fn().mockRejectedValue(new Error());

      await expect(repository.deleteEstablishments(mockId)).rejects.toThrow();
    });
  });
});
