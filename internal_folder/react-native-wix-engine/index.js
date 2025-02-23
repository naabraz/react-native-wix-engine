const AppRunner = require('./src/AppRunner');
const engineConfig = require('../../engine_autogenerated/config');
const moduleGenerators = require('../../engine_autogenerated/modules').default;
const appRunner = new AppRunner({ engineConfig, moduleGenerators });
appRunner.listenToNativeAppLaunch();
