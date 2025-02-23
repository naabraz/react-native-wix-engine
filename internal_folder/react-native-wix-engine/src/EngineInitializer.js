import autoBind from 'react-autobind';

/**
 * Initialize Engine components, modules, and configure them.
 * This is required in order to set business logic and show ui.
 */
class EngineInitializer {
  constructor() {
    this._dependencies = {};
    autoBind(this);
  }

  /**
   * initialize the engine and configure it and its dependencies
   * @param engineConfig config object basically it comes from engine_autogenerated
   * @param moduleGenerators moduleGenerators object basically it comes from engine_autogenerated
   * @returns {Promise<Function>} launch function which will run the ui and the whole js logic when called
   */
  async initEngine(engineConfig, moduleGenerators) {
    const dependenciesInitializer = require('./AppDependenciesInitializer');
    this._dependencies = await dependenciesInitializer.init(
      engineConfig,
      moduleGenerators,
    );
    this.injectGlobalEngine(this._dependencies);
    const { moduleManager } = this._dependencies;
    moduleManager.initModules();
    return this._dependencies.appLauncher.launch;
  }

  /**
   * engine global is a convinience way for modules to use engine APIs, instead of require the engine explicitly
   */
  injectGlobalEngine({ moduleRegistry }) {
    global.engine = {
      moduleRegistry,
    };
  }
}

module.exports = new EngineInitializer();
