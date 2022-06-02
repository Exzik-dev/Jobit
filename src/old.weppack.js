
const HTMLWebpackPlugin = require("html-webpack-plugin");
const fs = require('fs');
const path = require("path");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");


let htmlPageNames =[]
let multipleHtmlPlugins = htmlPageNames.map(name => {
    return new HTMLWebpackPlugin({
        template: `./src/template/${name}.html`, // relative path to the HTML files
        filename: `${name}.html`, // output HTML files
        excludeChunks: ['index'],
        chunks: [`main`] // respective JS files
    })
})

module.exports={
    mode:'development',
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [


        new BrowserSyncPlugin(

            {
                host: 'localhost',
                port: 3000,

                proxy: 'http://localhost:4200/'
            },

            {

                reload: true
            }
        ),
        new HTMLWebpackPlugin({

            template: "./src/index.html",

        }),

        new MiniCssExtractPlugin(),




        new CleanWebpackPlugin(),


    ].concat(multipleHtmlPlugins),
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader",
                "sass-loader"
            ]},

            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                },
            },

        ],

    },
    devServer: {

        port:4200,

    },

}


