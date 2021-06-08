import { Repository } from "nodegit";

import eachOfSeries from "async/eachOfSeries";
import asyncify from "async/asyncify";

import deepmerge from "deepmerge";

import preset from "./preset";

export default async function setGit(options = { twd: ".", configs: {} }) {
  const cfg = deepmerge(preset, options);
  const { twd, configs } = cfg;

  const repo = await Repository.open(twd);

  await setter({ repo, configs });
}

async function setter({ repo, configs }) {
  const gitConfiger = await repo.config();

  /**
   * NOTE: 必须串行!
   * 并行配置 Git 时，Git 会反复创建 ”.git/config.lock“ 文件，但这是不合法的，最终程序报错
   */
  await eachOfSeries(
    configs,
    asyncify(async (val, key) => {
      await gitConfiger.setString(key, val);
      return;
    })
  );
}
