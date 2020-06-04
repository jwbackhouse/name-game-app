const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Check environment variable
process.env.NODE_ENV = process.env.NODE_ENV || 'development';    // Heroku sets this to production, or we set to 'test' when running yarn test, otherwise default to 'development'

if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({path: '.env.test'});    // dotenv extract individual variables from the config file, so we don't have to manually define them here
} else if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({path: '.env.development'});
}

module.exports = (env) => {
  const isProduction = env === 'production';    // env variable set to 'production' when script is run (see package.json)
  const CSSExtract = new MiniCssExtractPlugin({ filename: 'styles.css' });    // default filename is main.css
  
  return {
    entry: './src/app.js',
    output: {
      path: path.join(__dirname,'public','dist'),
      filename: 'bundle.js'
    },
    module: {
      rules: [{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }, {
        test:/\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true   // needed for inline-source-map (see below)
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }]
    },
    plugins: [
      CSSExtract,
      new webpack.DefinePlugin({
        'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
        'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
        'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
        'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
        'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
        'process.env.FIREBASE_APP_ID': JSON.stringify(process.env.FIREBASE_APP_ID),
        'process.env.FIREBASE_MEASUREMENT_ID': JSON.stringify(process.env.FIREBASE_MEASUREMENT_ID)
      })
    ],
    devtool: isProduction ? 'source-map' : 'inline-source-map',    // use production-suitable version if running for production (see webpack docs)
    devServer: {
      contentBase: path.join(__dirname,'public'),
      host: '100.115.92.14',
      historyApiFallback:true,
      publicPath: '/dist/'    // directory containing bundled assets
    }
  };
};