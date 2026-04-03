/**
 * @file accessory.entity.ts
 * @module CustomizationModule
 * @description TypeORM entity representing an available thobe accessory (buttons, collars, cuffs).
 */

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('accessories')
export class Accessory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  name: string;

  @Column({ nullable: false })
  type: string; // collar | button | cuff

  @Column({ type: 'decimal', precision: 8, scale: 2, default: 0, nullable: false })
  extraPrice: number;
}
