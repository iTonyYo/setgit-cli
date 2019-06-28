import isEmpty from './utilities/isEmpty';

export default (twd) => {
  return {
    twd: isEmpty(twd) ? process.cwd() : twd,
    cwd: process.cwd(),
  };
}
