const path = require('path');
const fs = require('fs');
const LoaderUtiles = require('loader-utils');
const mime = require('mime');
const Fontmin = require('fontmin');
const ttf2woff2 = require('ttf2woff2');

const FontminExtentions = ['eot', 'svg', 'woff', 'woff2'];

let globleFileCache = {};
let globleContentCache = {};

module.exports = function (content) {
  if(!this.emitFile) throw new Error("emitFile is required from module system");
  this.cacheable && this.cacheable();
  const callback = this.async();
  let options = LoaderUtiles.getOptions(this) || {};
  let config = {
    limit: options.limit ? parseInt(options.limit, 10) : 0,
    name: options.name || '[name].[ext]',
    regExp: options.regxp,
    mimtype: options.mimetype,
    text: options.text || ''
  };
  let mimetype = config.mimetype || mime.lookup(this.resourcePath);
  let supportAccess = false;
  let accessResouce = null;
  let needTransExt = false;
  let ext = path.extname(this.resourcePath).slice(1);
  let ttfPath = this.resourcePath.replace(new RegExp(`${ext}\$`), 'ttf');
  
  if (config.text) {
    if (ext === 'ttf') {
      supportAccess = true;
      accessResouce = content;
      globleFileCache[ttfPath] = content;
    } else {
      FontminExtentions.forEach(type => {
        if (type === ext) {
          if ( !globleContentCache[this.resourcePath] ) {
            if (globleFileCache[ttfPath]) {
              supportAccess = true;
              accessResouce = globleFileCache[ttfPath];
            } else if (fs.existsSync(ttfPath)) {
              supportAccess = true;
              accessResouce = fs.readFileSync(ttfPath);
              globleFileCache[ttfPath] = accessResouce;
            }
            needTransExt = ext !== 'woff2';
          }
        }
      });
    }
  }
  
  const noFontMinAccess = (content, resolve, rejact) => {
    let callbackParam = '';
    if(config.limit <= 0 || content.length < config.limit) {
      callbackParam = "module.exports = " + JSON.stringify("data:" + (mimetype ? mimetype + ";" : "") + "base64," + content.toString("base64"));
    } else {
      let url = LoaderUtiles.interpolateName(this, config.name, {
        context: options.context || this.options.context,
        content: content,
        regExp: config.regExp
      });
      let publicPath = "__webpack_public_path__ + " + JSON.stringify(url);
      this.emitFile(url, content);
      callbackParam = "module.exports = " + publicPath + ";";
    }
    resolve(callbackParam);
  };
  
  const FontMinAccess = (resolve, reject) => {
    const fontmin = new Fontmin().src(accessResouce);
  
    config.text && fontmin.use(Fontmin.glyph({
      text: config.text
    }));
  
    needTransExt && fontmin.use(Fontmin[`ttf2${ext}`](ext === 'woff' ? {
        deflate: true
      } : null));
  
    fontmin.run((err, files) => {
      if (err) {
        reject(err);
      }
      let result_content = needTransExt ? files[1].contents : files[0].contents;
      globleContentCache[ttfPath] = result_content;
    
      if (ext === 'woff2') {
        result_content = ttf2woff2(result_content);
      }
    
      let callbackParam = '';
      if(config.limit <= 0 || result_content.length < config.limit) {
        callbackParam = "module.exports = " + JSON.stringify("data:" + (mimetype ? mimetype + ";" : "") + "base64," + result_content.toString("base64"));
      } else {
        let url = LoaderUtiles.interpolateName(this, config.name, {
          context: options.context || this.options.context,
          content: result_content,
          regExp: config.regExp
        });
        let publicPath = "__webpack_public_path__ + " + JSON.stringify(url);
      
        this.emitFile(url, result_content);
        callbackParam = "module.exports = " + publicPath + ";";
      }
      resolve(callbackParam);
    });
  };
  
  new Promise( (resolve, reject) => {
    if (!supportAccess) {
      noFontMinAccess(globleContentCache[ttfPath] || content, resolve);
    } else {
      FontMinAccess(resolve);
    }
  }).then(param => callback(null, param), err => callback(err));
  
};
module.exports.raw = true;