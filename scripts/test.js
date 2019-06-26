import execa from 'execa';

// npx cross-env NODE_ENV=test npx nyc mocha --require @babel/register --no-opts --no-package 'src/**/?(*.)+(spec|test).[tj]s?(x)'
(async () => {
  try {
    const result = await execa('npx', [
      'nyc',
      'mocha',
      '--require',
      '@babel/register',
      '--no-opts',
      'src/**/?(*.)+(spec|test).[tj]s?(x)',
    ]);

    console.log(result.stdout);
  } catch (error) {
    console.error(error.stderr);
  }
})();
