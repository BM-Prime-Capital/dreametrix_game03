const merge = require("webpack-merge");
const path = require("path");
const base = require("./base");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge.merge(base, {
  mode: "production",
  output: {
    filename: "bundle.min.js",  // Nom du fichier généré pour la production
    path: path.resolve(__dirname, "../dist"),  // Dossier de sortie
    publicPath: "/"  // Assurez-vous que Webpack sert les fichiers depuis la racine
  },
  devtool: false,
  performance: {
    maxEntrypointSize: 900000,
    maxAssetSize: 900000
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false
          }
        }
      })
    ]
  }
});
