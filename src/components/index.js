
import showDailog from './Dialog/index.js';

export default {
  install: (Vue, options) => {
    Vue.prototype.$showDailog = showDailog;
  }
};
