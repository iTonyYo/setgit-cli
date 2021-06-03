import meow from "meow";
import updateNotifier from "update-notifier";
import isGitRepo from "is-git-repository";
import redent from "redent";
import gradient from "gradient-string";
import chalk from "chalk";

import { name, version } from "../package.json";
import isEmpty from "./helpers/isEmpty";
import getCosmiconfigSync from "./helpers/getCosmiconfigSync";

import getWorkingDirectory from "./helpers/getWorkingDirectory";
import setGit from "./setGit";

class Cli {
  constructor() {
    updateNotifier({ pkg: { name, version } }).notify();

    this.cli = meow(
      `
      使用方式
        $ setgit [工作目录，默认：'process.cwd()']

      选项
        --version, -v                              查看版本号
        --help, -h                                 查看帮助

      示例
        $ setgit                                   为当前工作目录配置 Git
        $ setgit /usr/pro/api.name.io              为指定工作目录配置 Git

      提示
        检测到用户未提供自定义配置时，\`setgit\` 将会使用默认配置，详情参见
        https://github.com/iTonyYo/setgit-cli#配置。
    `,
      {
        flags: {
          version: {
            type: "boolean",
            alias: "v",
          },
          help: {
            type: "boolean",
            alias: "h",
          },
        },
      }
    );

    const workingPath = getWorkingDirectory(this.cli.input[0]).twd;

    this.workingPath = workingPath;

    this.userDefinedConfig = getCosmiconfigSync({
      name: "git",
      workingPath,
    });
  }

  async run() {
    if (isGitRepo(this.workingPath)) {
      await setGit({
        twd: this.workingPath,
        configs: this.userDefinedConfig,
      });

      this.success();
    } else {
      this.error();
    }
  }

  success() {
    if (isEmpty(this.userDefinedConfig)) {
      console.log(
        redent(chalk`
        {bold ${gradient.rainbow("操作成功!")}}
        {grey 检测到您未提供自定义配置，\`setgit\` 使用了默认配置。}

        {grey 操作目录：}
        {grey ${this.workingPath}}
      `)
      );

      return;
    }

    console.log(
      redent(chalk`
      {greenBright.bold ${gradient.rainbow("操作成功!")}}

      {grey 操作目录：}
      {grey ${this.workingPath}}
    `)
    );
  }

  error() {
    console.error(
      redent(chalk`
      {redBright.bold 这不是一个 Git 仓库!}

      {grey 操作目录：}
      {grey ${this.workingPath}}
    `)
    );
  }
}

export default Cli;
