import { EnvConfig } from './env-config.interface';
import Config from '../config';
const ProdConfig: EnvConfig = {
  ENV: 'STAGING'
};

Config.CONFIG_ENV = "staging";
export = ProdConfig;

