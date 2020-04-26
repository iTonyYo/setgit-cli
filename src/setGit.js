import { Repository } from 'nodegit';
import eachOfSeries from 'async/eachOfSeries';

import merge from './utilities/merge';

async function setGit(options = {twd: '.', rules: {}}) {
  const { twd, rules } = merge({
    twd: '.',
    rules: {
      "core.ignorecase": "false",

      "alias.s": "status",
      "alias.p": "push",
      "alias.b": "branch -a -v",
      "alias.pl": "pull --ff-only",
      "alias.med": "merge develop",
      "alias.mem": "merge master",
      "alias.tags": "tag -l",
      "alias.co": "checkout",
      "alias.stashes": "stash list",

      "alias.l": "log -16 --color=always --all --topo-order --pretty='%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --date=relative",
      "alias.ll": "log --color=always --all --topo-order --pretty='%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit",
      "alias.lg": "log -10 --color=always --all --graph --topo-order --pretty='%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --date=relative",
      "alias.lgl": "log --color=always --all --graph --topo-order --pretty='%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit",
      "alias.le": "!git log --oneline --color | emojify | less -r",
      "alias.out": "log @{u}..",

      "alias.wdiff": "diff --color-words",
      "alias.amend": "!git log -n 1 --pretty=tformat:%s%n%n%b | git commit -F - --amend",
      "alias.fixup": "commit --fixup=HEAD",

      "alias.ls": "ls-files",
      "alias.remotes": "remote -v",
    },
  }, options);

  const repo = await getRepo(twd);
  await setRules(repo, rules);
}

async function getRepo(twd) {
  const repo = await Repository.open(twd);
  const cfg = await repo.config();

  return cfg;
}

async function setRules(gitCfg, rules) {
  await eachOfSeries(rules, async (val, key) => {
    await gitCfg.setString(key, val);
    return;
  });
}

export default setGit;
