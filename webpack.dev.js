const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");


module.exports = merge(common, {
  mode: "development",
  devtool: "eval",
  devServer: {
    historyApiFallback: true,
    port: 3000,
    hot: true,
    historyApiFallback: true,
    client: {
      overlay: true,
      // 웹소켓용 url 지정
      webSocketURL: "ws://127.0.0.1:8083/user",
    },
  },
});