const path = require("path");
const merge = require("webpack-merge");
const core = require("./webpack.core.config");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(core, {
  mode: "production",
  devtool: "source-map",
  entry: {
    "multi-search-bar": "./index.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    library: "MultiSearchBar",
    libraryTarget: "umd"
  },
  externals: ["prop-types", "react", "react-dom"],
  plugins: [new CleanWebpackPlugin()],
  optimization: {
    minimizer: [
      new TerserJSPlugin({ sourceMap: true }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
});
