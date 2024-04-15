module.exports = {
  servers: {
    one: {
      host: 'uhmwhattoeat.online',
      username: 'root',
      password: 'JJJ24esc'
    }
  },
  app: {
    // if you edit the app 'name' field, be sure to run 'mup stop' if the app is already running.
    // otherwise you will have two apps deployed at once, with unpredictable results.
    name: 'uhm-what-to-eat',
    path: '../',
    servers: { one: {}, },
    buildOptions: { serverOnly: true },
    env: {
      ROOT_URL: 'https://uhmwhattoeat.online',
      MONGO_URL: 'mongodb://mongodb/meteor',
      MONGO_OPLOG_URL: 'mongodb://mongodb/local',
    },
    docker: { image: 'zodern/meteor:latest' },
    enableUploadProgressBar: true
  },
  mongo: { version: '5.0.5', servers: { one: {} }
  },
  proxy: {
    domains: 'uhmwhattoeat.online',
    ssl: {
      letsEncryptEmail: 'cdc21@hawaii.edu',
      forceSSL: true
    }
  },
};
