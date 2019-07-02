import meow from 'meow';
import updateNotifier from 'update-notifier';
import cosmiconfig from 'cosmiconfig';
import isGit from 'is-git-repository';
import redent from 'redent';
import gradient from 'gradient-string';
import chalk from 'chalk';

import pkg from '../package.json';
import isEmpty from './utilities/isEmpty';
import get from './utilities/get';

import getWorkingDirectory from './getWorkingDirectory';
import setGit from './setGit';

// 待办： 如果未自定义配置，提示 `正在使用默认的配置`
class Cli {
  constructor() {
    updateNotifier({ pkg }).notify();

    this.cli = meow(`
      使用方式
        $ setgit [工作目录，默认：'process.cwd()']

      选项
        --version, -V                                    查看版本号
        --help, -h                                       查看帮助

      示例
        $ setgit                                         为当前工作目录配置 Git
        $ setgit /usr/pro/api.name.io                    为指定工作目录配置 Git
    `, {
      flags: {
        version: {
          type: 'boolean',
          alias: 'v',
        },
        help: {
          type: 'boolean',
          alias: 'h',
        },
      },
    });
    this.workingPath = getWorkingDirectory(this.cli.input[0]).twd;
    this.userDefinedConfig = this.getUserDefinedConfig();
  }

  async run() {
    if (isGit(this.workingPath)) {
      await setGit({
        twd: this.workingPath,
        rules: this.userDefinedConfig,
      });

      this.success();
    } else {
      this.error();
    }
  }

  success() {
    console.log(redent(chalk `
      {greenBright.bold ${gradient.rainbow('操作成功!')}}

      {grey 操作目录：}
      {grey ${this.workingPath}}
    `));
  }

  error() {
    console.error(redent(chalk `
      {redBright.bold 这不是一个 Git 仓库!}

      {grey 操作目录：}
      {grey ${this.workingPath}}
    `));
  }

  getUserDefinedConfig() {
    const explorer = cosmiconfig('git');
    const foundConfig = explorer.searchSync(this.workingPath);

    return isEmpty(foundConfig) ? {} : get(foundConfig, 'config');
  }
}

export default Cli;
