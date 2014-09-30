# spritesmith-engine-test [![Donate on Gittip](http://badgr.co/gittip/twolfson.png)](https://www.gittip.com/twolfson/)

Common test suite and specification for all [spritesmith][] engines

These files were written for usage with [doubleshot][doubleshot].

[spritesmith]: https://github.com/Ensighten/spritesmith
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
canvas.addImage(img, x, y);
/**
 * Add an image at the specified location (upper-left corner of image matches x,y)
 * You will not need to worry about overlapping images.
 * It is a bit inconsistent for this to not be asynchronous but any async can be done in export.
 * @param {Object} img Image instance created via `engine.createImages`
 * @param {Number} x Horizontal coordinate to position left edge of image
 * @param {Number} y Vertical coordinate to position top edge of image
 */
```

```js
canvas['export'](options, cb);
/**
 * Export an image with dimensions from `engine.createCanvas` and imgs/positions from `canvas.addImage`
 * @param {Object} options Modifiers to indicate how to export (e.g. {format: 'png'} to produce a `png`)
 * @param {Function} cb
 * @callback {null|Object} err Callback with an error if there was one, otherwise null
 * @callback {String} result Binary encoded string of output image
 */
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
Copyright (c) 2013-2014 Todd Wolfson

Licensed under the MIT license.
