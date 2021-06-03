import { cosmiconfigSync } from "cosmiconfig";

import isEmpty from "./isEmpty";
import get from "./get";

export default function getCosmiconfigSync({ name, workingPath }) {
  const explorerSync = cosmiconfigSync(name);
  const foundConfig = explorerSync.search(workingPath);

  return isEmpty(foundConfig) ? {} : get(foundConfig, "config");
}
