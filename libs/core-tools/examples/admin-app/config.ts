import bondeConfig from './bondeconfig';

const defaultConfig = bondeConfig.development;

const enviroment = process.env.NODE_ENV || 'development';
const enviromentConfig = bondeConfig[enviroment];

const config = Object.assign({}, defaultConfig, enviromentConfig);

export default config;