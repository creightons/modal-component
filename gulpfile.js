var gulp = require('gulp'),
	gutil = require('gulp-util'),
	gulpif = require('gulp-if'),
	sourcemaps = require('gulp-sourcemaps'),
	argv = require('yargs').argv,
	browserify = require('browserify'),
	babelify = require('babelify'),
	watchify = require('watchify'),
	uglify = require('gulp-uglify'),
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer'),
	plumber = require('gulp-plumber'),
	sass = require('gulp-sass'),
	csso = require('gulp-csso'),
	autoprefixer = require('gulp-autoprefixer');


gulp.task('sass', function() {
	return gulp.src('styles.scss')
		.pipe(plumber())
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(gulpif(argv.production, csso()))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('public/'));
});

gulp.task('buildjs', function() {
	return browserify({
		entries: 'main.js',
		debug: true
	})
		.transform('babelify', {
			presets: [
				'es2015',
			]
		})
		.bundle()
		.pipe(source('build.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(gulpif(argv.production, uglify()))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('public'));
});

gulp.task('watchjs', function() {
	var bundler = watchify(
		browserify(
			{
				entries: 'main.js',
				debug: true,
			},
			watchify.args
		)
	);
	
	bundler.transform('babelify', {
		presets: ['es2015']
	});
	bundler.on('update', rebundle);
	
	function rebundle() {
		var start = Date.now();
		return bundler.bundle()
			.on('error', function(err) {
				gutil.log(
					gutil.colors.red(err.toString())
				);
			})
			.on('end', function() {
				gutil.log(
					gutil.colors.green(
						'Finished rebundling in ', (Date.now() - start) + 'ms'
					)
				);
			})
			.pipe(source('build.js'))
			.pipe(buffer())
			.pipe(sourcemaps.init({ loadMaps: true }))
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest('public'));
	}
	
	return rebundle();
});

gulp.task('watchsass', function() {
	gulp.watch('frontend/scss/*.scss', ['sass']);
});

gulp.task('build', ['sass', 'buildjs']);

gulp.task('watch', ['build', 'watchsass', 'watchjs']);

gulp.task('default', ['watch']);
			
