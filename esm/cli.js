"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _meow = _interopRequireDefault(require("meow"));

var _updateNotifier = _interopRequireDefault(require("update-notifier"));

var _cosmiconfig = require("cosmiconfig");

var _isGitRepository = _interopRequireDefault(require("is-git-repository"));

var _redent = _interopRequireDefault(require("redent"));

var _gradientString = _interopRequireDefault(require("gradient-string"));

var _chalk = _interopRequireDefault(require("chalk"));

var _package = _interopRequireDefault(require("../package.json"));

var _isEmpty = _interopRequireDefault(require("./utilities/isEmpty"));

var _get = _interopRequireDefault(require("./utilities/get"));

var _getWorkingDirectory = _interopRequireDefault(require("./getWorkingDirectory"));

var _setGit = _interopRequireDefault(require("./setGit"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Cli {
  constructor() {
    (0, _updateNotifier.default)({
      pkg: _package.default
    }).notify();
    this.cli = (0, _meow.default)(`
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
    `, {
      flags: {
        version: {
          type: 'boolean',
          alias: 'v'
        },
        help: {
          type: 'boolean',
          alias: 'h'
        }
      }
    });
    this.workingPath = (0, _getWorkingDirectory.default)(this.cli.input[0]).twd;
    this.userDefinedConfig = this.getUserDefinedConfig();
  }

  async run() {
    if ((0, _isGitRepository.default)(this.workingPath)) {
      await (0, _setGit.default)({
        twd: this.workingPath,
        rules: this.userDefinedConfig
      });
      this.success();
    } else {
      this.error();
    }
  }

  success() {
    if ((0, _isEmpty.default)(this.userDefinedConfig)) {
      console.log((0, _redent.default)((0, _chalk.default)`
        {bold ${_gradientString.default.rainbow('操作成功!')}}
        {grey 检测到您未提供自定义配置，\`setgit\` 使用了默认配置。}

        {grey 操作目录：}
        {grey ${this.workingPath}}
      `));
      return;
    }

    console.log((0, _redent.default)((0, _chalk.default)`
      {greenBright.bold ${_gradientString.default.rainbow('操作成功!')}}

      {grey 操作目录：}
      {grey ${this.workingPath}}
    `));
  }

  error() {
    console.error((0, _redent.default)((0, _chalk.default)`
      {redBright.bold 这不是一个 Git 仓库!}

      {grey 操作目录：}
      {grey ${this.workingPath}}
    `));
  }

  getUserDefinedConfig() {
    const explorerSync = (0, _cosmiconfig.cosmiconfigSync)('git');
    const foundConfig = explorerSync.search(this.workingPath);
    return (0, _isEmpty.default)(foundConfig) ? {} : (0, _get.default)(foundConfig, 'config');
  }

}

var _default = Cli;
exports.default = _default;
module.exports = exports.default;