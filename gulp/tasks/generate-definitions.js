var gulp = require('gulp'),
    ts = require('gulp-typescript'),
    fs = require('fs'),
    argv = require('yargs').argv,
    map = require('map-stream'),
    file = require('gulp-file'),
    path = require('path');

gulp.task(
    'generate-definitions',
    function(cb) {

        var basePath = "./src/";
        console.log("argv.src: " + argv.src);
        argv.src = argv.src ? argv.src : basePath;
        // Adding a closing slash to make correct folder path (if needed)
        argv.src += argv.src.charAt(argv.src.length - 1) == "/" ? "" : "/";

        console.log("argv.out: " + argv.out);
        argv.out = argv.out ? argv.out : "index.d.ts";

        var resultDeclarationText = "";
        var processFile = function(file, cb) {
            console.log(file.path)
            resultDeclarationText += "export * from '" + "./" + path.relative(basePath, file.path) + "'";
            resultDeclarationText += "\n";

            cb(null, file);
        };


        var tempSettings = [argv.src + "**/*.ts", "!./**/*.d.ts"];
        gulp.src(tempSettings)
            .pipe(map(processFile))
            .on(
                "end",
                function () {
                    file(argv.out, resultDeclarationText)
                        .pipe(gulp.dest(basePath));
                }
            );

        cb();
    }
);