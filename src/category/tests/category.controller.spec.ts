import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from '../category.controller';
import { CategoryService } from '../category.service';

describe('CategoryController', () => {
  let controller: CategoryController;
  let service: CategoryService;
  let mockData;

  beforeEach(async () => {
    const mockService = {
      getCategories: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [{ provide: CategoryService, useFactory: () => mockService }],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    service = module.get<CategoryService>(CategoryService);
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
});
