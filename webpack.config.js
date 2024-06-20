const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');


module.exports = {
    plugins: [
        new CompressionPlugin(),
        new VueLoaderPlugin()
    ],
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".js", ".ts", ".tsx", ".vue"],
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    },
    entry: {
        map: './frontend/ts/map.ts',
        modals: './frontend/ts/modals.ts',
        form_functions: './frontend/ts/form_functions.ts',
        leaflet_settings: './frontend/ts/leaflet_settings.ts',
        calendar: './frontend/ts/calendar.ts',
        table: './frontend/ts/table.ts',
        views: './frontend/ts/views.ts',
        register_company7: './frontend/ts/register_company.ts',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                exclude: /static/,
                options: {ignoreDiagnostics: [2686]},
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff2|woff|ttf|eot)$/i,
                loader: 'file-loader',
            },
            {
                test: /\.less$/i,
                use: ['style-loader', 'css-loader', 'less-loader'],
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ],
    },
    output: {
        path: path.resolve(__dirname, 'build/js')
    },
    mode: "development",
}
