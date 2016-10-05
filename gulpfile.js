// generated on 2016-09-18 using generator-webapp 2.1.0
const gulp = require('gulp');
var nodemon = require('gulp-nodemon');
const gulpLoadPlugins = require('gulp-load-plugins');
const ts = require('gulp-typescript');
const browserSync = require('browser-sync');
const del = require('del');
var inject = require('gulp-inject');
const wiredep = require('wiredep').stream;

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('styles', () => {
  return gulp.src('src/client/styles/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(reload({stream: true}));
});

gulp.task('index', ['scripts'], function () {
  return gulp.src('src/client/index.html')
    .pipe(
      inject(
        gulp.src('src/client/scripts/**/*.ts').pipe(ts({declaration: true, sortOutput: true})),
        {relative: true }
      )
    )
    .pipe(gulp.dest('.tmp/'));
});

gulp.task('scripts', () => {
  return gulp.src('src/client/scripts/**/*.ts')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe(ts({declaration: true}))
    .pipe($.babel())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe(reload({stream: true}));
});

function lint(files, options) {
  return gulp.src(files)
    .pipe(reload({stream: true, once: true}))
    .pipe($.eslint(options))
    .pipe($.eslint.format())
    .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
}

gulp.task('lint', () => {
  return lint('src/client/scripts/**/*.js', {
    fix: true
  })
  .pipe(gulp.dest('src/client/scripts'));
});

gulp.task('lint:test', () => {
  return lint('src/test/spec/**/*.js', {
    fix: true,
    env: {
      mocha: true
    }
  })
    .pipe(gulp.dest('src/test/spec/**/*.js'));
});

gulp.task('html', ['styles', 'index'], () => {
  return gulp.src('.tmp/*.html')
    .pipe($.useref({searchPath: ['.tmp', 'src/client', '.']}))
    .pipe($.if('*.js', $.uglify({mangle: false})))
    .pipe($.if('*.css', $.cssnano({safe: true, autoprefixer: false})))
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(gulp.dest('dist/client'));
});

gulp.task('node', ()=>{
  return gulp.src(['src/server/*','package.json'])
    .pipe(gulp.dest('dist'));
});

gulp.task('images', () => {
  return gulp.src('src/client/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    })))
    .pipe(gulp.dest('dist/client/images'));
});

gulp.task('fonts', () => {
  return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function (err) {})
    .concat('src/client/fonts/**/*'))
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe(gulp.dest('dist/client/fonts'));
});

gulp.task('extras', () => {
  return gulp.src([
    'src/client/*.*',
    '!src/client/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist/client'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', ['styles', 'scripts', 'index', 'fonts', 'nodemon'], () => {
  browserSync.init(null, {
		proxy: "http://localhost:3000",
        files: ["src/client/**/*.*"],
        port: 7000,
	});

  gulp.watch([
    'src/client/*.html',
    'src/client/images/**/*',
    '.tmp/fonts/**/*',
    '.tmp/**/*'
  ]).on('change', reload);

  gulp.watch('src/client/styles/**/*.scss', ['styles']);
  gulp.watch('src/client/**/*.html', ['index']);
  gulp.watch('src/client/scripts/**/*.ts', ['index']);
  gulp.watch('src/client/fonts/**/*', ['fonts']);
  gulp.watch('bower.json', ['wiredep', 'fonts']);
});

gulp.task('nodemon', function (cb) {
	var started = false;

  process.env.NODE_ENV = 'development';

	return nodemon()
    .on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true;
		}
	});
});

gulp.task('serve:dist', () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});

gulp.task('serve:test', ['scripts'], () => {
  browserSync({
    notify: false,
    port: 9000,
    ui: false,
    server: {
      baseDir: 'test',
      routes: {
        '/scripts': '.tmp/scripts',
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch('src/client/scripts/**/*.js', ['scripts']);
  gulp.watch('test/spec/**/*.js').on('change', reload);
  gulp.watch('test/spec/**/*.js', ['lint:test']);
});

// inject bower components
gulp.task('wiredep', () => {
  gulp.src('src/client/styles/*.scss')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest('src/client/styles'));

  gulp.src('src/client/*.html')
    .pipe(wiredep({
      exclude: ['bootstrap-sass'],
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('build', ['lint', 'html', 'images', 'fonts', 'extras', 'node'], () => {
  return gulp.src('dist/client/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});
