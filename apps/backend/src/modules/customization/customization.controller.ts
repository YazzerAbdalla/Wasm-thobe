/**
 * @file customization.controller.ts
 * @module CustomizationModule
 * @description HTTP controller for thobe customization endpoints.
 *              Provides access to available options and creation of new configurations.
 */

import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CustomizationService, ICustomizationOptions } from './customization.service';
import { CreateCustomizationDto } from './dto/create-customization.dto';
import { Customization } from './entities/customization.entity';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('customization')
@Controller('customization')
export class CustomizationController {
  constructor(private readonly customizationService: CustomizationService) {}

  /**
   * Retrieves all available thobe customization options.
   * Public endpoint — no authentication required.
   *
   * @returns {Promise<ICustomizationOptions>} Arrays of colors, fabrics, and accessories
   */
  @Get('options')
  @ApiOperation({ summary: 'Get all available thobe customization options' })
  @ApiResponse({ status: 200, description: 'Options retrieved successfully' })
  async getOptions(): Promise<ICustomizationOptions> {
    return this.customizationService.getOptions();
  }

  /**
   * Creates a new thobe customization for the user.
   *
   * @param {CreateCustomizationDto} dto - Validated customization payload
   * @returns {Promise<Customization>} The created customization object
   */
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new thobe customization' })
  @ApiResponse({ status: 201, description: 'Customization created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Color or Fabric not found' })
  async create(@Body() dto: CreateCustomizationDto): Promise<Customization> {
    return this.customizationService.create(dto);
  }
}
