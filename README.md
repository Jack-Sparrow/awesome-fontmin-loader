# awesome-fontmin-loader

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