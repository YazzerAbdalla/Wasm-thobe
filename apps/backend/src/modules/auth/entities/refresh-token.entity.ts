/**
 * @file refresh-token.entity.ts
 * @module AuthModule
 * @description Stores hashed refresh tokens. One row per active session.
 *              Deleted on logout or token rotation.
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity('refresh_tokens')
@Index(['userId'])
@Index(['expiresAt'])
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @Column({ nullable: false })
  tokenHash: string; // bcrypt hash of the raw token

  @Column({ type: 'timestamptz', nullable: false })
  expiresAt: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
