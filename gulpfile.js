const gulp = require('gulp')
const concat = require('gulp-concat')
const babel = require('gulp-babel')
const lint = require('gulp-eslint')
const minimist = require('minimist')

const options = minimist(process.argv)

gulp.task('lint', function() {
  return gulp.src('src/**/*.js')
    .pipe(lint())
    .pipe(lint.format())
    .pipe(lint.failOnError())
})

gulp.task('build', ['lint'], function() {
  return gulp.src(['src/main.js', 'src/js/*.js'])
    .pipe(concat('module.js'))
    .pipe(babel())
    .pipe(gulp.dest('dist'))
})

gulp.task('watch', function() {
  return gulp.watch('src/**/*.js', ['build'])
})

options.watch ? gulp.task('default', ['watch']) : gulp.task('default', ['build'])
