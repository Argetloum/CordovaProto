var gulp = require('gulp'),
    spawn = require('child_process').spawn,
    del = require('del'),
    plugins = require('gulp-load-plugins')();

var bower = 'app/libs/bower';
var vendors = 'app/libs/vendors';
var build = 'www';
var tmp = 'build-tmp';

var paths = {
    indexFile: 'app/index.html',
    langs: {
        script: 'lang.py',
        csv: 'lang.csv',
        js: 'app/modules/common/js/'
    },
    scss: [
        'app/modules/**/*.scss'
    ],
    css: [
        tmp + '/style.css'
    ],
    copyCss: [
          bower + '/ionic/css/ionic.min.css'
    ],
    fonts: [
        bower + '/lumx/dist/fonts/**'
    ],
    html: [
        'app/modules/**/*.html'
    ],
    scripts: [
        'app/app.js',
        'app/modules/**/*.js'
    ],
    copyScripts: [
        bower + '/ionic/js/ionic.bundle.js'
    ],
    libsScripts: [
        bower + '/jquery/dist/jquery.js',
        bower + '/underscore/underscore.js',
        //bower + '/angular/angular.js', // Ionic already include angular
        bower + '/angular-resource/angular-resource.js',
        bower + '/angular-route/angular-route.js',
        //bower + '/angular-sanitize/angular-sanitize.js', // Ionic already include angular sanitize
        //bower + '/angular-ui-router/release/angular-ui-router.js', // Ionic already include angular ui router
        vendors + '/angular-translate.min.js',
        vendors + '/translation_service.js',
        bower + '/lumx/dist/js/lumx.js',
        bower + '/velocity/velocity.js'
    ],
    images: 'app/img/**/*'
};

//
// CLEANERS
//
gulp.task('clean:build', function(cb)
{
    del([
        build + '/css/**',
        build + '/js/**',
        build + '/templates/**',
        build + '/fonts/**',
        build + '/index.html'
    ], cb);
});

gulp.task('clean:tmp', function(cb)
{
    del([tmp + '/**'], cb);
});

//
// JS
//
gulp.task('lint', function()
{
    return gulp.src(paths.scripts)
        .pipe(plugins.plumber())
        .pipe(plugins.cached('lint'))
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-summary'))
        .pipe(plugins.jshint.reporter('fail'))
        .pipe(plugins.remember('lint'))
        .pipe(gulp.dest(build + "/js"));
});

gulp.task('scripts:libs', function()
{
    return gulp.src(paths.libsScripts)
        .pipe(plugins.plumber())
        .pipe(plugins.concat('libs.min.js'))
        //.pipe(plugins.uglify())
        .pipe(gulp.dest(build + "/js"));
});

gulp.task('scripts:app', function()
{
    return gulp.src(paths.indexFile)
        .pipe(plugins.plumber())
        .pipe(plugins.inject(
            gulp.src(paths.scripts).pipe(plugins.angularFilesort(
                { order: { pre: ['./app/modules/common/app.js'] }}
            )),
            { relative: false, ignorePath: ['/app/modules', '/app'], addRootSlash: false, addPrefix: 'js' }
        ))
        .pipe(gulp.dest(build));
});

gulp.task('scripts:dist', ['lang', 'scripts:libs'], function()
{
    return gulp.src(paths.indexFile)
        .pipe(plugins.plumber())
        .pipe(plugins.inject(
            gulp.src(paths.scripts)
                .pipe(plugins.angularFilesort())
                .pipe(plugins.concat('app.min.js'))
                .pipe(plugins.uglify())
                .pipe(gulp.dest(build + "/js")),
            { relative: false, ignorePath: ['/www/'], addRootSlash: true }
        ))
        .pipe(gulp.dest(build));
});

gulp.task('scripts:copy', function() {
    gulp.src(paths.copyScripts)
    .pipe(gulp.dest(build + '/js'));
});

//
// CSS
//
gulp.task('scss', ['clean:tmp'], function()
{
    return gulp.src(paths.scss)
        .pipe(plugins.plumber())
        .pipe(plugins.concat('style.scss'))
        .pipe(plugins.rubySass({ loadPath: './app/' }))
        .pipe(gulp.dest(tmp));
});

gulp.task('css', ['scss'], function()
{
    return gulp.src(paths.css)
        .pipe(plugins.plumber())
        .pipe(plugins.concat('style.min.css'))
        .pipe(plugins.minifyCss({ keepSpecialComments: 0 }))
        .pipe(gulp.dest(build + '/css'));
});

gulp.task('css:copy', function() {
    gulp.src(paths.copyCss)
    .pipe(gulp.dest(build + '/css'));
});

gulp.task('fonts', function()
{
    return gulp.src(paths.fonts)
        .pipe(gulp.dest(build + '/fonts'));
});

//
// HTML
//
gulp.task('html', function()
{
    return gulp.src(paths.html)
        .pipe(gulp.dest(build + '/templates'));
});

//
// MISC
//
gulp.task('lang', function()
{
    return gulp.src(paths.langs.csv)
        .pipe(plugins.plumber())
        .pipe(plugins.shell([
            'python ' + paths.langs.script + ' ' + paths.langs.csv,
            'mv lang.js ' + paths.langs.js
        ]));
});

//
// IMAGES
//
gulp.task('images:copy', function() {
    gulp.src(paths.images)
    .pipe(gulp.dest(build + '/img'));
});

//
// WATCH
//
function watcherWithCache(name, src, tasks)
{
    var watcher = gulp.watch(src, tasks);
    watcher.on('change', function (event)
    {
        if (event.type === 'deleted')
        {
            delete cached.caches.scripts[event.path];
            remember.forget(name, event.path);
        }
    });
}

gulp.task('watch', ['build'], function()
{
    watcherWithCache('lang', paths.langs.csv, ['lang']);
    watcherWithCache('lint&app', paths.scripts, ['lint', 'scripts:app']);
    watcherWithCache('css', paths.scss.concat(paths.css).concat('!' + tmp + '/style.css'), ['css']);
    watcherWithCache('fonts', paths.fonts, ['fonts']);
    watcherWithCache('html', paths.html, ['html']);
    watcherWithCache('front', paths.indexFile, ['scripts:app']);
    watcherWithCache('libs', paths.libsScripts, ['scripts:libs', 'scripts:copy']);
});

//
// GULP MANAGEMENT
//
gulp.task('auto-reload', function()
{
    var p;

    gulp.watch('gulpfile.js', spawnChildren);
    spawnChildren();

    function spawnChildren(e)
    {
        // kill previous spawned process
        if(p)
        {
            p.kill();
        }

        p = spawn('gulp', ['watch'], {stdio: 'inherit'});
    }
});

gulp.task('dist', ['clean:build', 'clean:tmp'], function()
{
    // Bad practices, but best way to force clean before executing all the tasks
    gulp.start('css');
    gulp.start('css:copy');
    gulp.start('scripts:copy');
    gulp.start('scripts:dist');
    gulp.start('html');
    gulp.start('fonts');
});
gulp.task('build', ['css', 'css:copy', 'lint', 'scripts:libs', 'scripts:app', 'scripts:copy', 'images:copy', 'lang', 'html', 'fonts']);
gulp.task('default', ['auto-reload']);