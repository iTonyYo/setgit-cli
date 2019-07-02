"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _meow = _interopRequireDefault(require("meow"));

var _updateNotifier = _interopRequireDefault(require("update-notifier"));

var _cosmiconfig = _interopRequireDefault(require("cosmiconfig"));

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

// 待办： 如果未自定义配置，提示 `正在使用默认的配置`
class Cli {
  constructor() {
    (0, _updateNotifier.default)({
      pkg: _package.default
    }).notify();
    this.cli = (0, _meow.default)(`
      使用方式
        $ setgit [工作目录，默认：'process.cwd()']

      选项
        --version, -V                                       查看版本号
        --help, -h                                          查看帮助

      示例
        $ setgit                                            为当前工作目录配置 Git
        $ setgit ~/Development/iyowei/flatten-folder-cli    为指定工作目录配置 Git
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
    console.log((0, _redent.default)(_chalk.default`
      {greenBright.bold ${_gradientString.default.rainbow('操作成功!')}}

      {grey 操作目录：}
      {grey ${this.workingPath}}
    `));
  }

  error() {
    console.error((0, _redent.default)(_chalk.default`
      {redBright.bold 这不是一个 Git 仓库!}

      {grey 操作目录：}
      {grey ${this.workingPath}}
    `));
  }

  getUserDefinedConfig() {
    const explorer = (0, _cosmiconfig.default)('git');
    const foundConfig = explorer.searchSync(this.workingPath);
    return (0, _isEmpty.default)(foundConfig) ? {} : (0, _get.default)(foundConfig, 'config');
  }

}

var _default = Cli;
exports.default = _default;
module.exports = exports.default;