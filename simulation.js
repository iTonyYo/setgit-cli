#!/usr/bin/env node

const Cli = require('./lib/cli');

(async () => {
  try {
    const cli = new Cli();
    await cli.run();
  } catch (error) {
    throw error;
  }
})();

// 在命令行直接使用该脚本前，需要先修改它的属性，`chmod +x ./simulation.js`。
