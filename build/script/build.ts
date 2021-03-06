// #!/usr/bin/env node

import { sh } from 'tasksfile';

import { argv } from 'yargs';
import { runBuildConfig } from './buildConf';
import { errorConsole, successConsole } from '../utils';
import { startGzipStyle } from '../plugin/gzip/compress';

export const runBuild = async (preview = false) => {
  try {
    const argvList = argv._;
    if (preview) {
      let cmd = `cross-env NODE_ENV=production vite build`;
      await sh(cmd, {
        async: true,
        nopipe: true,
      });
    }

    // Generate configuration file
    if (!argvList.includes('no-conf')) {
      await runBuildConfig();
    }
    if (!preview) {
      await startGzipStyle();
    }
    successConsole('Vite Build successfully!');
  } catch (error) {
    errorConsole('Vite Build Error\n' + error);
    process.exit(1);
  }
};
