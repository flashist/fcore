module.exports = function () {
    var config = {
        ts_source: [
            './src/**/*.ts',
            './typings/**/*.ts'
        ],
        ts_config: {
            "target": "es5",
            "module": "system",
            "moduleResolution": "node",
            "sourceMap": true,
            "emitDecoratorMetadata": true,
            "experimentalDecorators": true,
            "removeComments": false,
            "noImplicitAny": false,
            "declaration": true
        }
    };

    return config;
};
