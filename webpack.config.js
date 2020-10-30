const path = require("path");
module.exports = {
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
