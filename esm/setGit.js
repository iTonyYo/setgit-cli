"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nodegit = require("nodegit");

var _eachOfSeries = _interopRequireDefault(require("async/eachOfSeries"));

var _merge = _interopRequireDefault(require("./utilities/merge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function setGit(options = {
  twd: '.',
  rules: {}
}) {
  const {
    twd,
    rules
  } = (0, _merge.default)({
    twd: '.',
    rules: {
      "core.ignorecase": "false",
      "alias.med": "merge develop",
      "alias.mem": "merge master",
      "alias.le": "!git log --oneline --color | emojify | less -r",
      "alias.ls": "ls-files",
      "alias.co": "checkout",
      "alias.tags": "tag -l",
      "alias.stashes": "stash list",
      "alias.b": "branch -a -v",
      "alias.remotes": "remote -v",
      "alias.out": "log @{u}..",
      "alias.wdiff": "diff --color-words",
      "alias.pull": "pull --ff-only",
      "alias.amend": "!git log -n 1 --pretty=tformat:%s%n%n%b | git commit -F - --amend",
      "alias.fixup": "commit --fixup=HEAD"
    }
  }, options);
  const repo = await getRepo(twd);
  await setRules(repo, rules);
}

async function getRepo(twd) {
  const repo = await _nodegit.Repository.open(twd);
  const cfg = await repo.config();
  return cfg;
}

async function setRules(gitCfg, rules) {
  await (0, _eachOfSeries.default)(rules, async (val, key) => {
    await gitCfg.setString(key, val);
    return;
  });
}

var _default = setGit;
exports.default = _default;
module.exports = exports.default;