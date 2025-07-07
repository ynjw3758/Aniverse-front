const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  entry: "./src/index.tsx",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      // TypeScript & JSX 처리
      {
        test: /\.tsx?$/,
        use: ["babel-loader", "ts-loader"],
        exclude: /node_modules/,
      },

      // 이미지 파일 처리
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][hash][ext]',
        },
      },

      // SCSS/CSS 처리
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle.js",
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      "process.env.REACT_APP_ACCESS_KEY": JSON.stringify(process.env.REACT_APP_ACCESS_KEY),
      "process.env.REACT_APP_SECRET_KEY": JSON.stringify(process.env.REACT_APP_SECRET_KEY),
      "process.env.REACT_APP_SERVICE_ID": JSON.stringify(process.env.REACT_APP_SERVICE_ID),
      "process.env.REACT_APP_REDIRECT_URL": JSON.stringify(process.env.REACT_APP_REDIRECT_URL),
      "process.env.REACT_APP_REST_API_KEY": JSON.stringify(process.env.REACT_APP_REST_API_KEY),
      "process.env.REACT_APP_ADMIN_KEY": JSON.stringify(process.env.REACT_APP_ADMIN_KEY),
      "process.env.REACT_APP_CLIENT_ID": JSON.stringify(process.env.REACT_APP_CLIENT_ID),
      "process.env.REACT_APP_CLIENT_SECRET": JSON.stringify(process.env.REACT_APP_CLIENT_SECRET),
      "process.env.REACT_APP_REDIRECT_URL_N": JSON.stringify(process.env.REACT_APP_REDIRECT_URL_N),
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};
