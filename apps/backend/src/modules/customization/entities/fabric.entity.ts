/**
 * @file fabric.entity.ts
 * @module CustomizationModule
 * @description TypeORM entity representing an available thobe fabric.
 */

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('fabrics')
export class Fabric {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({
    type: 'decimal',
    precision: 4,
    scale: 2,
    default: 1.0,
    nullable: false,
  })
  priceMultiplier: number;

  @Column({ nullable: true })
  textureClass: string | null; // CSS class for SVG preview
}
