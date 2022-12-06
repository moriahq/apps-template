const path = require('path');
const webpack = require('webpack');
const hasha = require('hasha');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');

const distOutputPath = 'dist';
const appKey = '{{appKey}}';

const getExternalsObjectPath = () => moduleName => ['window modules', moduleName];

const getCommonExternals = () => {
  const getCommonExternalPath = getExternalsObjectPath('common');
  return {
    'react-dom': getCommonExternalPath('reactDOM'),
    react: getCommonExternalPath('react'),
    axios: getCommonExternalPath('axios'),
    antd: getCommonExternalPath('antd'),
    debug: getCommonExternalPath('debug'),
    classnames: getCommonExternalPath('classnames'),
    lodash: getCommonExternalPath('lodash'),
  };
};

// output配置
const outputConfig = isProd =>
  isProd
    ? {
        filename: 'js/[name].[chunkhash].min.js',
        path: path.resolve(__dirname, distOutputPath),
        publicPath: './',
        library: appKey,
        libraryTarget: 'umd',
      }
    : {
        filename: 'main.js',
        path: path.resolve(__dirname, distOutputPath),
        publicPath: '/',
        library: appKey,
        libraryTarget: 'umd',
      };

module.exports = (_client, argv) => {
  const mode = argv.mode;
  const isProd = mode === 'production';

  const getLocalIdent = ({ resourcePath }, localIdentName, localName) => {
    if (localName === appKey) {
      return localName;
    }
    if (/\.global\.(css|less)$/.test(resourcePath) || /node_modules/.test(resourcePath)) {
      // 不做cssModule 处理的
      return localName;
    }
    return `${localName}__${hasha(resourcePath + localName, { algorithm: 'md5' }).slice(0, 8)}`;
  };

  const classNamesConfig = {
    loader: '@ecomfe/class-names-loader',
    options: {
      classNamesModule: require.resolve('classnames'),
    },
  };
  // 生产环境使用 MiniCssExtractPlugin
  const extractOrStyleLoaderConfig = isProd ? MiniCssExtractPlugin.loader : 'style-loader';

  const postcssLoaderConfig = {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [autoprefixer],
      },
    },
  };

  const cssLoaderConfig = {
    loader: 'css-loader',
    options: {
      modules: { getLocalIdent },
      importLoaders: 1,
    },
  };

  const lessLoaderConfig = {
    loader: 'less-loader',
    options: {
      lessOptions: {
        javascriptEnabled: true,
        modifyVars: {
          'ant-prefix': appKey,
          '@primary-color': '#0C62FF',
        },
      },
    },
  };

  const webpackConfig = {
    mode,
    entry: './src/index.tsx',
    output: outputConfig(isProd),
    devtool: isProd ? false : 'source-map',
    resolve: {
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.less'],
      alias: {
        '@': path.join(__dirname, 'src/'),
      },
    },
    devServer: {
      port: 8000,
      hot: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': '*',
      },
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          terserOptions: {
            format: {
              comments: false,
            },
          },
        }),
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env),
        'process.env.appKey': JSON.stringify(appKey),
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public/index.html'),
        filename: 'index.html',
        inject: true,
        appKey,
      }),
      isProd &&
        new MiniCssExtractPlugin({
          filename: '[name].[contenthash].css',
          chunkFilename: '[name].[contenthash].chunk.css',
        }),
      new CleanWebpackPlugin(),
    ].filter(Boolean),
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: [['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]],
              },
            },
            'ts-loader',
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [classNamesConfig, extractOrStyleLoaderConfig, 'css-loader', postcssLoaderConfig],
        },
        {
          test: /\.less$/,
          use: [
            classNamesConfig,
            extractOrStyleLoaderConfig,
            cssLoaderConfig,
            postcssLoaderConfig,
            lessLoaderConfig,
          ],
        },
        {
          test: /\.(png|jpg|gif|svg)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                name: '[name]_[hash].[ext]',
                limit: 100 * 24,
              },
            },
          ],
        },
      ],
    },
  };

  if (isProd) {
    webpackConfig.externals.push({
      ...getCommonExternals(),
    });
  }

  return webpackConfig;
};
