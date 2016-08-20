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

        var basePath = "./";
        argv.src = argv.src ? argv.src : basePath;
        argv.out = argv.out ? argv.out : "index.d.ts";

        var resultDeclarationText = "";
        var processFile = function(file, cb) {
            resultDeclarationText += "export * from '" + path.relative(basePath, file.path) + "'";
            resultDeclarationText += "\n";

            cb(null, file);
        };


        var tempSettings = [argv.src, "!./**/*.d.ts"];
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