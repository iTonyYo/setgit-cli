export default {
  twd: ".",
  configs: {
    "alias.ls": "ls-files",
    "alias.remotes": "remote -v",

    "alias.amend":
      "!git log -n 1 --pretty=tformat:%s%n%n%b | git commit -F - --amend",
    "alias.fixup": "commit --fixup=HEAD",

    "core.ignorecase": "false",

    "alias.s": "status",
    "alias.p": "push",
    "alias.b": "branch -a -v",
    "alias.cm": "commit -m",
    "alias.tags": "tag -l",
    "alias.co": "checkout",
    "alias.all": "add -A",
    "alias.pl": "pull --ff-only",
    "alias.stashes": "stash list",
    "alias.med": "merge develop",
    "alias.mem": "merge master",

    "alias.l": "log --oneline --color -6",
    "alias.out": "log @{u}..",
    "alias.la":
      "log -16 --color=always --all --topo-order --pretty='%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --date=relative",
    "alias.ll":
      "log --color=always --all --topo-order --pretty='%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit",
    "alias.lg":
      "log -10 --color=always --all --graph --topo-order --pretty='%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --date=relative",
    "alias.lgl":
      "log --color=always --all --graph --topo-order --pretty='%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit",

    "alias.wdiff": "diff --color-words",
  },
};
