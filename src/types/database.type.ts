export enum DatabaseTypes {
  MONGOOSE = 'mongoose',
}

export type DatabaseModuleOptions = {
  allows: DatabaseTypes[];
};
