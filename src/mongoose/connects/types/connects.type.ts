import { MongooseModuleOptions } from '@nestjs/mongoose';

export type MongooseConfigs = {
  connectionName: string;
  uri: string;
  options: MongooseModuleOptions;
};
