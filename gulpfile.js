var gulp = require("gulp");
var requireDir = require("require-dir");
var shell = require('gulp-shell');

var tasks = requireDir("./gulp/tasks");

gulp.task(
    "build",
    [
        "clean",
        "generate-definitions",
        "copy-to-dist",
        "compile"
    ]
);

// Default
gulp.task("default", ["build"]);