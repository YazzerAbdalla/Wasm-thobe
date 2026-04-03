/**
 * @file recommendation.service.ts
 * @module CustomizationModule
 * @description Logic for providing style recommendations based on user selections.
 *              Loads rules from a configuration file.
 */

import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

interface IRecommendationRule {
  colorName: string;
  fabricName: string;
  label: string;
}

@Injectable()
export class RecommendationService implements OnModuleInit {
  private readonly logger = new Logger(RecommendationService.name);
  private rules: IRecommendationRule[] = [];

  /**
   * Initializes the service by loading recommendation rules from the config file.
   */
  onModuleInit(): void {
    const configPath = path.join(__dirname, 'recommendation.config.json');
    try {
      if (fs.existsSync(configPath)) {
        const data = fs.readFileSync(configPath, 'utf8');
        this.rules = JSON.parse(data);
      } else {
        // In some environments (like tests), the file might be in src
        const srcPath = path.join(
          process.cwd(),
          'src/modules/customization/recommendation.config.json',
        );
        if (fs.existsSync(srcPath)) {
          const data = fs.readFileSync(srcPath, 'utf8');
          this.rules = JSON.parse(data);
        }
      }
    } catch (error) {
      this.logger.error(`Failed to load recommendation rules: ${error.message}`);
      this.rules = [];
    }
  }

  /**
   * Returns a recommendation label for a specific color and fabric combination.
   *
   * @param {string} colorName - Name of the selected color
   * @param {string} fabricName - Name of the selected fabric
   * @returns {string | null} The matching label or null if no rule matches
   */
  getLabel(colorName: string, fabricName: string): string | null {
    const matchedRule = this.rules.find(
      (rule) =>
        rule.colorName.toLowerCase() === colorName.toLowerCase() &&
        rule.fabricName.toLowerCase() === fabricName.toLowerCase(),
    );

    return matchedRule ? matchedRule.label : null;
  }
}
