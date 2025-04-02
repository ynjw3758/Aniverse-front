const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
const  webpack  = require("webpack");
const dotenv = require("dotenv");
const {createProxyMiddleware} = require('http-proxy-middleware');
dotenv.config();



module.exports = {
  entry: "./src/index.tsx",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["babel-loader", "ts-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: "file-loader",
          },

        ],
        test: /\.s?css$/,
        use: [
          /*'style-loader',
          'sass-loader',
          'css-loader',*/
          {
            loader: 'style-loader',
    },
    {
            loader: 'css-loader',
            options: {
                    sourceMap: true,
            }
    }
        ]
      },
    ],
  },
  output: {
    path: path.join(__dirname, '..', "/dist"),
    filename: "bundle.js",
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env':JSON.stringify(process.env),
    })
  ],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
}
  

};