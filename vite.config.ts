import { resolve } from 'path';
import type { UserConfig } from 'vite';
import { createProxy } from './build/config/vite/proxy';
import { coverVars } from './build/config/glob/lessCoverVars';
import globbyTransform from './build/plugin/vite-plugin-context/transform';
const pkg = require('./package.json');

function pathResolve(dir: string) {
  return resolve(__dirname, '.', dir);
}

const VITE_PORT: number = 3000;
const VITE_PROXY: [string, string][] = [];

const viteConfig: UserConfig = {
  /**
   * 端口号
   * @default 3000
   */
  port: VITE_PORT,
  /**
   * 服务地址
   * @default 'localhost'
   */
  hostname: 'localhost',
  /**
   * 运行自动打开浏览器
   * @default false
   */
  open: false,
    /**
   * 压缩代码
   *  boolean | 'terser' | 'esbuild'
   * @default 'terser'
   */
  // minify: isDevFn() ? 'esbuild' : 'terser',
    /**
   * 基本公共路径
   * @default '/'
   */
  // base: VITE_PUBLIC_PATH,
    /**
   * 打包输入路径
   * @default 'dist'
   */
  outDir: 'dist',
    /**
   * 资源输出路径
   * @default '_assets'
   */
  assetsDir: '_assets',
    /**
   * 静态资源小于该大小将会内联，默认4096kb
   * @default '4096'
   */
  assetsInlineLimit: 4096,
    /**
   * esbuild转换目标。
   * @default 'es2020'
   */
  esbuildTarget: 'es2020',
  silent: false,
  // 别名
  alias: {
    '/@/': pathResolve('src'),
  },
  define: {
    __VERSION__: pkg.version,
  },
  // css预处理
  cssPreprocessOptions: {
    less: {
      modifyVars: coverVars,
      javascriptEnabled: true,
    },
  },
  // 本地跨域代理
  proxy: createProxy(VITE_PROXY),
}

export default {
  ...viteConfig,
  transforms: [globbyTransform(viteConfig)],
} as UserConfig;
