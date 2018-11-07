/* eslint-disable no-console */

export default class Reporting {
  constructor({ debug = false } = {}) {
    this.debug = debug;
  }

  get showError() {
    return this.debug;
  }

  warn = (...args) => {
    if (this.showError && args.length) {
      console.warn(...args);
    }
  };

  table = (...args) => {
    if (this.showError && args.length) {
      console.table(...args);
    }
  };
}
