# awesome-fontmin-loader


[![NPM version][npm-image]][npm-url]
[![node][node]][node-url]
[![Downloads][downloads-image]][npm-url]
[![Dependencies][dep-image]][dep-url]

Fontmin loader for webpack,use to cut font files from texts.

Suport: `ttf`,`eot`,`woff`,`woff2`,`svg`

You can use [charactor-scanner](https://github.com/Jack-Sparrow/charactor-scanner) if you want to pick charactors from your code files.

~~~
const Scan = require('charactor-scanner');
let text = Scan({
  dir: path.resolve(__dirname, './code-directory'),
  sync: true
}).join('')
~~~

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

## Limitations

Fonts must have the same name and path as the TrueType version of the font.

## Ralated

if you perfer a webpack plugin to a loader, you can see: [fontmin-webpack plugin](https://github.com/patrickhulce/fontmin-webpack)


[downloads-image]: http://img.shields.io/npm/dm/awesome-fontmin-loader.svg
[npm-url]: https://npmjs.org/package/awesome-fontmin-loader
[npm-image]: http://img.shields.io/npm/v/awesome-fontmin-loader.svg
[node]: https://img.shields.io/node/v/awesome-fontmin-loader.svg
[node-url]: https://nodejs.org
[dep-url]: https://david-dm.org/Jack-Sparrow/awesome-fontmin-loader
[dep-image]: http://img.shields.io/david/Jack-Sparrow/awesome-fontmin-loader.svg
