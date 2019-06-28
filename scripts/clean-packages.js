import trash from 'trash';
import { resolveCwd } from './paths';

(async () => {
  await trash([
    resolveCwd('yarn.lock'),
    resolveCwd('package-lock.json'),

    resolveCwd('node_modules'),
  ]);
})();
