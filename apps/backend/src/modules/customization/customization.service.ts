/**
 * @file customization.service.ts
 * @module CustomizationModule
 * @description Service for handling thobe customization logic.
 *              Provides methods for retrieving available options and creating customizations.
 */

import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Color } from './entities/color.entity';
import { Fabric } from './entities/fabric.entity';
import { Accessory } from './entities/accessory.entity';
import { Customization } from './entities/customization.entity';
import { CreateCustomizationDto } from './dto/create-customization.dto';
import { RecommendationService } from './recommendation.service';

export interface ICustomizationOptions {
  colors: Color[];
  fabrics: Fabric[];
  accessories: Accessory[];
}

@Injectable()
export class CustomizationService {
  private readonly logger = new Logger(CustomizationService.name);

  constructor(
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
    @InjectRepository(Fabric)
    private readonly fabricRepository: Repository<Fabric>,
    @InjectRepository(Accessory)
    private readonly accessoryRepository: Repository<Accessory>,
    @InjectRepository(Customization)
    private readonly customizationRepository: Repository<Customization>,
    private readonly recommendationService: RecommendationService,
  ) {}

  /**
   * Retrieves all available customization options.
   *
   * @returns {Promise<ICustomizationOptions>} Object containing colors, fabrics, and accessories
   */
  async getOptions(): Promise<ICustomizationOptions> {
    const [colors, fabrics, accessories] = await Promise.all([
      this.colorRepository.find(),
      this.fabricRepository.find(),
      this.accessoryRepository.find(),
    ]);

    return { colors, fabrics, accessories };
  }

  /**
   * Creates and saves a new thobe customization.
   *
   * @param {CreateCustomizationDto} dto - Validated customization payload
   * @returns {Promise<Customization>} The newly created customization
   * @throws {NotFoundException} If color or fabric is not found
   */
  async create(dto: CreateCustomizationDto): Promise<Customization> {
    const color = await this.colorRepository.findOne({
      where: { id: dto.colorId },
    });
    if (!color) {
      throw new NotFoundException(`Color ${dto.colorId} not found`);
    }

    const fabric = await this.fabricRepository.findOne({
      where: { id: dto.fabricId },
    });
    if (!fabric) {
      throw new NotFoundException(`Fabric ${dto.fabricId} not found`);
    }

    let accessories: Accessory[] = [];
    if (dto.accessoryIds && dto.accessoryIds.length > 0) {
      accessories = await this.accessoryRepository.findBy({
        id: In(dto.accessoryIds),
      });
    }

    // Get style recommendation label
    const recommendationLabel =
      this.recommendationService.getLabel(color.name, fabric.name) ||
      'Classic Look';

    const customization = this.customizationRepository.create({
      colorId: dto.colorId,
      fabricId: dto.fabricId,
      accessories,
      recommendationLabel,
    });

    return this.customizationRepository.save(customization);
  }
}
