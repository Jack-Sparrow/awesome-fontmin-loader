# awesome-fontmin-loader


[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Downloads][downloads-image]][npm-url]
[![Dependencies][dep-image]][dep-url]

Fontmin loader for webpack,use to cut font files from texts.

Suport: `ttf`,`eot`,`woff`,`woff2`,`svg`

## Usage

`npm install --save-dev awesome-fontmin-loader`

Webpack 2.x config:

~~~
{
  test: /\.(svg|woff|woff2|ttf|eot)$/,
  use: [
    {
      loader: 'awesome-fontmin-loader',
      options: {
        limit: 1000,
        name: 'assets/fonts/[name].[hash].[ext]',
        text: 'FOOBAR'
      }
    }
  ]
}
~~~

Webpack 1.x config:

~~~
{ test: /\.(svg|woff|woff2|ttf|eot)$/, loader: "awesome-fontmin?limit=1000&name=fonts/[name].[ext]&text='FOOBAR'" },
~~~

[downloads-image]: http://img.shields.io/npm/dm/awesome-fontmin-loader.svg
[npm-url]: https://npmjs.org/package/awesome-fontmin-loader
[npm-image]: http://img.shields.io/npm/v/awesome-fontmin-loader.svg

[travis-url]: https://travis-ci.org/Jack-Sparrow/awesome-fontmin-loader
[travis-image]: http://img.shields.io/travis/Jack-Sparrow/awesome-fontmin-loader.svg

[dep-url]: https://david-dm.org/Jack-Sparrow/awesome-fontmin-loader
[dep-image]: http://img.shields.io/david/Jack-Sparrow/awesome-fontmin-loader.svg
