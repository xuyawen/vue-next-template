import fs from 'fs';
import chalk from 'chalk';
import path from 'path';
import dotenv from 'dotenv';
import { networkInterfaces } from 'os';

function consoleFn(color: string, message: any) {
  console.log(
    chalk.blue.bold('****************  ') +
      (chalk as any)[color].bold(message) +
      chalk.blue.bold('  ****************')
  );
}

export function successConsole(message: any) {
  consoleFn('green', '✨ ' + message);
}

export function errorConsole(message: any) {
  consoleFn('red', '✨ ' + message);
}

export function warnConsole(message: any) {
  consoleFn('yellow', '✨ ' + message);
}

export function getCwdPath(...dir: string[]) {
  return path.resolve(process.cwd(), ...dir);
}

export function getIPAddress() {
  let interfaces = networkInterfaces();
  for (let devName in interfaces) {
    let iFace = interfaces[devName];
    if (!iFace) return;
    for (let i = 0; i < iFace.length; i++) {
      let alias = iFace[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }

  return '';
}

export function getEnvConfig(match = 'VITE_GLOB_', confFiles = ['.env', '.env.production']) {
  let envConfig = {};
  confFiles.forEach((item) => {
    try {
      const env = dotenv.parse(fs.readFileSync(path.resolve(process.cwd(), item)));

      envConfig = { ...envConfig, ...env };
    } catch (error) {}
  });
  Object.keys(envConfig).forEach((key) => {
    const reg = new RegExp(`^(${match})`);
    if (!reg.test(key)) {
      Reflect.deleteProperty(envConfig, key);
    }
  });
  return envConfig;
}
