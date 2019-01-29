

const gulp = require("gulp");
const uglifycss = require("gulp-uglifycss");
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();
const eslint = require("gulp-eslint");
const terser = require("gulp-terser");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const prettyError = require("gulp-prettyerror");

gulp.task("scripts", function() {
  return gulp
    .src("./js/*.js")
    .pipe(terser())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(gulp.dest("./build/js"));
});

//task to compile and minify sass
gulp.task("sass", function() {
  return gulp
    .src("./sass/*.scss") // What files do we want gulp to consume?
    .pipe(prettyError())
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"]
      })
    )
    .pipe(gulp.dest("./build/css"))
    .pipe(uglifycss()) // Call the terser function on these files
    .pipe(rename({ extname: ".min.css" })) // Rename the uglified file
    .pipe(gulp.dest("./build/css")); // Where do we put the result?
});
//Task to watch for changes to CSS files

gulp.task("watch", function(done) {
  gulp.watch("sass/*.scss", gulp.series("sass"));
  gulp.watch("js/*.js", gulp.series("lint", "scripts"));
  done();
});

//Load browsersync

gulp.task("browser-sync", function(done) {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  //default task
  gulp.watch("build/css/*.css").on("change", browserSync.reload);

  done();
});

gulp.task("lint", function() {
  return (
    gulp
      .src(["js/*.js"])
      // eslint() attaches the lint output to the "eslint" property
      // of the file object so it can be used by other modules.
      .pipe(eslint())
      // eslint.format() outputs the lint results to the console.
      // Alternatively use eslint.formatEach() (see Docs).
      .pipe(eslint.format())
      // To have the process exit with an error code (1) on
      // lint error, return the stream and pipe to failAfterError last.
      .pipe(eslint.failAfterError())
  );
});

// Default task
gulp.task("default", gulp.parallel("browser-sync", "watch"));


