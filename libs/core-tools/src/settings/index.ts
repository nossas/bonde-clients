import bondeConfig from './bondeConfig';
import { Environment } from './types';

export default (environment: Environment) => {
  const defaultConfig = bondeConfig.development;
  const environmentConfig = bondeConfig[environment];

  return Object.assign({}, defaultConfig, environmentConfig);
};
