const path = require("path")
const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

let isDevelopment = true;

module.exports = {
    mode: "development",
    entry: {
        main: "./src/index.ts"
    },

    devtool: "none",
    devServer: {
       contentBase: '.',
       hot: true
    },

    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },

    resolve: {
      extensions: [".scss", ".css",".tsx", ".ts", ".js"]
    },

    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },

    watch: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },

    module: {
        rules: [          
          {
            test: /\.scss$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader'
                },
                'sass-loader?sourceMap'
            ]
        },
          {
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
          },
          {
            test: /\.html$/,
            use: [{ loader: "html-loader", options: { minimize: true } }]
          }
        ]
      },

      plugins: [
        new HtmlWebPackPlugin({
          template: "src/index.html",
          filename: "./index.html"
        }),
        new MiniCssExtractPlugin({
          filename: isDevelopment ? '[name].css' : '[name].[hash].css',
          chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
        })
      ]
}