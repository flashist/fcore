var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("./tsconfig.json");

gulp.task(
    "compile",
    function (cb) {
        console.log("START! compile.js");

        tsProject.src()
        .pipe(ts(tsProject))
        .js.pipe(gulp.dest("dist"))
        .on(
            "finish",
            function() {
                console.log("FINISH! compile.js");
                cb();
            }
        );
    }
);