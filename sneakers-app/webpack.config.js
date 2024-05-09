const path = require('path');
const EslintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');

const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;

module.exports = {
  mode,
  target,
  devtool,
  devServer: {
    port: 8080,
    open: true,
    hot: true,
  },
  entry: path.resolve(__dirname, 'src', 'index.ts'),
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/[name][ext]',
    clean: true,
  },
  plugins: [
    new EslintPlugin({ extensions: 'ts' }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/data/data.json', to: 'data/data.json' },
        { from: 'src/data/images', to: 'data/images' },
        { from: 'src/img/catalog/show.svg', to: 'assets' },
        { from: 'src/img/catalog/card.svg', to: 'assets' },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.s?css$/i,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [postcssPresetEnv()],
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(jpe?g|png|webp|gif|svg)$/i,
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                // eslint-disable-next-line no-magic-numbers
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75,
              },
            },
          },
        ],
        type: 'asset/resource',
      },
      {
        test: /\.(?:js|mjs|cjs)$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'defaults' }]],
          },
        },
      },
    ],
  },
};
