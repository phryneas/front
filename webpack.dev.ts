import webpack from 'webpack'
import common from './webpack.common'
import path from 'path'
import fs from 'fs'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import merge from 'webpack-merge'

const config: webpack.Configuration = merge(common, {
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html',
      // template: path.resolve(__dirname, 'src', 'template.html'),
      favicon: './src/ui/assets/favicon.ico',
      filename: './index.html',
    }),
  ],
  devtool: 'source-map',
  devServer: {
    // https://webpack.js.org/configuration/dev-server/
    port: 3000, // Can omit this, so port will be picked up randomly from available ports.
    // open: true, // Open in default browser tab automatically
    historyApiFallback: true, // Serves index file for any path
    hot: true,
    compress: true,
    // https://webpack.js.org/configuration/dev-server/#devserverhttp2
    http2: true,
    // https: true,
    https: {
      key: fs.readFileSync('/home/dzintars/.tls/oswee.com/privkey1.pem'),
      cert: fs.readFileSync('/home/dzintars/.tls/oswee.com/fullchain1.pem'),
      ca: fs.readFileSync('/home/dzintars/.tls/oswee.com/fullchain1.pem'),
    },
    disableHostCheck: true, // To run behind HAProxy (insecure) https://stackoverflow.com/a/43647767/6651080
  },
  module: {
    rules: [
      {
        test: /\.css|\.s(c|a)ss$/,
        use: [
          // Order of the loaders are important!
          { loader: 'style-loader' }, // 3. Inject styles into DOM
          { loader: 'css-loader', options: { modules: true } }, // 2. Turns CSS into commonjs
          { loader: 'sass-loader' }, // 1. Turns SCSS into CSS
        ],
        // include: /src/,
        // use: [
        //   { loader: 'style-loader' }, // 3. Inject styles into DOM
        //   { loader: 'lit-scss-loader', options: { minify: false /* defaults to false */ } },
        //   { loader: 'css-modules-typescript-loader' }, // to generate a .d.ts module next to the .scss file
        //   { loader: 'extract-loader' },
        //   { loader: 'css-loader', options: { modules: false } }, // 2. to convert the resulting CSS to Javascript to be bundled (modules:true to rename CSS classes in output to cryptic identifiers, except if wrapped in a :global(...) pseudo class)
        //   { loader: 'sass-loader', options: { sourceMap: true } }, // 1. Turns SCSS into CSS
        // ],
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: '/img',
            name: '[name].[hash].[ext]',
          },
        },
      },
    ],
  },
})

export default config
