const inline = require('inline-source');
const Module = require('module');

function exec(code, filename) {
  const module = new Module(filename, this);
  module.paths = Module._nodeModulePaths(this.context);
  module.filename = filename;
  module._compile(code, filename);
  return module.exports;
}

module.exports = function loader (content, map, meta) {
  let contentEdit = content;
  // @see https://github.com/webpack/webpack.js.org/issues/1268#issuecomment-313513988
  this.exec = exec;
  const callback = this.async();
  const loader = this;
  inline(contentEdit, {
    rootpath: this.context,
    handlers: [
      (source, context, next) => {
        const sourceEdit = source;
        loader.addDependency(sourceEdit.filepath);
        loader.loadModule(sourceEdit.filepath, (err, subSource) => {
          if (!err) {
            const [[, result]] = loader.exec(subSource, sourceEdit.filepath);
            sourceEdit.content = result;
          }
          next();
        });
      },
    ],
  }, (err, html) => {
    if (!err) {
      contentEdit = html;
    }
    callback(err, contentEdit, map, meta);
  });
};
