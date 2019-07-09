[![Maintainability](https://api.codeclimate.com/v1/badges/3f0bad62b3e1e0e70dec/maintainability)](https://codeclimate.com/github/iTonyYo/setgit-cli/maintainability) [![Package Quality](https://npm.packagequality.com/shield/setgit-cli.svg)](https://packagequality.com/#?package=setgit-cli)

# $ setgit

配置 Git。

![Image of Yaktocat](https://raw.githubusercontent.com/iTonyYo/setgit-cli/master/example.gif)

## 安装

```shell
# 使用 NPM
$ npm i -g setgit-cli

# 使用 Yarn
$ yarn global add setgit-cli
```

## 使用

```
使用方式
  $ setgit [工作目录，默认：'process.cwd()']

选项
  --version, -V                                 查看版本号
  --help, -h                                    查看帮助

示例
  $ setgit                                      为当前工作目录配置 Git
  $ setgit /usr/pro/api.name.io                 为指定工作目录配置 Git
```

## 配置

默认情况下，[`setgit-cli`][setgit-cli] 会搜索以下文件中的 `git` 属性：

- `package.json` 属性；
- `JSON` 或者 `YAML` 等无后缀的 `rc` 文件；
- 有后缀的 `rc` 文件，诸如：`.json`, `.yaml`, `.yml`, 或者 `.js`；
- `.config.js` **CommonJS** 模块；

例如：

- `package.json` 文件中的 `git` 属性
- `JSON` 或者 `YAML` 格式的 `.gitrc` 文件
- `.gitrc.json` 文件
- `.gitrc.yaml`, `.gitrc.yml`, 或者 `.gitrc.js` 文件
- 导出一个 JS 对象的 `git.config.js` 文件

[`setgit-cli`][setgit-cli] 从工作目录开始搜索配置，如果在根目录没有找到，会继续搜索子目录，直到找到有效的配置。

默认的配置：
```
{
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
  "alias.fixup": "commit --fixup=HEAD",
}
```

## 贡献指南

仔细查阅 [CONTRIBUTING.md][贡献指南] 以了解详情。

## 证书

[`setgit-cli`][setgit-cli] 获得了 MIT 许可，仔细查阅 [LICENSE.md][证书] 以了解详情。



[贡献指南]: https://github.com/iTonyYo/setgit-cli/blob/master/CONTRIBUTING.md
[证书]: https://github.com/iTonyYo/setgit-cli/blob/master/LICENSE.md
[setgit-cli]: https://github.com/iTonyYo/setgit-cli