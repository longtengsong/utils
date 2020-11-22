const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  module: {
    rules: [
      // Vue loader
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: "vue-loader",
      },
      // Babel loader, will use your project’s .babelrc
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      // Other loaders that are needed for your components
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: [
          "style-loader", "css-loader",
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true,
              // noIeCompat: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // add vue-loader plugin
    new VueLoaderPlugin(),
  ],
};
