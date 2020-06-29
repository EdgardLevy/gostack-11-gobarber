const jestConfig = require('./jest.config');

module.exports = {
  jest(config) {
    config.preset = jestConfig.preset;
    config.reporters = jestConfig.reporters;
    config.collectCoverageFrom = jestConfig.collectCoverageFrom;
    return config;
  },
};
