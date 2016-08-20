var gulp = require("gulp"),
    ts = require("gulp-typescript"),
    config = require("../gulp.config")();

gulp.task(
    "test",
    function (cb) {
        gulp.src(config.ts_source)
            .pipe(ts(config.ts_config))
            .on(
                "error",
                function () {
                    console.log("ERROR! test.js");
                }
            );
        cb();
    }
);