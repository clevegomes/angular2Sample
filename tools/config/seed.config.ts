import { readdirSync, lstatSync } from 'fs';
import { join } from 'path';
import * as slash from 'slash';
import * as util from 'gulp-util';
import { argv } from 'yargs';

import { BuildType, ExtendPackages, InjectableDependency } from './seed.config.interfaces';

/************************* DO NOT CHANGE ************************
 *
 * DO NOT make any changes in this file because it will
 * make your migration to newer versions of the seed harder.
 *
 * Your application-specific configurations should be
 * in project.config.ts. If you need to change any tasks
 * from "./tasks" overwrite them by creating a task with the
 * same name in "./projects". For further information take a
 * look at the documentation:
 *
 * 1) https://github.com/mgechev/angular2-seed/tree/master/tools
 * 2) https://github.com/mgechev/angular2-seed/wiki
 *
 *****************************************************************/

/**
 * The enumeration of available environments.
 * @type {Environments}
 */
export const BUILD_TYPES: BuildType = {
  DEVELOPMENT: 'dev',
  PRODUCTION: 'prod',
  STAGING: 'staging'
};

/**
 * This class represents the basic configuration of the seed.
 * It provides the following:
 * - Constants for directories, ports, versions etc.
 * - Injectable NPM dependencies
 * - Injectable application assets
 * - Temporary editor files to be ignored by the watcher and asset builder
 * - SystemJS configuration
 * - Autoprefixer configuration
 * - BrowserSync configuration
 * - Utilities
 */
export class SeedConfig {

  /**
   * The port where the application will run.
   * The default port is `5555`, which can be overriden by the  `--port` flag when running `npm start`.
   * @type {number}
   */
  PORT = argv['port'] || 5555;

  /**
   * The root folder of the project (up two levels from the current directory).
   */
  PROJECT_ROOT = join(__dirname, '../..');

  /**
   * The current build type.
   * The default build type is `dev`, which can be overriden by the `--build-type dev|prod` flag when running `npm start`.
   */
  BUILD_TYPE = getBuildType();
  CONFIG_ENV = getConfigEnvironment();

  get ENV() {
    util.log(util.colors.yellow('Warning: the "ENV" property is deprecated. Use "BUILD_TYPE" instead.'));
    return this.BUILD_TYPE;
  }

  /**
   * The flag for the debug option of the application.
   * The default value is `false`, which can be overriden by the `--debug` flag when running `npm start`.
   * @type {boolean}
   */
  DEBUG = argv['debug'] || false;

  /**
   * The port where the documentation application will run.
   * The default docs port is `4003`, which can be overriden by the `--docs-port` flag when running `npm start`.
   * @type {number}
   */
  DOCS_PORT = argv['docs-port'] || 4003;

  /**
   * The port where the unit test coverage report application will run.
   * The default coverage port is `4004`, which can by overriden by the `--coverage-port` flag when running `npm start`.
   * @type {number}
   */
  COVERAGE_PORT = argv['coverage-port'] || 4004;

  /**
  * The path to the coverage output
  * NB: this must match what is configured in ./karma.conf.js
  */
  COVERAGE_DIR = 'coverage';

  /**
   * Karma reporter configuration
   */
  KARMA_REPORTERS: any = {
    preprocessors: {
      'dist/**/!(*spec).js': ['coverage']
    },
    reporters: ['mocha', 'coverage'],
    coverageReporter: {
      dir: this.COVERAGE_DIR + '/',
      reporters: [
        {type: 'json', subdir: '.', file: 'coverage-final.json'}
      ]
    }
  };

  /**
   * The path for the base of the application at runtime.
   * The default path is based on the environment '/',
   * which can be overriden by the `--base` flag when running `npm start`.
   * @type {string}
   */
  APP_BASE = argv['base'] || '/';

  /**
   * The base path of node modules.
   * @type {string}
   */
  NPM_BASE = slash(join(this.APP_BASE, 'node_modules/'));

  /**
   * The flag for the hot-loader option of the application.
   * Per default the option is not set, but can be set by the `--hot-loader` flag when running `npm start`.
   * @type {boolean}
   */
  ENABLE_HOT_LOADING = argv['hot-loader'];

  /**
   * The port where the application will run, if the `hot-loader` option mode is used.
   * The default hot-loader port is `5578`.
   * @type {number}
   */
  HOT_LOADER_PORT = 5578;

  /**
   * The build interval which will force the TypeScript compiler to perform a typed compile run.
   * Between the typed runs, a typeless compile is run, which is typically much faster.
   * For example, if set to 5, the initial compile will be typed, followed by 5 typeless runs,
   * then another typed run, and so on.
   * If a compile error is encountered, the build will use typed compilation until the error is resolved.
   * The default value is `0`, meaning typed compilation will always be performed.
   * @type {number}
   */
  TYPED_COMPILE_INTERVAL = 0;

  /**
   * The directory where the bootstrap file is located.
   * The default directory is `app`.
   * @type {string}
   */
  BOOTSTRAP_DIR = argv['app'] || 'app';

  /**
   * The directory where the client files are located.
   * The default directory is `client`.
   * @type {string}
   */
  APP_CLIENT = argv['client'] || 'client';

  /**
   * The bootstrap file to be used to boot the application. The file to be used is dependent if the hot-loader option is
   * used or not.
   * Per default (non hot-loader mode) the `main.ts` file will be used, with the hot-loader option enabled, the
   * `hot_loader_main.ts` file will be used.
   * @type {string}
   */
  BOOTSTRAP_MODULE = `${this.BOOTSTRAP_DIR}/` + (this.ENABLE_HOT_LOADING ? 'hot_loader_main' : 'main');

  BOOTSTRAP_PROD_MODULE = `${this.BOOTSTRAP_DIR}/` + 'main';

  BUNDLES = [
    { path: 'employers/profile', module: 'profile.module' },
    { path: 'employers/dashboard', module: 'dashboard.module' },
    { path: 'employers/job', module: 'job.module' },
    { path: 'employers/blog', module: 'editBlog.module' },
    { path: 'employers/blog', module: 'editBlog.module' },
    { path: 'core/account', module: 'account.module' },
    { path: 'employers/candidate', module: 'candidate.module' },
    { path: 'jobseekers/blog', module: 'listBlog.module' },
    { path: 'jobseekers/company', module: 'company.module' },
    { path: 'jobseekers/job', module: 'job.module' },
    { path: 'jobseekers/dashboard', module: 'dashboard.module' },
    { path: 'jobseekers/profile', module: 'profile.module' },
    { path: 'core/publicPage', module: 'publicPage.module' },
    { path: 'core/publicPage', module: 'signupjobseeker.module' },
    { path: 'core/publicPage', module: 'signupemployer.module' },
    { path: 'app', module: 'jobseeker.module' },
    { path: 'app', module: 'employer.module' },
  ];

  NG_FACTORY_FILE = 'main-prod';

  BOOTSTRAP_FACTORY_PROD_MODULE = `${this.BOOTSTRAP_DIR}/${this.NG_FACTORY_FILE}`;
  /**
   * The default title of the application as used in the `<title>` tag of the
   * `index.html`.
   * @type {string}
   */
  APP_TITLE = 'Welcome to Bloovo';

  /**
   * The base folder of the applications source files.
   * @type {string}
   */
  APP_SRC = `src/${this.APP_CLIENT}`;

  /**
   * The folder of the applications asset files.
   * @type {string}
   */
  ASSETS_SRC = `${this.APP_SRC}/assets`;

  /**
   * The folder of the applications css files.
   * @type {string}
   */
  CSS_SRC = `${this.APP_SRC}/css`;

  /**
   * The directory of the applications tools
   * @type {string}
   */
  TOOLS_DIR = 'tools';

  /**
   * The directory of the tasks provided by the seed.
   */
  SEED_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'seed');

  /**
   * The destination folder for the generated documentation.
   * @type {string}
   */
  DOCS_DEST = 'docs';

  /**
   * The base folder for built files.
   * @type {string}
   */
  DIST_DIR = 'public';

  /**
   * The folder for built files in the `dev` environment.
   * @type {string}
   */
  DEV_DEST = `${this.DIST_DIR}`;

  /**
   * The folder for the built files in the `prod` environment.
   * @type {string}
   */
  PROD_DEST = `${this.DIST_DIR}`;

  /**
   * The folder for temporary files.
   * @type {string}
   */
  TMP_DIR = `${this.DIST_DIR}/tmp`;

  /**
   * The folder for the built files, corresponding to the current environment.
   * @type {string}
   */
  APP_DEST = this.BUILD_TYPE === BUILD_TYPES.DEVELOPMENT ? this.DEV_DEST : this.PROD_DEST;

  /**
   * The folder for the built CSS files.
   * @type {strings}
   */
  CSS_DEST = `${this.APP_DEST}`;

  /**
   * The folder for the built JavaScript files.
   * @type {string}
   */
  JS_DEST = `${this.APP_DEST}/js`;

  /**
   * The version of the application as defined in the `package.json`.
   */
  VERSION = appVersion();

  /**
   * The name of the bundle file to includes all CSS files.
   * @type {string}
   */
  CSS_PROD_BUNDLE = 'main.css';
  SCSS_PROD_BUNDLE = 'sass/main.css';

  /**
   * The name of the bundle file to include all JavaScript shims.
   * @type {string}
   */
  JS_PROD_SHIMS_BUNDLE = 'shims.js';

  /**
   * The name of the bundle file to include all JavaScript application files.
   * @type {string}
   */
  JS_PROD_APP_BUNDLE = 'app.js';

  /**
   * The required NPM version to run the application.
   * @type {string}
   */
  VERSION_NPM = '2.14.2';

  /**
   * The required NodeJS version to run the application.
   * @type {string}
   */
  VERSION_NODE = '4.0.0';

  /**
   * The flag to enable handling of SCSS files
   * The default value is false. Override with the '--scss' flag.
   * @type {boolean}
   */
  ENABLE_SCSS = argv['scss'] || true;

  /**
   * The list of NPM dependcies to be injected in the `index.html`.
   * @type {InjectableDependency[]}
   */
  NPM_DEPENDENCIES: InjectableDependency[] = [
    { src: 'zone.js/dist/zone.js', inject: 'libs' },
    { src: 'core-js/client/shim.min.js', inject: 'shims' },
    { src: 'systemjs/dist/system.src.js', inject: 'shims' },
    // { src: 'systemjs/dist/system.src.js', inject: 'shims', buildType: BUILD_TYPES.DEVELOPMENT },
    // Temporary fix. See https://github.com/angular/angular/issues/9359
    { src: '.tmp/Rx.min.js', inject: 'libs', buildType: BUILD_TYPES.DEVELOPMENT },
    // { src: 'chart.js/dist/Chart.min.js', inject: 'libs'},
    { src: 'intl/dist/Intl.min.js', inject: 'libs'},
    { src: 'intl/locale-data/jsonp/en.js', inject: 'libs'},
    { src: 'jquery/dist/jquery.js', inject: 'libs'},
    { src: 'bootstrap/dist/js/bootstrap.js', inject: 'libs'},
    // { src: 'intl-tel-input/build/css/intlTelInput.css', inject: 'libs'},
    { src: 'intl-tel-input/build/js/intlTelInput.js', inject: 'libs'},
    { src: 'intl-tel-input/build/js/utils.js', inject: 'libs'},
    // { src: 'tinymce/tinymce.js', inject: 'libs'},
    // { src: 'tinymce/themes/modern/theme.js', inject: 'libs'},
    // { src: 'tinymce/plugins/link/plugin.js', inject: 'libs'},
    // { src: 'tinymce/plugins/paste/plugin.js', inject: 'libs'},
    // { src: 'tinymce/plugins/table/plugin.js', inject: 'libs'}
  ];



  /**
   * The list of local files to be injected in the `index.html`.
   * @type {InjectableDependency[]}
   */

  // APP_ASSETS: InjectableDependency[] = [];

  APP_ASSETS: InjectableDependency[] = [
    { src: `${this.CSS_SRC}/main.${this.getInjectableStyleExtension()}`, inject: true, vendor: false },
    { src: `${this.DIST_DIR}/${this.SCSS_PROD_BUNDLE}`, inject: true, vendor: false },
    { src: `${this.ASSETS_SRC}/local_modules/polyfill.min.js`, inject: true, vendor: true },
    { src: `${this.CSS_SRC}/bootstrap.css`, inject: true, vendor: false },
    { src: `${this.CSS_SRC}/intlTelInput.css`, inject: true, vendor: false },
  //
    { src: `${this.ASSETS_SRC}/fonts/material/material-design.css`, inject: true, vendor: false },
    { src: `${this.ASSETS_SRC}/fonts/helvertica/stylesheet.css`, inject: true, vendor: false },
    { src: `${this.ASSETS_SRC}/fonts/bloovo-font/bloovo-fonts.css`, inject: true, vendor: false },
    { src: `${this.ASSETS_SRC}/local_modules/bootstrap-select.css`, inject: true, vendor: false },
  //   { src: `${this.ASSETS_SRC}/local_modules/rrssb.css`, inject: true, vendor: false },
  //   { src: `${this.ASSETS_SRC}/local_modules/googleChartLoader.js`, inject: true, vendor: false },
  //   { src: `${this.ASSETS_SRC}/local_modules/rrssb.min.js`, inject: true, vendor: false },
  //   { src: `${this.ASSETS_SRC}/local_modules/mediaelement-and-player.min.js`, inject: true, vendor: false },
  //   { src: `${this.ASSETS_SRC}/local_modules/bootstrap-select.js`, inject: true, vendor: false },
  //   { src: `${this.ASSETS_SRC}/local_modules/bootstrap-select.css`, inject: true, vendor: false },
    // { src: `${this.ASSETS_SRC}/local_modules/scrolltab.js`, inject: true, vendor: false },
    // { src: `${this.ASSETS_SRC}/local_modules/timezones.full.min.js`, inject: true, vendor: false },
  //   { src: `${this.ASSETS_SRC}/local_modules/date-picker.js`, inject: true, vendor: false },
    { src: `${this.ASSETS_SRC}/local_modules/swiper.min.js`, inject: true, vendor: false },
  //   { src: `${this.ASSETS_SRC}/local_modules/jspdf.debug.js`, inject: true, vendor: false },
  //   { src: `${this.ASSETS_SRC}/local_modules/html2pdf.js`, inject: true, vendor: false },
    { src: `${this.ASSETS_SRC}/skins/lightgray/skin.min.css`, inject: true, vendor: true },
    { src: `${this.ASSETS_SRC}/skins/lightgray/content.min.css`, inject: true, vendor: true }
  ];

  /**
   * The list of editor temporary files to ignore in watcher and asset builder.
   * @type {string[]}
   */
  TEMP_FILES: string[] = [
    '**/*___jb_tmp___',
    '**/*~',
  ];

  /**
   * Returns the array of injectable dependencies (npm dependencies and assets).
   * @return {InjectableDependency[]} The array of npm dependencies and assets.
   */
  get DEPENDENCIES(): InjectableDependency[] {
    return normalizeDependencies(this.NPM_DEPENDENCIES.filter(filterDependency.bind(null, this.BUILD_TYPE)))
      .concat(this.APP_ASSETS.filter(filterDependency.bind(null, this.BUILD_TYPE)));
  }

  /**
   * The configuration of SystemJS for the `dev` environment.
   * @type {any}
   */
  SYSTEM_CONFIG_DEV: any = {
    defaultJSExtensions: true,
    paths: {
      [this.BOOTSTRAP_MODULE]: `${this.APP_BASE}${this.BOOTSTRAP_MODULE}`,
      '@angular/common': 'node_modules/@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'node_modules/@angular/compiler/bundles/compiler.umd.js',
      '@angular/core': 'node_modules/@angular/core/bundles/core.umd.js',
      '@angular/forms': 'node_modules/@angular/forms/bundles/forms.umd.js',
      '@angular/http': 'node_modules/@angular/http/bundles/http.umd.js',
      '@angular/platform-browser': 'node_modules/@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/router': 'node_modules/@angular/router/bundles/router.umd.js',

      // '@angular/common/testing': 'node_modules/@angular/common/bundles/common-testing.umd.js',
      // '@angular/compiler/testing': 'node_modules/@angular/compiler/bundles/compiler-testing.umd.js',
      // '@angular/core/testing': 'node_modules/@angular/core/bundles/core-testing.umd.js',
      // '@angular/http/testing': 'node_modules/@angular/http/bundles/http-testing.umd.js',
      // '@angular/platform-browser/testing':
      //   'node_modules/@angular/platform-browser/bundles/platform-browser-testing.umd.js',
      // '@angular/platform-browser-dynamic/testing':
      //   'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.js',
      // '@angular/router/testing': 'node_modules/@angular/router/bundles/router-testing.umd.js',

      'app/*': '/app/*',
      // For test config
      'dist/dev/*': '/base/dist/dev/*',
      '*': 'node_modules/*',
      // 'rxjs/operators/*' : 'node_modules/rxjs/operators/*.js',
      // 'rxjs/add/operator/*' : 'node_modules/rxjs/add/operator/*.js',
      // 'rxjs/*' : 'node_modules/rxjs/*.js'
    },
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },
      'moment': {
        main: './moment.js',
        defaultExtension: 'js'
      },
      'moment-timezone': {
        main: './builds/moment-timezone-with-data.js',
        defaultExtension: 'js'
      },
      // 'intl-tel-input': {
      //   main: './index.js',
      //   defaultExtension: 'js'
      // },
      // 'jquery': {
      //   main: './dist/jquery.js',
      //   defaultExtension: 'js'
      // },
      'localrepo/scrolltab': {
        main: './scrolltab.js',
        defaultExtension: 'js'
      },
      'localrepo/rrssb': {
        main: './rrssb.js',
        defaultExtension: 'js'
      },
      'localrepo/mediaelement': {
        main: './mediaelement-and-player.min.js',
        defaultExtension: 'js'
      },
      'localrepo/googleChartLoader': {
        main: './googleChartLoader.js',
        defaultExtension: 'js'
      },
      'pikaday': {
        main: './pikaday.js',
        defaultExtension: 'js'
      },
      'tinymce': {
        main: './tinymce.min.js',
        // format: "js"
        defaultExtension: 'js',
        // "shim": {
        //     "tinymce.min": {
        //     "exports": "tinyMCE"
        //     },
        // "tinymce": {
        //    "exports": "tinyMCE"
        //     }
        //   }
      },
      'modern': {
        main: '../tinymce/themes/modern/theme.min.js',
        defaultExtension: 'js'

      }
      // 'bootstrap': {
      //   main: './dist/js/bootstrap.js',
      //   defaultExtension: 'js'
      // }
    }
  };


  /**
   * The configuration of SystemJS of the application.
   * Per default, the configuration of the `dev` environment will be used.
   * @type {any}
   */
  SYSTEM_CONFIG: any = this.SYSTEM_CONFIG_DEV;

  /**
   * The system builder configuration of the application.
   * @type {any}
   */
  SYSTEM_BUILDER_CONFIG: any = {
    defaultJSExtensions: true,
    base: this.PROJECT_ROOT,
    paths: {
      // Note that for multiple apps this configuration need to be updated
      // You will have to include entries for each individual application in
      // `src/client`.
      [join(this.TMP_DIR, this.BOOTSTRAP_DIR, '*')]: `${this.TMP_DIR}/${this.BOOTSTRAP_DIR}/*`,
      [join(this.TMP_DIR, this.APP_SRC, '*')]: `${this.TMP_DIR}/${this.APP_SRC}/*`,
      'dist/tmp/node_modules/*': 'dist/tmp/node_modules/*',
      '@angular/common': 'node_modules/@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'node_modules/@angular/compiler/bundles/compiler.umd.js',
      '@angular/core': 'node_modules/@angular/core/bundles/core.umd.js',
      '@angular/forms': 'node_modules/@angular/forms/bundles/forms.umd.js',
      '@angular/http': 'node_modules/@angular/http/bundles/http.umd.js',
      '@angular/platform-browser': 'node_modules/@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/router': 'node_modules/@angular/router/bundles/router.umd.js',
      'moment': 'node_modules/moment/moment.js',
      'pikaday': 'node_modules/pikaday/pikaday.js',
      // 'jquery': 'node_modules/jquery/dist/jquery.js',
      // 'bootstrap': 'node_modules/bootstrap/dist/js/bootstrap.js',
      'localrepo/scrolltab': 'node_modules/localrepo/scrolltab/scrolltab.js',
      'localrepo/rrssb': 'node_modules/localrepo/rrssb/rrssb.js',
      'intl-tel-input': 'node_modules/intl-tel-input/index.js',
      'localrepo/mediaelement': 'node_modules/localrepo/mediaelement/mediaelement-and-player.min.js',
      'localrepo/googleChartLoader': 'node_modules/localrepo/googleChartLoader/googleChartLoader.js',
      'tinymce': 'node_modules/tinymce/tinymce.min.js',
      'modern': 'node_modules/tinymce/themes/modern/theme.min.js',
      'moment-timezone': 'node_modules/moment-timezone/builds/moment-timezone-with-data.js',
      // 'localrepo/timezone': 'node_modules/localrepo/timezone/timezones.full.min.js',
      // 'moment-timezone': 'node_modules/moment-timezone/builds/moment-timezone-with-data.js',
      // 'moment-timezone': 'public/tmp/assets/local_modules/timezones.full.min.js',
      // 'scrolltab':`${this.ASSETS_SRC}/local_modules/scrolltab.js`,

      // '@angular/common/testing': 'node_modules/@angular/common/bundles/common-testing.umd.js',
      // '@angular/compiler/testing': 'node_modules/@angular/compiler/bundles/compiler-testing.umd.js',
      // '@angular/core/testing': 'node_modules/@angular/core/bundles/core-testing.umd.js',
      // '@angular/http/testing': 'node_modules/@angular/http/bundles/http-testing.umd.js',
      // '@angular/platform-browser/testing':
      //   'node_modules/@angular/platform-browser/bundles/platform-browser-testing.umd.js',
      // '@angular/platform-browser-dynamic/testing':
      //   'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.js',
      // '@angular/router/testing': 'node_modules/@angular/router/bundles/router-testing.umd.js',

      'node_modules/*': 'node_modules/*',
      '*': 'node_modules/*',
      'rxjs/operators/*' : 'node_modules/rxjs/operators/*.js',
      "jspdf": "node_modules/jspdf/dist/jspdf.min.js",
      'rxjs/add/operator/*' : 'node_modules/rxjs/add/operator/*.js',
      'rxjs/*' : 'node_modules/rxjs/*.js'
    },
    packages: {
      // 'rxjs': {
      //   main: 'Rx.js',
      //   defaultExtension: 'js'
      // }
    }
  }

  /**
   * The Autoprefixer configuration for the application.
   * @type {Array}
   */
  BROWSER_LIST = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];

  /**
   * White list for CSS color guard
   * @type {[string, string][]}
   */
  COLOR_GUARD_WHITE_LIST: [string, string][] = [
  ];

  /**
   * Configurations for NPM module configurations. Add to or override in project.config.ts.
   * If you like, use the mergeObject() method to assist with this.
   */
  PLUGIN_CONFIGS: any = {
    /**
     * The BrowserSync configuration of the application.
     * The default open behavior is to open the browser. To prevent the browser from opening use the `--b`  flag when
     * running `npm start` (tested with serve.dev).
     * Example: `npm start -- --b`
     * @type {any}
     */
    'browser-sync': {
      middleware: [require('connect-history-api-fallback')({
        index: `${this.APP_BASE}index.html`
      })],
      port: this.PORT,
      startPath: this.APP_BASE,
      open: argv['b'] ? false : true,
      injectChanges: false,
      server: {
        baseDir: `${this.DIST_DIR}/empty/`,
        routes: {
          [`${this.APP_BASE}${this.APP_SRC}`]: this.APP_SRC,
          [`${this.APP_BASE}${this.APP_DEST}`]: this.APP_DEST,
          [`${this.APP_BASE}node_modules`]: 'node_modules',
          [`${this.APP_BASE.replace(/\/$/, '')}`]: this.APP_DEST
        }
      }
    },

    // Note: you can customize the location of the file
    'environment-config': join(this.PROJECT_ROOT, this.TOOLS_DIR, 'env'),

    /**
     * The options to pass to gulp-sass (and then to node-sass).
     * Reference: https://github.com/sass/node-sass#options
     * @type {object}
     */
    'gulp-sass': {
      includePaths: ['./node_modules/']
    },

    /**
     * The options to pass to gulp-concat-css
     * Reference: https://github.com/mariocasciaro/gulp-concat-css
     * @type {object}
     */
    'gulp-concat-css': {
      targetFile: this.CSS_PROD_BUNDLE,
      options: {
        rebaseUrls: false
      }
    }
  };

  /**
   * Recursively merge source onto target.
   * @param {any} target The target object (to receive values from source)
   * @param {any} source The source object (to be merged onto target)
   */
  mergeObject(target: any, source: any) {
    const deepExtend = require('deep-extend');
    deepExtend(target, source);
  }

  /**
   * Locate a plugin configuration object by plugin key.
   * @param {any} pluginKey The object key to look up in PLUGIN_CONFIGS.
   */
  getPluginConfig(pluginKey: string): any {
    if (this.PLUGIN_CONFIGS[pluginKey]) {
      return this.PLUGIN_CONFIGS[pluginKey];
    }
    return null;
  }

  getInjectableStyleExtension() {
    return this.BUILD_TYPE === (BUILD_TYPES.PRODUCTION || BUILD_TYPES.STAGING) && this.ENABLE_SCSS ? 'scss' : 'css';
  }

  addPackageBundles(pack: ExtendPackages) {

    if (pack.path) {
      this.SYSTEM_CONFIG_DEV.paths[pack.name] = pack.path;
    }

    if (pack.packageMeta) {
      this.SYSTEM_BUILDER_CONFIG.packages[pack.name] = pack.packageMeta;
    }
  }

}

/**
 * Used only when developing multiple applications with shared codebase.
 * We need to specify the paths for each individual application otherwise
 * SystemJS Builder cannot bundle the target app on Windows.
 */
function prepareBuilderConfig(config: any, srcPath: string, tmpPath: string) {
  readdirSync(srcPath).filter(f =>
    lstatSync(join(srcPath, f)).isDirectory()).forEach(f =>
    config.paths[join(tmpPath, f, '*')] = `${tmpPath}/${f}/*`);
  return config;
}

/**


/**
 * Normalizes the given `deps` to skip globs.
 * @param {InjectableDependency[]} deps - The dependencies to be normalized.
 */
export function normalizeDependencies(deps: InjectableDependency[]) {
  deps
    .filter((d: InjectableDependency) => !/\*/.test(d.src)) // Skip globs
    .forEach((d: InjectableDependency) => d.src = require.resolve(d.src));
  return deps;
}

/**
 * Returns if the given dependency is used in the given environment.
 * @param  {string}               env - The environment to be filtered for.
 * @param  {InjectableDependency} d   - The dependency to check.
 * @return {boolean}                    `true` if the dependency is used in this environment, `false` otherwise.
 */
function filterDependency(type: string, d: InjectableDependency): boolean {
  const t = d.buildType || d.env;
  d.buildType = t;
  if (!t) {
    d.buildType = Object.keys(BUILD_TYPES).map(k => BUILD_TYPES[k]);
  }
  if (!(d.buildType instanceof Array)) {
    (<any>d).env = [d.buildType];
  }
  return d.buildType.indexOf(type) >= 0;
}

/**
 * Returns the applications version as defined in the `package.json`.
 * @return {number} The applications version.
 */
function appVersion(): number | string {
  var pkg = require('../../package.json');
  return pkg.version;
}

/**
 * Returns the application build type.
 */
function getBuildType() {
  let type = (argv['build-type'] || argv['env'] || '').toLowerCase();
  let base: string[] = argv['_'];
  let prodKeyword = !!base.filter(o => o.indexOf(BUILD_TYPES.PRODUCTION) >= 0).pop();
  if ((base && prodKeyword) || type === BUILD_TYPES.PRODUCTION) {
    return BUILD_TYPES.PRODUCTION;
  } else {
    return BUILD_TYPES.DEVELOPMENT;
  }
}

function getConfigEnvironment() {

  let base: string[] = argv['_'];

  let prodKeyword = !!base.filter(o => o.indexOf(BUILD_TYPES.PRODUCTION) >= 0).pop();
  let stagingKeyword = !!base.filter(o => o.indexOf(BUILD_TYPES.STAGING) >= 0).pop();
  let env = (argv['env'] || '').toLowerCase();

  if ((base && prodKeyword) || env === BUILD_TYPES.PRODUCTION) {
    return BUILD_TYPES.PRODUCTION;
  }
  else if ((base && stagingKeyword) || env === BUILD_TYPES.STAGING) {
    return BUILD_TYPES.STAGING;
  } else {
    return BUILD_TYPES.DEVELOPMENT;
  }

}

