# spritesmith-engine-test

Common test suite and specification for all Spritesmith engines

These files were written for usage with [doubleshot][doubleshot].

[doubleshot]: https://github.com/twolfson/doubleshot

## Specification

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
