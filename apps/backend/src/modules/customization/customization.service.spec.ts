/**
 * @file customization.service.spec.ts
 * @module CustomizationModule
 * @description Unit tests for CustomizationService.
 */

import { Test, TestingModule } from '@nestjs/testing';
import { CustomizationService } from './customization.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Color } from './entities/color.entity';
import { Fabric } from './entities/fabric.entity';
import { Accessory } from './entities/accessory.entity';
import { Customization } from './entities/customization.entity';
import { NotFoundException } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';

describe('CustomizationService', () => {
  let service: CustomizationService;
  let colorRepo: any;
  let fabricRepo: any;
  let accessoryRepo: any;
  let customizationRepo: any;
  let recommendationService: RecommendationService;

  const createMockRepo = () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    findBy: jest.fn(),
  });

  beforeEach(async () => {
    colorRepo = createMockRepo();
    fabricRepo = createMockRepo();
    accessoryRepo = createMockRepo();
    customizationRepo = createMockRepo();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomizationService,
        {
          provide: getRepositoryToken(Color),
          useValue: colorRepo,
        },
        {
          provide: getRepositoryToken(Fabric),
          useValue: fabricRepo,
        },
        {
          provide: getRepositoryToken(Accessory),
          useValue: accessoryRepo,
        },
        {
          provide: getRepositoryToken(Customization),
          useValue: customizationRepo,
        },
        {
          provide: RecommendationService,
          useValue: {
            getLabel: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CustomizationService>(CustomizationService);
    recommendationService = module.get<RecommendationService>(RecommendationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getOptions', () => {
    it('should return all colors, fabrics, and accessories', async () => {
      const mockColors = [{ id: 'c1', name: 'Black' }];
      const mockFabrics = [{ id: 'f1', name: 'Wool' }];
      const mockAccessories = [{ id: 'a1', name: 'Button' }];

      colorRepo.find.mockResolvedValue(mockColors);
      fabricRepo.find.mockResolvedValue(mockFabrics);
      accessoryRepo.find.mockResolvedValue(mockAccessories);

      const result = await service.getOptions();

      expect(result).toEqual({
        colors: mockColors,
        fabrics: mockFabrics,
        accessories: mockAccessories,
      });
    });
  });

  describe('create', () => {
    const dto = {
      colorId: 'color-uuid',
      fabricId: 'fabric-uuid',
      accessoryIds: ['acc-uuid'],
    };

    it('should save customization and return it with recommendation label', async () => {
      colorRepo.findOne.mockResolvedValue({ id: 'color-uuid', name: 'Black' });
      fabricRepo.findOne.mockResolvedValue({ id: 'fabric-uuid', name: 'Wool' });
      accessoryRepo.findBy.mockResolvedValue([{ id: 'acc-uuid', name: 'Button' }]);
      jest.spyOn(recommendationService, 'getLabel').mockReturnValue('Royal Classic');
      
      const mockSavedCustomization = { id: 'cust-uuid', ...dto, recommendationLabel: 'Royal Classic' };
      customizationRepo.create.mockReturnValue(mockSavedCustomization);
      customizationRepo.save.mockResolvedValue(mockSavedCustomization);

      const result = await service.create(dto);

      expect(recommendationService.getLabel).toHaveBeenCalledWith('Black', 'Wool');
      expect(customizationRepo.save).toHaveBeenCalledWith(
        expect.objectContaining({ recommendationLabel: 'Royal Classic' }),
      );
      expect(result).toEqual(mockSavedCustomization);
    });

    it('should use fallback label if recommendation is null', async () => {
      colorRepo.findOne.mockResolvedValue({ id: 'color-uuid', name: 'Unknown' });
      fabricRepo.findOne.mockResolvedValue({ id: 'fabric-uuid', name: 'Unknown' });
      accessoryRepo.findBy.mockResolvedValue([]);
      jest.spyOn(recommendationService, 'getLabel').mockReturnValue(null);

      const mockSavedCustomization = { id: 'cust-uuid', ...dto, recommendationLabel: 'Classic Look' };
      customizationRepo.create.mockReturnValue(mockSavedCustomization);
      customizationRepo.save.mockResolvedValue(mockSavedCustomization);

      await service.create(dto);

      expect(customizationRepo.create).toHaveBeenCalledWith(
        expect.objectContaining({ recommendationLabel: 'Classic Look' }),
      );
    });

    it('should throw NotFoundException if colorId does not exist', async () => {
      colorRepo.findOne.mockResolvedValue(null);

      await expect(service.create(dto)).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if fabricId does not exist', async () => {
      colorRepo.findOne.mockResolvedValue({ id: 'color-uuid' });
      fabricRepo.findOne.mockResolvedValue(null);

      await expect(service.create(dto)).rejects.toThrow(NotFoundException);
    });
  });
});
