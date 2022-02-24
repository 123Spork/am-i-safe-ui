var path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

var config = {
  entry: ['./src/index.tsx', __dirname + '/src/styles/main.scss'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.min.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          {
            loader: 'file-loader',
            options: { outputPath: '.', name: 'style.min.css' }
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: 'expanded'
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    contentBasePublicPath: '/',
    historyApiFallback: true,
    hot: true
  },
  optimization: {
    minimize: false
  }
}

module.exports = config
