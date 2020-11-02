const path = require("path");
module.exports = {
  mode: "production",
  watch: true,
  devtool: "inline-cheap-source-map",
  watchOptions: {
    ignored: ["node_modules/**"],
  },
  entry: "./src/public/js/main.js",
  output: {
    filename: "app.js",
    path: path.join(__dirname, "./src/public/build"),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
