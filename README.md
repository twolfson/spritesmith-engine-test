# spritesmith-engine-test [![Build status](https://travis-ci.org/twolfson/spritesmith-engine-test.png?branch=master)](https://travis-ci.org/twolfson/spritesmith-engine-test)

Common test suite [spritesmith][] engines

These files were written for usage with [mocha][].

[spritesmith]: https://github.com/Ensighten/spritesmith
[mocha]: https://github.com/visionmedia/mocha

## Specification version
The current repository version is built to match specification version:

**1.0.0**

Specification documentation can be found at:

https://github.com/twolfson/spritesmith-engine-spec/tree/1.0.0

## Getting started
Install the module via: `npm install spritesmith-engine-test`

Create files that require and run the test suite:

**test/myengine_test.js:**

```js
// Load in dependencies
var spritesmithEngineTest = require('spritesmith-engine-test');
var myengine = require('../lib/engine');

// Run our test suite
// DEV: This loads and define multiple `mocha` test suites
spritesmithEngineTest.run({
  engine: myengine,
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

## Donating
Support this project and [others by twolfson][gratipay] via [gratipay][].

[![Support via Gratipay][gratipay-badge]][gratipay]

[gratipay-badge]: https://cdn.rawgit.com/gratipay/gratipay-badge/2.x.x/dist/gratipay.png
[gratipay]: https://www.gratipay.com/twolfson/

## License
Copyright (c) 2013-2014 Todd Wolfson

Licensed under the MIT license.
