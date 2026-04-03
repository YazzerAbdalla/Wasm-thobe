/**
 * @file recommendation.service.spec.ts
 * @module CustomizationModule
 * @description Unit tests for RecommendationService.
 */

import { Test, TestingModule } from '@nestjs/testing';
import { RecommendationService } from './recommendation.service';
import * as fs from 'fs';

jest.mock('fs');

describe('RecommendationService', () => {
  let service: RecommendationService;

  beforeEach(async () => {
    // Default mock implementation
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockReturnValue(
      JSON.stringify([
        {
          colorName: 'Black',
          fabricName: 'Premium Wool',
          label: 'Royal Classic',
        },
        {
          colorName: 'White',
          fabricName: 'Linen',
          label: 'Summer Elegance',
        },
      ]),
    );

    const module: TestingModule = await Test.createTestingModule({
      providers: [RecommendationService],
    }).compile();

    service = module.get<RecommendationService>(RecommendationService);
    service.onModuleInit();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getLabel', () => {
    it('should return correct label for Black + Premium Wool', () => {
      expect(service.getLabel('Black', 'Premium Wool')).toBe('Royal Classic');
    });

    it('should return null when no rule matches the combination', () => {
      expect(service.getLabel('Unknown', 'Fabric')).toBeNull();
    });

    it('should be case-insensitive when matching color and fabric names', () => {
      expect(service.getLabel('black', 'premium wool')).toBe('Royal Classic');
      expect(service.getLabel('WHITE', 'LINEN')).toBe('Summer Elegance');
    });
  });

  it('should handle missing config file gracefully (all paths)', () => {
    (fs.existsSync as jest.Mock).mockReturnValue(false);
    const newService = new RecommendationService();
    newService.onModuleInit();
    expect(newService.getLabel('Black', 'Premium Wool')).toBeNull();
    expect(fs.existsSync).toHaveBeenCalledTimes(2);
  });

  it('should handle invalid JSON gracefully', () => {
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockReturnValue('invalid json');
    const newService = new RecommendationService();
    newService.onModuleInit();
    expect(newService.getLabel('Black', 'Premium Wool')).toBeNull();
  });
});
