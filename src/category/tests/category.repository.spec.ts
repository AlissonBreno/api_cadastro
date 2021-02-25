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
});
