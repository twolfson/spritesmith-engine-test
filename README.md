# spritesmith-engine-test

Common test suite and specification for all Spritesmith engines

These files were written for usage with [doubleshot][doubleshot].

[doubleshot]: https://github.com/twolfson/doubleshot

## Specification
There are two constructors that will need to be made

- `engine` which takes care of asynchronous construction of new items
- `canvas` which accepts image instances and outputs a final image

### engine
Each `engine` must have and implement the following methods:

```js
engine.createImages(images, cb);
/**
 * Utility to create images in your engine format
 * @param {String[]} filepaths Array of filepaths to images to be parsed into images
 * @param {Function} cb Function to callback with image objects
 * @callback {null|Object} err Callback with an error if there was one, otherwise null
 * @callback {Object[]} imgs Callback with an array of images
 * @callback {Number} imgs[*].height Height (pixels) of the input image
 * @callback {Number} imgs[*].width Width (pxiels) of the input image
 */
```

```js
engine.createCanvas(width, height, cb);
/**
 * Asynchronous constructor for canvas
 * @param {Number} width Width (pixels) for canvas. Exported width should match this.
 * @param {Number} height Height (pixels) for canvas. Exported height should match this.
 * @param {Function} cb Function to callback with constructed canvas
 * @callback {null|Object} err Callback with an error if there was one, otherwise null
 * @callback {Object} canvas Canvas instance for your engine
 */
```

### canvas
Each `canvas` must have and implement the following methods:
```js
```

## Using the module
Install the module via npm

```shell
npm install spritesmith-engine-test
```

Create files that require and extend test `content` and `outline`

```js
// test_outline.js
module.exports = {
  // Run all spritesmith-engine-tests using mysmith
  'mysmith': require('spritesmith-engine-test').outline
};

// test_content.js
var commonTest = require('spritesmith-engine-test').content;
module.exports = extend({}, commonTest, {
  // Provide a hook for my smith in doubleshot
  'mysmith': function () {
    // Save mysmith as the test smith
    this.smith = mysmith;

    // Specify the files to be tested against
    var expectedDir = __dirname + '/expected_files/';
    this.expectedFilepaths = [expectedDir + '/multiple.png', expectedDir + '/multiple2.png'];
  }
});
```

Run your tests via `doubleshot`

```shell
# Install test dependencies
npm install -g doubleshot

# Run doubleshot test suite
doubleshot
```

## License
Copyright (c) 2013 Todd Wolfson

Licensed under the MIT license.
