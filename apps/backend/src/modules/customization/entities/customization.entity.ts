/**
 * @file customization.entity.ts
 * @module CustomizationModule
 * @description TypeORM entity representing a specific thobe configuration.
 *              Links a user's selection of color, fabric, and accessories.
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { Color } from './color.entity';
import { Fabric } from './fabric.entity';
import { Accessory } from './accessory.entity';

@Entity('customizations')
export class Customization {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  colorId: string;

  @Column({ type: 'uuid', nullable: false })
  fabricId: string;

  @Column({ nullable: true })
  recommendationLabel: string | null;

  @ManyToOne(() => Color, { eager: true })
  @JoinColumn({ name: 'colorId' })
  color: Color;

  @ManyToOne(() => Fabric, { eager: true })
  @JoinColumn({ name: 'fabricId' })
  fabric: Fabric;

  @ManyToMany(() => Accessory, { eager: true })
  @JoinTable({ name: 'customization_accessories' })
  accessories: Accessory[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
