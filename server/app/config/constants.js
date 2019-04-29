import path from 'path';

// Default configuations applied to all environments
const defaultConfig = {
  env: process.env.NODE_ENV,
  get envs() {
    return {
      test: process.env.NODE_ENV === 'test',
      development: process.env.NODE_ENV === 'development',
      production: process.env.NODE_ENV === 'production',
    };
  },

  version: require('../../package.json').version,
  root: path.normalize(__dirname + '/../../..'),
  port: process.env.APIPORT || 4567,
  apiPrefix: '/api/v1', // Could be /api/resource or /api/v2/resource

  /**
   * MongoDB configuration options
   */
  mongo: {
    seed: true,
    options: {
      db: {
        safe: true,
      },
    },
  },
};

// Environment specific overrides
const environmentConfigs = {
  development: {
    mongo: {
      uri: process.env.MONGO_URI || 'mongodb://mongodb/development',
    }
  },
  test: {
    port: 5678,
    mongo: {
      uri: process.env.MONGO_URI || 'mongodb://localhost:27017/test',
    }
  },
  production: {
    mongo: {
      uri: process.env.MONGO_URI || 'mongodb://mongodb/production'
    }
  },
};

// Recursively merge configurations
export default Object.assign(defaultConfig, environmentConfigs[process.env.NODE_ENV] || {});
