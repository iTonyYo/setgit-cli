import { realpathSync } from 'fs';
import { join, dirname, resolve } from 'path';

import fg from 'fast-glob';
import execa from 'execa';

import pMap from 'p-map';

const appDirectory = realpathSync(process.cwd());
const resolveCwd   = relativePath => resolve(appDirectory, relativePath);

// 异步工作流
async function run() {
  await pMap(await getSrcs(), async (src) => {
    await build(src);
    return;
  }, { concurrency: 8 });
}

// 获取待转译的文件
async function getSrcs() {
  const srcs = await fg([
    'src/**/*.js',
    '!src/**/(*.)+(benchmark|test).js',
  ]);

  return srcs;
}

// 转译核心
async function build(src) {
  await execa(
    'npx',
    [
      'babel',
      '-d',
      getDestPath(src),
      resolveCwd(src),
    ]
  );
}

// 获取输出路径：在输出根目录下，保留相对路径。
function getDestPath(path) {
  return dirname(
    join(
      resolveCwd('lib'),
      path.substring('src/'.length, path.length),
    )
  );
}
