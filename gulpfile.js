const gulp = require('gulp');
const concat = require('gulp-concat');
const each = require('gulp-each');

const path = require('path');


gulp.task("build", (done) => {
  return gulp.src([
    "views/partials/*"
  ])
  .pipe(each(function(content, file, callback) {
    const name = path.basename(file.path).replace(".ejs", "");
    const result = `const ${name}View = \`${content}\``;
    callback(null, result)
  }))
  .pipe(concat("views.js"))
  .pipe(gulp.dest("public/build"))
})
