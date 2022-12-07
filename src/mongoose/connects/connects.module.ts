import * as yaml from 'js-yaml';
import * as fs from 'fs';

import { DynamicModule, Global, Logger, Module } from '@nestjs/common';
import { DatabaseModuleOptions } from 'src/types';
import { MongooseConfigs } from './types';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({})
export class MongooseConnectsModule {
  static getConfigs(path: string): MongooseConfigs[] {
    const rootConfigs = yaml.load(fs.readFileSync(path, 'utf8')) as any;

    if (!rootConfigs) {
      Logger.log("[NestDatabase] Can't find root configs");
      return;
    }

    const { database } = rootConfigs || {};
    const { mongoose } = database || {};

    return mongoose || [];
  }

  static connects(path: string): DynamicModule {
    const configs = this.getConfigs(path);
    const imports: DynamicModule[] = [];

    Logger.log('[NestDatabase] Mongoose connecting...');
    configs.forEach((config) => {
      const { connectionName, uri, options } = config;
      const module = MongooseModule.forRoot(uri, {
        ...options,
        connectionName,
      });

      Logger.log(`[NestDatabase] Mongoose connected to ${connectionName}`);
      imports.push(module);
    });

    Logger.log(`[NestDatabase] Mongoose created ${imports.length} connections`);
    return {
      module: MongooseConnectsModule,
      imports: imports,
    };
  }
}
