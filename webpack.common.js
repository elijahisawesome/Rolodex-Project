const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { argv } = require('process');


module.exports = {

  entry: {
    index: './src/index.js',
    
  },/*
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },*/
  
  plugins: [

    new HtmlWebpackPlugin({

      title: 'Elijah\'s Portfolio!',

    }),


  ],
  module: {
    rules: [
        {
        test: /\.(glb|gltf)$/,
        use:
          [{
          loader: 'file-loader',
          options:
            {
                outputPath: 'assets/models/'
            }
            }
          ]
      },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
              options:
              {
                  outputPath: '/'
              }
            },
          ],
        },
      ],
  },
   
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    //publicPath: this.mode === 'production'?'/Rolodex-Project':'/dist'
  }


};