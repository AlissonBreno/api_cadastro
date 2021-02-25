import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from '../category.controller';
import { CategoryService } from '../category.service';

describe('CategoryController', () => {
  let controller: CategoryController;
  let service: CategoryService;
  let mockData;
  let mockId;

  beforeEach(async () => {
    const mockService = {
      getCategories: jest.fn(),
      createCategories: jest.fn(),
      updateCategories: jest.fn(),
      deleteCategories: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [{ provide: CategoryService, useFactory: () => mockService }],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    service = module.get<CategoryService>(CategoryService);
    mockId = 1;
    mockData = {
      categoria: 'supermercado',
      url_icon: 'icon.png',
    };
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getCategories()', () => {
    it('should be throw when service throw', async () => {
      (service.getCategories as jest.Mock).mockRejectedValue(
        new BadRequestException()
      );
      await expect(controller.getCategories()).rejects.toThrow(
        new BadRequestException()
      );
    });

    it('should be return when service returns', async () => {
      (service.getCategories as jest.Mock).mockReturnValue([mockData]);
      expect(await controller.getCategories()).toEqual([mockData]);
    });
  });

  describe('createCategories()', () => {
    it('should be throw when service throw', async () => {
      (service.createCategories as jest.Mock).mockRejectedValue(
        new BadRequestException()
      );
      await expect(controller.createCategories(mockData)).rejects.toThrow(
        new BadRequestException()
      );
    });

    it('should be return with correct params', async () => {
      await controller.createCategories(mockData);
      expect(service.createCategories).toBeCalledWith(mockData);
    });

    it('should be return when service returns', async () => {
      (service.createCategories as jest.Mock).mockReturnValue(mockData);
      expect(await controller.createCategories(mockData)).toEqual(mockData);
    });
  });

  describe('updateCategories()', () => {
    it('should be throw when service throw', async () => {
      (service.updateCategories as jest.Mock).mockRejectedValue(
        new BadRequestException()
      );
      await expect(
        controller.updateCategories(mockId, mockData)
      ).rejects.toThrow(new BadRequestException());
    });

    it('should be return with correct params', async () => {
      await controller.updateCategories(mockId, mockData);
      expect(service.updateCategories).toBeCalledWith(mockId, mockData);
    });

    it('should be return when service returns', async () => {
      (service.updateCategories as jest.Mock).mockReturnValue(mockData);
      expect(await controller.updateCategories(mockId, mockData)).toEqual(
        mockData
      );
    });
  });

  describe('deleteCategories()', () => {
    it('should be throw when service throw', async () => {
      (service.deleteCategories as jest.Mock).mockRejectedValue(
        new BadRequestException()
      );
      await expect(controller.deleteCategories(mockId)).rejects.toThrow(
        new BadRequestException()
      );
    });

    it('should be called with correct params', async () => {
      await controller.deleteCategories(mockId);
      expect(service.deleteCategories).toBeCalledWith(mockId);
    });
  });
});
