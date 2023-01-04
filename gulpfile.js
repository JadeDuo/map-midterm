const gulp = require('gulp');
const concat = require('gulp-concat');
const each = require('gulp-each');

const path = require('path');

//creates html views that get loaded into sidebar based on path.
gulp.task("build-views", (done) => {
  return gulp.src([
    "app/views/*"
  ])
  .pipe(each(function(content, file, callback) {
    const name = path.basename(file.path).replace(".html", "");
    const result = `app.views['${name}'] = \`${content}\``;
    callback(null, result)
  }))
  .pipe(concat("views.js"))
  .pipe(gulp.dest("public/build"))
})

gulp.task("build-controllers", (done) => {
  return gulp.src([
    "app/controllers/*"
  ])
  .pipe(each(function(content, file, callback) {
    const name = path.basename(file.path).replace(".js", "");
    const result = `app.controllers['${name}'] = () => {\n${content}\n}`
    callback(null, result)
  }))
  .pipe(concat("controllers.js"))
  .pipe(gulp.dest("public/build"))
})

gulp.task("build-concat", (done) => {
  return gulp.src([
    "public/scripts/main.js",
    "public/build/views.js",
    "public/build/controllers.js",
  ])
  .pipe(concat("main.js"))
  .pipe(gulp.dest("public/build"));
})

gulp.task('build', gulp.series('build-views', 'build-controllers', 'build-concat'))
