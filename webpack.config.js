const path = require("path")
const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
    mode: "production",
    entry: {
        main: "./src/index.js"
    },
    devtool: "none",
    devServer: {
       contentBase: '.',
       hot: true
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist")
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
          }
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