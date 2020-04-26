#!/usr/bin/env node
"use strict";function e(e){return e&&"object"==typeof e&&"default"in e?e.default:e}var r=e(require("meow")),t=e(require("update-notifier")),i=require("cosmiconfig"),s=e(require("is-git-repository")),a=e(require("redent")),o=e(require("gradient-string")),l=e(require("chalk")),n=require("nodegit"),c=e(require("async/eachOfSeries")),g=e=>[Object,Array].includes((e||{}).constructor)&&!Object.entries(e||{}).length;const d=require("deepmerge");async function u(e={twd:".",rules:{}}){const{twd:r,rules:t}=d({twd:".",rules:{"core.ignorecase":"false","alias.s":"status","alias.p":"push","alias.b":"branch -a -v","alias.pl":"pull --ff-only","alias.med":"merge develop","alias.mem":"merge master","alias.tags":"tag -l","alias.co":"checkout","alias.stashes":"stash list","alias.l":"log -16 --color=always --all --topo-order --pretty='%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --date=relative","alias.ll":"log --color=always --all --topo-order --pretty='%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit","alias.lg":"log -10 --color=always --all --graph --topo-order --pretty='%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --date=relative","alias.lgl":"log --color=always --all --graph --topo-order --pretty='%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit","alias.le":"!git log --oneline --color | emojify | less -r","alias.out":"log @{u}..","alias.wdiff":"diff --color-words","alias.amend":"!git log -n 1 --pretty=tformat:%s%n%n%b | git commit -F - --amend","alias.fixup":"commit --fixup=HEAD","alias.ls":"ls-files","alias.remotes":"remote -v"}},e),i=await async function(e){const r=await n.Repository.open(e);return await r.config()}(r);await async function(e,r){await c(r,async(r,t)=>{await e.setString(t,r)})}(i,t)}class h{constructor(){var e;t({pkg:{name:"setgit-cli",version:"1.1.1"}}).notify(),this.cli=r("\n      使用方式\n        $ setgit [工作目录，默认：'process.cwd()']\n\n      选项\n        --version, -v                              查看版本号\n        --help, -h                                 查看帮助\n\n      示例\n        $ setgit                                   为当前工作目录配置 Git\n        $ setgit /usr/pro/api.name.io              为指定工作目录配置 Git\n\n      提示\n        检测到用户未提供自定义配置时，`setgit` 将会使用默认配置，详情参见\n        https://github.com/iTonyYo/setgit-cli#配置。\n    ",{flags:{version:{type:"boolean",alias:"v"},help:{type:"boolean",alias:"h"}}}),this.workingPath=(e=this.cli.input[0],{twd:g(e)?process.cwd():e,cwd:process.cwd()}).twd,this.userDefinedConfig=this.getUserDefinedConfig()}async run(){s(this.workingPath)?(await u({twd:this.workingPath,rules:this.userDefinedConfig}),this.success()):this.error()}success(){g(this.userDefinedConfig)?console.log(a(l`
        {bold ${o.rainbow("操作成功!")}}
        {grey 检测到您未提供自定义配置，\`setgit\` 使用了默认配置。}

        {grey 操作目录：}
        {grey ${this.workingPath}}
      `)):console.log(a(l`
      {greenBright.bold ${o.rainbow("操作成功!")}}

      {grey 操作目录：}
      {grey ${this.workingPath}}
    `))}error(){console.error(a(l`
      {redBright.bold 这不是一个 Git 仓库!}

      {grey 操作目录：}
      {grey ${this.workingPath}}
    `))}getUserDefinedConfig(){const e=i.cosmiconfigSync("git").search(this.workingPath);return g(e)?{}:((e,r,t=null)=>String.prototype.split.call(r,/[,[\].]+?/).filter(Boolean).reduce((e,r)=>Object.hasOwnProperty.call(e,r)?e[r]:t,e))(e,"config")}}(async()=>{try{const e=new h;await e.run()}catch(e){throw e}})();
