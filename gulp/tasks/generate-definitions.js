var gulp = require("gulp"),
    ts = require("gulp-typescript"),
    fs = require("fs"),
    argv = require("yargs").argv,
    map = require("map-stream"),
    file = require("gulp-file"),
    path = require("path"),
    del = require("del");

gulp.task(
    "generate-definitions",
    function(cb) {

        var getSafeDirPath = function(dirPath) {
            dirPath += dirPath.charAt(dirPath.length - 1) == "/" ? "" : "/";
            return dirPath;
        }

        var basePath = "./src/";
        console.log("argv.src: " + argv.src);
        argv.src = argv.src ? argv.src : basePath;
        // Adding a closing slash to make correct folder path (if needed)
        // argv.src += argv.src.charAt(argv.src.length - 1) == "/" ? "" : "/";
        argv.src = getSafeDirPath(argv.src);

        console.log("argv.outFile: " + argv.outFile);
        argv.outFile = argv.outFile ? argv.outFile : "index.d.ts";
        console.log("argv.outDir: " + argv.outDir);
        argv.outDir = argv.outDir ? argv.outDir : "./src/";
        argv.outDir = getSafeDirPath(argv.outDir);

        del([argv.outDir + argv.outFile]).then(
            function (paths) {

                var resultDeclarationText = "";
                var processFile = function(file, cb) {

                    var importPath = path.relative(basePath, file.path);
                    if (importPath.indexOf(".d.ts") != -1) {
                        importPath = importPath.substr(0, importPath.lastIndexOf(".d.ts"));
                    }else if (importPath.indexOf(".ts") != -1) {
                        importPath = importPath.substr(0, importPath.lastIndexOf(".ts"));
                    }
                    console.log(importPath);

                    resultDeclarationText += "export * from '" + "./" + importPath + "'";
                    resultDeclarationText += "\n";

                    cb(null, file);
                };


                var tempSettings = [argv.src + "**/*.ts", "!./**/*.d.ts"];
                gulp.src(tempSettings)
                    .pipe(map(processFile))
                    .on(
                        "end",
                        function () {
                            file(argv.outFile, resultDeclarationText)
                                .pipe(gulp.dest(argv.outDir));
                        }
                    );

                cb();

            }
        );
    }
);