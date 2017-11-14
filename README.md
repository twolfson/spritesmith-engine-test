# spritesmith-engine-test [![Build status](https://travis-ci.org/twolfson/spritesmith-engine-test.png?branch=master)](https://travis-ci.org/twolfson/spritesmith-engine-test)

Common test suite for [spritesmith][] engines

These files were written for usage with [mocha][]

[spritesmith]: https://github.com/Ensighten/spritesmith
[mocha]: https://github.com/visionmedia/mocha

## Specification version
The current repository version is built to match specification version:

**2.0.0**

Specification documentation can be found at:

https://github.com/twolfson/spritesmith-engine-spec/tree/2.0.0

## Getting started
Install the module via: `npm install spritesmith-engine-test`

Create files that require and run the test suite:

**test/myengine_test.js:**

```js
// Load in dependencies
var spritesmithEngineTest = require('spritesmith-engine-test');
var MyEngine = require('../lib/engine');

// Run our test suite
// DEV: This loads and define multiple `mocha` test suites
spritesmithEngineTest.run({
  engine: MyEngine,
  engineName: 'myengine'
});
```

Run your tests via `mocha`:

```bash
# Install test dependencies
npm install mocha

# Run mocha test suite
./node_modules/.bin/mocha test/
#  myengine
#    interpretting an image file
#      ✓ gathers statistics on an image file
#  ...
```

## Documentation
`spritesmith-engine-test` exports the following keys its `module.exports`:

- config `Object` - Assortment of configurations used for each test suite
    - See [lib/config.js](lib/config.js) for documentation
    - Feel free to reuse these in any of your one-off tests
- run `Function` - Test suite runner
    - Documentation cane be found below
- spritesmithUtils `Object` - One-off utilities for our test [mocha][] suites
    - See [lib/utils/](lib/utils/) for documentation
    - Feel free to reuse these in any of your one-off tests

### `run(params)`
Generates a set of [mocha][] test suites for a `spritesmith` engine

- params `Object` - Container for test setup
    - engine `Object` - `spritesmith` engine as defined by [spritesmith-engine-spec][]
    - engineName `String` - Name of engine to use in test suites
    - engineOptions `Object` - Optional options to pass to `engine` constructor
    - tests `Object` - Optional overrides to enable/disable tests
        - By default, all tests will run
        - Signature should be `testName: boolean` (e.g. `{interpretPngImage: false}`)
        - A list of tests can be found below

**Example with `tests`:**

```js
spritesmithEngineTest.run({
  engine: myengine,
  engineName: 'myengine',
  // Skip over rendering a GIF image
  tests: {
    renderGifCanvas: false
  }
});
```

[spritesmith-engine-spec]: https://github.com/twolfson/spritesmith-engine-spec

### Tests
Our test suite has the following tests built into it:

- assertSpecVersion - Verify the engine has a `specVersion` for the corresponding specification
- interpretPngImage - Loads a PNG image and asserts we get the correct height/width
- interpretJpegImage - Same as `interpretPngImage` but for a JPEG  (using `format: 'jpeg'`)
- interpretJpgImage - Same as `interpretPngImage` but for a JPEG (using `format: 'jpg'`)
- interpretGifImage - Same as `interpretPngImage` but for a GIF
- renderPngCanvas - Loads a PNG image, renders it via the `export`, and asserts the image is more/less the same
- renderJpgCanvas - Same as `renderPngCanvas` but for a JPG
- renderGifCanvas - Same as `renderPngCanvas` but for a GIF
- renderPngBufferVinylCanvas - Same as `renderPngCanvas` but uses a buffer-based Vinyl object instead of a filepath
- renderPngStreamVinylCanvas - Same as `renderPngCanvas` but uses a stream-based Vinyl object instead of a filepath
- renderPngNullVinylCanvas - Same as `renderPngCanvas` but uses a null-based Vinyl object instead of a filepath
- renderMultiplePngImages - Load multiple images, place them at different spots on a canvas, and verify the placements are respected
- renderManyPngImages - Load 500 images and render them on a canvas
    - This is to verify each engine can handle a signficant amount of images
- interpretLargePngImage - Load an 800x600 image and assert we get the correct height/width
    - This is part of a regression we encountered in `phantomjssmith`

## Donating
Support this project and [others by twolfson][twolfson-projects] via [donations][twolfson-support-me].

<http://twolfson.com/support-me>

[twolfson-projects]: http://twolfson.com/projects
[twolfson-support-me]: http://twolfson.com/support-me

## License
Copyright (c) 2013-2014 Todd Wolfson

Licensed under the MIT license.
