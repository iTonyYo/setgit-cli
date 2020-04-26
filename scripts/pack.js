import { readFileSync, writeFileSync } from 'fs';

import { minify } from 'terser';
import fg from 'fast-glob';
import chalk from 'chalk';
import { rollup } from 'rollup';
import json from '@rollup/plugin-json';

import pSeries from 'p-series';
import each from 'async/each';

import { resolveCwd, srcRollupEntryPath } from './paths';

async function main() {
  await pSeries([
    () => rollupBuild(),
    () => compress(),
  ]);

  console.log(chalk `{greenBright 构建成功!}`);
}

async function rollupBuild() {
  const bundle = await rollup({
    input: srcRollupEntryPath,
    external: [
      'meow',
      'update-notifier',
      'cosmiconfig',
      'gradient-string',
      'is-git-repository',
      'redent',
      'chalk',
      'nodegit',
      'async/eachOfSeries',
      'deepmerge',
    ],
    plugins: [ json() ],
  });

  await bundle.write({
    dir: resolveCwd('lib'),
    format: 'cjs',
  });
}

async function compress() {
  await each(await getLibs(), async (src) => {
    const { code } = minify(
      readFileSync(src, {encoding: 'utf-8'}),
      {
        mangle: false,
      },
    );

    writeFileSync(src, code);
    return;
  });
}

async function getLibs() {
  const libs = await fg(['lib/**/*.js']);

  return libs;
}

(async () => {
  try {
    await main();
  } catch (err) {
    throw(err);
  }
})();
