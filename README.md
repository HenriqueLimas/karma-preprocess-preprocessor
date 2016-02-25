# karma-preprocess-preprocessor

> Preprocess a file using [preprocess].

## Installation

The easiest way is to keep `karma-preprocess-preprocessor` as a devDependency.
You can simple do it by:
```bash
npm install karma-preprocess-preprocessor --save-dev
```

## Configuration

Following code shows the default configuration

```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    preprocessors: {
      '**/*.js': ['preprocess']
    },

    preprocessPreprocessor: {
      // options passed to the preprocess plugin
      options: {
        type: 'html' // default is "js"
      },
      // Context passed to preprocess plugin, can be a Function, URL string or an object
      context: __dirname + '/my-context.json'
    },

    // make sure to include the .js files
    files: [
      '**/*.js'
    ]
  })
}
```

If you need to process both, html and js, you can use karmas `customPreprocessors`:

```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    customPreprocessors: {
      preprocess_js: {
        base: 'preprocess',
        options: { type: 'js' }
      },
      preprocess_html: {
        base: 'preprocess',
        options: { type: 'html' }
      }
    },
    preprocess: {
      'src/js/**/*.js': ['preprocess_js'],
      'src/templates/**/*.html': ['preprocess_html']
    },

    preprocessPreprocessor: {
      // Context passed to preprocess plugin, can be a Function, URL string or an object
      context: __dirname + '/my-context.json'
    },

    // make sure to include the .js files
    files: [
      'src/js/**/*.js'
    ]
  })
}
```

----

For more information on Karma see the [karma] homepage.

For more information on Preprocess see the [preprocess] homepage.


[karma]: http://karma-runner.github.com
[preprocess]: https://www.npmjs.com/package/preprocess
