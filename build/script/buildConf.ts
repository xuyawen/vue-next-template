import fs, { writeFileSync } from 'fs-extra';

import viteConfig from '../../vite.config';
import { errorConsole, successConsole, getCwdPath, getEnvConfig } from '../utils';

const getShortName = (env: any) => {
  return `__PRODUCTION__${env.VITE_GLOB_APP_SHORT_NAME || '__APP'}__CONF__`
    .toUpperCase()
    .replace(/\s/g, '');
};

const GLOB_CONFIG_FILE_NAME = '_app.config.js';

function createConfig(
  {
    configName,
    config,
    configFileName = GLOB_CONFIG_FILE_NAME,
  }: { configName: string; config: any; configFileName?: string } = { configName: '', config: {} }
) {
  try {
    const windowConf = `window.${configName}`;
    const outDir = viteConfig.outDir || 'dist';
    const configStr = `${windowConf}=${JSON.stringify(config)};

      Object.freeze(${windowConf});
      Object.defineProperty(window, "${configName}", {
        configurable: false,
        writable: false,
      });
    `;
    fs.mkdirp(getCwdPath(outDir));
    writeFileSync(getCwdPath(`${outDir}/${configFileName}`), configStr);

    successConsole('The configuration file is build successfully！');
  } catch (error) {
    errorConsole('Configuration file configuration file failed to package\n' + error);
  }
}

export function runBuildConfig() {
  const config = getEnvConfig();
  const configFileName = getShortName(config);
  createConfig({ config, configName: configFileName });
}