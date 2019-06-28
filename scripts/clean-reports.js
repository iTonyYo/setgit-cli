import trash from 'trash';
import { resolveCwd } from './paths';

(async () => {
  await trash([
    resolveCwd('yarn-error.log'),
    resolveCwd('.nyc_output'),
    resolveCwd('coverage'),
    resolveCwd('report'),
    resolveCwd('licenses-development.csv '),
    resolveCwd('licenses-production.csv'),
    resolveCwd('docs/licenses-development.csv '),
    resolveCwd('docs/licenses-production.csv'),
  ]);
})();
