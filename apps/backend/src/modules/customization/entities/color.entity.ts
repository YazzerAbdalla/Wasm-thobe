/**
 * @file color.entity.ts
 * @module CustomizationModule
 * @description TypeORM entity representing an available thobe color.
 */

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('colors')
export class Color {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  name: string;

  @Column({ length: 7, nullable: false })
  hexCode: string; // e.g., #000000
}
