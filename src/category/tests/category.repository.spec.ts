import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CategoryRepository } from '../category.repository';

describe('EstablishmentRepository', () => {
  let repository: CategoryRepository;
  let mockData;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryRepository],
    }).compile();

    repository = module.get<CategoryRepository>(CategoryRepository);
    repository.save = jest.fn();
    mockData = {
      categoria: 'supermercado',
    };
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
});
