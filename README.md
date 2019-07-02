# $ setgit

配置 Git。

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

## 贡献指南

仔细查阅 [CONTRIBUTING.md][贡献指南] 以了解详情。

## 证书

[`setgit-cli`][setgit-cli] 获得了 MIT 许可，仔细查阅 [LICENSE.md][证书] 以了解详情。



[贡献指南]: https://github.com/iTonyYo/setgit-cli/blob/master/CONTRIBUTING.md
[证书]: https://github.com/iTonyYo/setgit-cli/blob/master/LICENSE.md
[setgit-cli]: https://github.com/iTonyYo/setgit-cli