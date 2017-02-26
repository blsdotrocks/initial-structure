'use strict'

import gulp from 'gulp';
import sass from 'gulp-ruby-sass';
import uglify from 'gulp-uglify';
import imagemin from 'gulp-imagemin';
import concat from 'gulp-concat';
import plumber from 'gulp-plumber';
import browserSync from 'browser-sync';

gulp.task('server', ['sass'], () => {
	browserSync.create();
	browserSync.init({
		server: './'
	});
});

gulp.task('sass', () =>
	sass('src/sass/*.sass')
		.on('error', sass.logError)
		.pipe(gulp.dest('assets/stylesheet/'))
);

gulp.task('js', () =>
	gulp.src('src/javascript/*.js')
		.pipe(plumber())
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest('assets/javascript/'))
);

gulp.task('imagemin', () => 
	gulp.src('src/images/*')
		.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
		.pipe(gulp.dest('assets/images/'))
);

gulp.task('watch', () => {
	gulp.watch('src/sass/*.sass', ['sass']);
	gulp.watch('./assets/stylesheet/*.css').on('change', browserSync.reload);
	gulp.watch('./src/javascript/*.js', ['js']);
	gulp.watch('./assets/javascript/*.js').on('change', browserSync.reload);
	gulp.watch('./src/images/*.{jpg,png,gif}', ['imagemin'])
	gulp.watch('./*.html').on('change', browserSync.reload);
})

gulp.task('default', ['js', 'sass', 'imagemin', 'server', 'watch']);