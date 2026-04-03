/**
 * @file customization.module.ts
 * @module CustomizationModule
 * @description Manages thobe customization options and user configurations.
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomizationService } from './customization.service';
import { CustomizationController } from './customization.controller';
import { Color } from './entities/color.entity';
import { Fabric } from './entities/fabric.entity';
import { Accessory } from './entities/accessory.entity';
import { Customization } from './entities/customization.entity';
import { RecommendationService } from './recommendation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Color, Fabric, Accessory, Customization]),
  ],
  controllers: [CustomizationController],
  providers: [CustomizationService, RecommendationService],
  exports: [CustomizationService],
})
export class CustomizationModule {}
