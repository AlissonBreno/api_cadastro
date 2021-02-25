import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CategoryRepository, CategoryService } from '../category.service';

describe('CategoryService', () => {
  let service: CategoryService;
  let repository: CategoryRepository;
  let mockData;

  beforeEach(async () => {
    const categoryRepositoryMock = {
      getCategories: jest.fn(),
      createCategories: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: CategoryRepository,
          useFactory: () => categoryRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    repository = module.get<CategoryRepository>(CategoryRepository);
    mockData = {
      categoria: 'Supermercado',
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getCategories()', () => {
    it('should be throw if repository throw', async () => {
      (repository.getCategories as jest.Mock).mockRejectedValue(
        new InternalServerErrorException()
      );
      await expect(service.getCategories()).rejects.toThrow(
        new InternalServerErrorException()
      );
    });

    it('should be not throw if repository trow', async () => {
      await expect(service.getCategories()).resolves.not.toThrow();
    });

    it('should be return when repository return', async () => {
      (repository.getCategories as jest.Mock).mockReturnValue([{}]);
      expect(await service.getCategories()).toEqual([{}]);
    });
  });

  describe('createCategories()', () => {
    it('should be throw if repository throw', async () => {
      (repository.createCategories as jest.Mock).mockRejectedValue(
        new InternalServerErrorException()
      );
      await expect(service.createCategories(mockData)).rejects.toThrow(
        new InternalServerErrorException()
      );
    });

    it('should be not throw if repository returns', async () => {
      (repository.createCategories as jest.Mock).mockReturnValue(mockData);
      expect(await service.createCategories(mockData)).toEqual(mockData);
    });

    it('should be called repository with correct params', async () => {
      await service.createCategories(mockData);
      expect(repository.createCategories).toBeCalledWith(mockData);
    });
  });
});
