let webpack = require('webpack');

module.exports = {
    entry: './packages/api-service/index.js',
    output: {
        filename: 'modules/api-service.module.js',
        libraryTarget: "umd"
    },
    externals: {
        "angular": "angular"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }

        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ]
};