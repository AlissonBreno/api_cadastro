import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CategoryRepository } from '../category.repository';
import { CategoryService } from '../category.service';

describe('CategoryService', () => {
  let service: CategoryService;
  let repository: CategoryRepository;
  let mockData;
  let mockId;

  beforeEach(async () => {
    const categoryRepositoryMock = {
      getCategory: jest.fn(),
      getCategories: jest.fn(),
      createCategories: jest.fn(),
      updateCategories: jest.fn(),
      deleteCategories: jest.fn(),
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
    mockId = 1;
    mockData = {
      categoria: 'Supermercado',
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getCategory()', () => {
    it('should be throw if repository throw', async () => {
      (repository.getCategory as jest.Mock).mockRejectedValue(
        new InternalServerErrorException()
      );
      await expect(service.getCategory(mockId)).rejects.toThrow(
        new InternalServerErrorException()
      );
    });

    it('should be not throw if repository returns', async () => {
      await expect(service.getCategory(mockId)).resolves.not.toThrow();
    });

    it('should be called repository with correct params', async () => {
      await service.getCategory(mockId);
      expect(repository.getCategory).toBeCalledWith(mockId);
    });

    it('should be return when repository return', async () => {
      (repository.getCategory as jest.Mock).mockReturnValue(mockData);
      expect(await service.getCategory(mockId)).toEqual(mockData);
    });
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

      mockData.categoria = 'INVALID';
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

    it('should be return when repository returns', async () => {
      (repository.createCategories as jest.Mock).mockReturnValue(mockData);
      expect(await service.createCategories(mockData)).toEqual(mockData);
    });
  });

  describe('updateCategories()', () => {
    it('should be throw if repository throw', async () => {
      (repository.updateCategories as jest.Mock).mockRejectedValue(
        new InternalServerErrorException()
      );

      mockData.categoria = 'INVALID';
      await expect(service.updateCategories(mockId, mockData)).rejects.toThrow(
        new InternalServerErrorException()
      );
    });

    it('should be not throw if repository returns', async () => {
      await expect(service.updateCategories).not.toThrow(
        new InternalServerErrorException()
      );
    });

    it('should be called repository with correct params', async () => {
      await service.updateCategories(mockId, mockData);
      expect(repository.updateCategories).toBeCalledWith(mockId, mockData);
    });

    it('should be return when repository returns', async () => {
      (repository.updateCategories as jest.Mock).mockReturnValue(mockData);
      expect(await service.updateCategories(mockId, mockData)).toEqual(
        mockData
      );
    });
  });

  describe('deleteCategories()', () => {
    it('should be throw if repository throw', async () => {
      (repository.deleteCategories as jest.Mock).mockRejectedValue(
        new InternalServerErrorException()
      );
      await expect(service.deleteCategories(mockId)).rejects.toThrow(
        new InternalServerErrorException()
      );
    });

    it('should be not throw if repository returns', async () => {
      await expect(service.deleteCategories).not.toThrow(
        new InternalServerErrorException()
      );
    });

    it('should be called repository with correct params', async () => {
      await service.deleteCategories(mockId);
      expect(repository.deleteCategories).toBeCalledWith(mockId);
    });
  });
});
