/**
 * @file customization.seed.ts
 * @description Seed script to populate the database with initial customization options.
 *              Includes colors, fabrics, and accessories.
 */

import { DataSource } from 'typeorm';
import { Color } from '../../modules/customization/entities/color.entity';
import { Fabric } from '../../modules/customization/entities/fabric.entity';
import { Accessory } from '../../modules/customization/entities/accessory.entity';

/**
 * Seeds the database with default customization options.
 *
 * @param {DataSource} dataSource - The TypeORM DataSource instance
 */
export const seedCustomization = async (dataSource: DataSource): Promise<void> => {
  const colorRepo = dataSource.getRepository(Color);
  const fabricRepo = dataSource.getRepository(Fabric);
  const accessoryRepo = dataSource.getRepository(Accessory);

  // Colors
  const colors = [
    { name: 'Black', hexCode: '#000000' },
    { name: 'White', hexCode: '#FFFFFF' },
    { name: 'Navy', hexCode: '#1B2A4A' },
    { name: 'Beige', hexCode: '#F5F0E8' },
  ];

  for (const color of colors) {
    const exists = await colorRepo.findOne({ where: { name: color.name } });
    if (!exists) {
      await colorRepo.save(colorRepo.create(color));
    }
  }

  // Fabrics
  const fabrics = [
    {
      name: 'Premium Wool',
      description: 'Best for winter, formal',
      priceMultiplier: 1.4,
      textureClass: '.fabric-wool',
    },
    {
      name: 'Egyptian Cotton',
      description: 'All-season, formal',
      priceMultiplier: 1.2,
      textureClass: '.fabric-cotton',
    },
    {
      name: 'Linen',
      description: 'Best for summer, casual',
      priceMultiplier: 1.1,
      textureClass: '.fabric-linen',
    },
    {
      name: 'Polyester',
      description: 'Budget-friendly, all-season',
      priceMultiplier: 1.0,
      textureClass: '.fabric-polyester',
    },
  ];

  for (const fabric of fabrics) {
    const exists = await fabricRepo.findOne({ where: { name: fabric.name } });
    if (!exists) {
      await fabricRepo.save(fabricRepo.create(fabric));
    }
  }

  // Accessories
  const accessories = [
    { name: 'Gold Buttons', type: 'button', extraPrice: 45 },
    { name: 'Silver Buttons', type: 'button', extraPrice: 35 },
    { name: 'Mandarin Collar', type: 'collar', extraPrice: 60 },
    { name: 'French Cuffs', type: 'cuff', extraPrice: 80 },
  ];

  for (const accessory of accessories) {
    const exists = await accessoryRepo.findOne({
      where: { name: accessory.name },
    });
    if (!exists) {
      await accessoryRepo.save(accessoryRepo.create(accessory));
    }
  }
};
