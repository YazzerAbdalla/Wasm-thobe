/**
 * @file create-customization.dto.ts
 * @module CustomizationModule
 * @description Validated payload for creating a new thobe customization.
 */

import { IsUUID, IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomizationDto {
  @ApiProperty({ description: 'UUID of the selected color' })
  @IsUUID()
  readonly colorId: string;

  @ApiProperty({ description: 'UUID of the selected fabric' })
  @IsUUID()
  readonly fabricId: string;

  @ApiProperty({
    description: 'Array of UUIDs for selected accessories',
    required: false,
    type: [String],
  })
  @IsArray()
  @IsUUID('all', { each: true })
  @IsOptional()
  readonly accessoryIds?: string[];
}
