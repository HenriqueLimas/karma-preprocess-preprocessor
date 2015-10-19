'use strict';

var fs = require('fs');
var pp = require('preprocess');

function preprocessPreprocessor(config, helper) {
  return function(content, file, done) {
    config = config || {};

    var options = config.options || {};

    var context = config.context;

    if (typeof context === 'string') {
      return fs.readFile(context, 'utf8', function(err, data) {
        if (err) {
          return console.log(err);
        }

        var context = JSON.parse(data);

        preprocess(content, context, options);
      });
    } else if (typeof context === 'function') {
      context = context();
    }

    preprocess(content, context, options);

    function preprocess(content, context, options) {
      options = helper.merge({
        type: 'js'
      }, options);

      done(pp.preprocess(content, context, options));
    }
  };
}

preprocessPreprocessor.$inject = ['config.preprocessPreprocessor', 'helper'];

module.exports = {
  'preprocessor:preprocess': ['factory', preprocessPreprocessor]
};
