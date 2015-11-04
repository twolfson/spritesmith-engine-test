// Load in dependencies
var assert = require('assert');
var expect = require('chai').expect;
var config = require('./config');
var spritesmithUtils = require('./utils/spritesmith');

/**
 * Define our main test function
 * @param {Object} params Container for paramters
 * @param {Object} params.engine Spritemith engine to test
 * @param {String} params.engineName Name of engine to test
 * @param {Object} [params.options] Options to enable/disable tests
 */
function spritesmithEngineTest(params) {
  // Assert and localize parameters
  assert(params, '`params` was not provided to `spritesmith-engine-test`');
  var engine = params.engine;
  assert(engine, '`params.engine` was not provided to `spritesmith-engine-test`');
  assert(params.engineName, '`params.engineName` was not provided to `spritesmith-engine-test`, ' +
    'please provide one (e.g. \'phantomjssmith\')');
  var testOptions = params.options || {};

  // Conditionally skip ridiculous image test
  if (testOptions.skipRidiculousImagesTest !== true) {
  }
}

// Export the test function
module.exports = spritesmithEngineTest;
