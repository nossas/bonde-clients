export type Environment = 'development' | 'staging' | 'production';

export type Module =
  | 'settings'
  | 'mobilization'
  | 'chatbot'
  | 'accounts';

// export interface ModuleConfig {
//   [module: Module]: string;
// }

export interface Config {
  crossStorage: string;
  apiGraphql: string;
  settings: string;
  mobilization: string;
  chatbot: string;
  accounts: string;
  [index: string]: string;
}
