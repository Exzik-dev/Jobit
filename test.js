let styleShit = htmlPageNames.map(name=>{
    return  {
        test: /${name}\.scss$/, // or /\.css$/i if you aren't using sass
        use: [
            {
                loader: 'style-loader',
                options: {
                    insert: 'head', // insert style tag inside of <head>
                    injectType: 'singletonStyleTag',

                },

            },
            "css-loader",
            "sass-loader"
        ],

    }

})




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