const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['ts-loader'],
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'rungeKutta.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'rungeKutta',
        libraryTarget: 'umd',
    },
}