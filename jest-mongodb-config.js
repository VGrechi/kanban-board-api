module.exports = {
    mongodbMemoryServerOptions: {
      instance: {
        dbName: 'kanbanboard-db-test'
      },
      binary: {
        version: '4.2.3',
        skipMD5: true
      },
      autoStart: false
    }
  };