#!/usr/bin/env node

import Cli from './cli';

(async () => {
  try {
    const cli = new Cli();
    await cli.run();
  } catch (error) {
    throw error;
  }
})();
