const path = require('path')
const fs = require('fs');
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


let htmlPageNames = [];
const pages = fs.readdirSync('./src/template/')
pages.forEach(page => {
    if (page.endsWith('.html')) {
        htmlPageNames.push(page.split('.html')[0])
    }
})


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
                // browse to http://localhost:3000/ during development
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

        new MiniCssExtractPlugin({
            filename: "[name].css",

        }),

        new CleanWebpackPlugin(),


    ].concat(multipleHtmlPlugins),

    module: {
        rules: [{
            test: /\.scss$/, // or /\.css$/i if you aren't using sass
            use: [{
                loader: 'style-loader',
                options: {
                    insert: 'head', // insert style tag inside of <head>
                    injectType: 'singletonStyleTag',
                    attributes: { id: "id" },

                },

            },
                "css-loader",
                "sass-loader"
            ],

        },

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

