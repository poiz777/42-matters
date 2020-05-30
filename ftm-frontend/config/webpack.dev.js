/* eslint-disable */
const path        = require("path");
const webpack     = require("webpack");
const HtmlWpkPlg  = require("html-webpack-plugin");

module.exports    =  {
  entry: {
    main: ["./src/main.js"]
  },
  mode: "development",
  output: {
    filename: "[name]-bundle.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/"
  },
  devServer: {
    color: true,
    hot: true,
    contentBase: "dist",
    overlay: {
      warnings: true,
      errors: true
    },
    // clientLogLevel: 'debug',
  },
  devtool: "source-map",
  module: {
    rules: [
      // JS
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        include: path.join(__dirname, 'src/'),
        use: [
          { loader: "babel-loader", options: {  presets: ['@babel/preset-env'] } },
        ],
      },
  
      // PUG
      {
        test: /\.pug$/,
        exclude: ["/node_modules/"],
        loaders: [{
          loader: 'apply-loader'
        }, {
          loader: 'pug-loader',
          options: { pretty: true }
        }]
      },
      
      // STYLUS
      {
        test: /\.styl$/,
        use: [
          { loader: 'style-loader'},
          { loader: 'css-loader'},
          { loader: 'stylus-loader', options: {} },
        ],
      },
      
      // CSS
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
        ],
      },
      
      // HTML
      {
        test: /\.html?$/,
        use: [
          { loader: "html-loader" },
        ]
      },
  
      // FONTS
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+|\?.*)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+|\?.*)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+|\?.*)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+|\?.*)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+|\?.*)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWpkPlg({
      inject: true,
      template: "./src/index.html"
    })
  ]
};
