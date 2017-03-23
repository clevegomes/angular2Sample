### Below is the check list to upgrade the project


* Clone the new project from advanced seed
* Copy the readme,.gitignore
* Remove .git
* Copy my .git
* Upgrade the package.json (make sure all dependencies are added correctly)
* Fix gulp file
* Copy seeds (task/seeds)
* Modify seed.config.interface
* Modify seed.config.ts  ENABLE_SCSS = true;
* Modify seed.config.ts DIST_DIR=PUBLIC, DEV_DEST = ${THIS.DIST_DIR}, PROD_DESC =${THIS.DIST_DIR},

 ADD SASS_OPTIONS, ADD SASS_OPTIONS,
  ADD SASS_OPTIONS -> Interface, injectable Dependency -> sass,js
* Manually copy node files that are not yet in npm (This is temp must find a way to get from npm or bower)
* Note: (If you get error saying error saying "Error in plugin run_sequence(build.scss)". Make sure the sass is added to the package,json
)
* npm any other dependencies that are not in package.json like chartsjs,ngcookies,jquery etc
* Modify i18n.framework . Note dont replce the full dir . Open the files and make the changes
* Copy the i18n translation files in the /client/assets/i18n
* Files to copy
````
 src/client/app/components
 src/client/css
 src/client/fonts
 src/client/images
 src/client/assets/sass
 src/client/assets/fonts (this is need to be kept in one place .Need to chnge this)

 Since we are using one directory for dev and production we need to modify something in
 build.index.prod.ts
 In function function transformPath()

 make index 3 to 2 arguments[0] = APP_BASE + path.slice(2, path.length).join(sep) + `?${Date.now()}`;
line 65

Add SASS injection to build.index.prod

/**
 * Injects the bundled CSS files for the production environment.
 */
function injectCss() {
  return inject(join(CSS_DEST, SCSS_PROD_BUNDLE),join(CSS_DEST, CSS_PROD_BUNDLE));
}


Change all template urls to relative path and add  to the Component decorator
example

@BaseComponent({
    moduleId: module.id});

````


* Note build.html.ts and build.css.ts are removed and  build.html_css_scass.ts is added.
build.html_css_scss.ts is a copy of build.html_css.ts with function processComponentScss modifed.

````
function processComponentScss() {
    

    return gulp.src([
        join(APP_SRC, 'assets', '**', '*.scss')
    ])
        .pipe(isProd ? plugins.cached('process-component-scss') : plugins.util.noop())
        .pipe(isProd ? plugins.progeny() : plugins.util.noop())
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(plugins.postcss(processors))
        .pipe(isProd ? plugins.concat(SCSS_PROD_BUNDLE) : plugins.util.noop())
        .pipe(gulp.dest(CSS_DEST));
    

}

````

