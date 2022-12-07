import { MongooseConnectsModule } from './mongoose/connects/connects.module';
import { DynamicModule, Logger, Module } from '@nestjs/common';
import { DatabaseModuleOptions, DatabaseTypes } from './types';

@Module({})
export class DatabaseModule {
  /**
   * Phục vụ những người dùng với nest-core
   * Lưu ý: Nếu dùng với nest-core thì dùng hàm này
   * @param options
   * @returns
   */
  static forRoot(path: string, options: DatabaseModuleOptions): DynamicModule {
    const imports: DynamicModule[] = [];

    // Allow mongoose
    if (options.allows.includes(DatabaseTypes.MONGOOSE)) {
      imports.push(MongooseConnectsModule.connects(path));
    }

    return {
      module: DatabaseModule,
      imports: imports,
    };
  }
}
