/**
 * @file run-seed.ts
 * @description Main entry point for running database seed scripts.
 *              Uses the standalone TypeORM DataSource.
 */

import dataSource from '../data-source';
import { seedCustomization } from './customization.seed';

/**
 * Executes all database seed functions.
 *
 * @returns {Promise<void>} Resolves when all seeds are complete.
 */
async function runSeed(): Promise<void> {
  try {
    console.log('🌱 Starting database seeding...');
    await dataSource.initialize();
    console.log('Connected to database.');

    await seedCustomization(dataSource);
    console.log('✅ Customization options seeded.');

    await dataSource.destroy();
    console.log('🌱 Seeding complete!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

runSeed();
