const path = require('path')
const fs = require('fs');
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')



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



        new CleanWebpackPlugin(),


    ].concat(multipleHtmlPlugins),

    module: {
        rules: [{
            test: /\.scss$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'file-loader',
                    options: { outputPath: 'css/', name: '[name].css'}
                },
                'sass-loader'
            ]
        },

            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
                exclude: /node_modules/,
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

