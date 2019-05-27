const path = require("path")
const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

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
      extensions: [".tsx", ".ts", ".js"]
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
            test: /\.html$/,
            use: [{ loader: "html-loader", options: { minimize: true } }]
          },
          {
            test: /\.scss$/,
            use: [
              MiniCssExtractPlugin.loader,
              "css-loader",
              "postcss-loader",
              "sass-loader"
            ]
          },
          {
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
          },
        ]
      },

      plugins: [
        new HtmlWebPackPlugin({
          template: "src/index.html",
          filename: "./index.html"
        }),
        new MiniCssExtractPlugin({
          filename: "[name].css",
          chunkFilename: "[id].css"
        })
      ]
}