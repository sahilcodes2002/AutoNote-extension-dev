const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const path = require('path');
const tailwindcss = require('tailwindcss');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: "development",
    devtool: 'cheap-module-source-map',
    entry: {
        popup: path.resolve('./src/popup/popup.jsx'),
        options: path.resolve('./src/options/options.tsx'),
        background: path.resolve('./src/background/background.js'),
        contentScript: path.resolve('./src/contentScript/contentScript.jsx')
    },
    module: {
        rules: [
            { 
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { 
                                targets: "defaults",
                                useBuiltIns: "entry",
                                corejs: 3 
                            }],
                            ['@babel/preset-react', { runtime: "automatic" }]
                        ],
                        generatorOpts: {
                            jsescOption: {
                                minimal: true,
                                escapeEverything: true,
                                encoding: 'utf8'
                            }
                        }
                    }
                }
            },
            {
                use: "ts-loader",
                test: /\.tsx$/,
                exclude: /node_modules/
            },
            {
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    tailwindcss,
                                    autoprefixer
                                ]
                            }
                        }
                    }
                ],
                test: /\.css$/i,
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            },
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { 
                    from: path.resolve('src/static'),
                    to: path.resolve('dist')
                }
            ]
        }),
        ...getHtmlPlugins([
            'popup',
            'options',
        ])
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx"]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        charset: true, // Webpack 5+ built-in UTF-8 handling
        clean: true
    },
    optimization: {
        splitChunks: {
            chunks(chunk) {
                return chunk.name !== 'contentScript';
            }
        },
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    format: {
                        comments: false,
                        ascii_only: true // Crucial for encoding
                    }
                },
                extractComments: false
            })
        ]
    }
};

function getHtmlPlugins(chunks) {
    return chunks.map(chunk => new HtmlPlugin({
        title: 'React Extension',
        filename: `${chunk}.html`,
        chunks: [chunk],
        meta: {
            charset: 'utf-8' // Explicit charset in HTML
        }
    }));
}