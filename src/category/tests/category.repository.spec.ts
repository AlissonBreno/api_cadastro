import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CategoryRepository } from '../category.repository';
import { CategoryEntity } from '../entities/category.entity';

describe('EstablishmentRepository', () => {
  let repository: CategoryRepository;
  let mockData;
  let mockId;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryRepository],
    }).compile();

    repository = module.get<CategoryRepository>(CategoryRepository);
    repository.create = jest.fn();
    repository.save = jest.fn();
    repository.update = jest.fn();
    repository.delete = jest.fn();
    mockData = {
      categoria: 'supermercado',
      url_icon: 'icon.png',
    } as CategoryEntity;
    mockId = 1;
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('getCategories()', () => {
    it('should be throw if find method throw', async () => {
      repository.find = jest.fn().mockReturnValue(undefined);
      await expect(repository.getCategories()).rejects.toThrow(
        new InternalServerErrorException()
      );
    });

    it('should be returns when find method return', async () => {
      repository.find = jest.fn().mockReturnValue([mockData]);
      expect(await repository.getCategories()).toEqual([mockData]);
    });
  });

  describe('createCategories()', () => {
    it('should be called save with correct params', async () => {
      await repository.createCategories(mockData);
      expect(repository.save).toBeCalledWith(mockData);
    });

    it('should be throw if called with invalid params', async () => {
      mockData.categoria = null;
      await expect(repository.createCategories(mockData)).rejects.toThrow();
    });

    it('should be throw when save throw', async () => {
      repository.save = jest
        .fn()
        .mockRejectedValue(new InternalServerErrorException());
      await expect(repository.createCategories(mockData)).rejects.toThrow();
    });

    it('should be return created data', async () => {
      expect(await repository.createCategories(mockData)).toEqual(mockData);
    });
  });

  describe('updateCategories()', () => {
    it('should be throw when update throw', async () => {
      repository.update = jest
        .fn()
        .mockRejectedValue(new InternalServerErrorException());
      await expect(
        repository.updateCategories(mockId, mockData)
      ).rejects.toThrow();
    });

    it('should be called findOne with correct params', async () => {
      repository.findOne = jest.fn().mockReturnValue(mockData);
      await repository.updateCategories(mockId, mockData);
      expect(repository.findOne).toBeCalledWith(mockId);
    });

    it('should be throw if called with invalid params', async () => {
      mockData.categoria = null;
      await expect(
        repository.updateCategories(mockId, mockData)
      ).rejects.toThrow();
    });

    it('should be throw if findOne returns empty', async () => {
      repository.findOne = jest.fn().mockReturnValue(undefined);

      await expect(
        repository.updateCategories(mockId, mockData)
      ).rejects.toThrow(new NotFoundException(`The category was not found.`));
    });

    it('should be called findOne twice', async () => {
      repository.findOne = jest.fn().mockReturnValue(mockData);
      await repository.updateCategories(mockId, mockData);
      expect(repository.findOne).toBeCalledTimes(2);
    });

    it('should be return updated data', async () => {
      repository.findOne = jest.fn().mockReturnValue(mockData);
      repository.update = jest.fn().mockReturnValue({});
      const result = await repository.updateCategories(mockId, mockData);

      expect(result).toEqual(mockData);
    });
  });

  describe('deleteCategories()', () => {
    it('should be called findOne with correct params', async () => {
      repository.findOne = jest.fn().mockReturnValue(mockData);

      await repository.deleteCategories(mockId);
      expect(repository.findOne).toBeCalledWith(mockId);
    });

    it('should be throw if findOne returns empty', async () => {
      repository.findOne = jest.fn().mockReturnValue(undefined);

      await expect(repository.deleteCategories(mockId)).rejects.toThrow(
        new NotFoundException(`The category was not found.`)
      );
    });

    it('should be called with corret params', async () => {
      repository.findOne = jest.fn().mockReturnValue(mockData);
      repository.delete = jest.fn().mockReturnValue({});

      await repository.deleteCategories(mockId);
      expect(repository.delete).toBeCalledWith(mockId);
    });

    it('should be throw when delete throw', async () => {
      repository.findOne = jest.fn().mockReturnValue(mockData);
      repository.delete = jest.fn().mockRejectedValue(new Error());

      await expect(repository.deleteCategories(mockId)).rejects.toThrow();
    });
  });
});
