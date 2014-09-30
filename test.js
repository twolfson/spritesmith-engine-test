// Load in dependencies
var assert = require('assert');
var spritesmithUtils = require('./utils/spritesmith');

/**
 * Define our main test function
 * @param {Object} params Container for paramters
 * @param {Object} params.engine Spritemith engine to test
 * @param {String} params.engineName Name of engine to test
 * @param {Object} [params.flags] Options to enable/disable tests
 */
function spritesmithEngineTest(params) {
  // Assert and localize parameters
  assert(params, '`params` was not provided to `spritesmith-engine-test`');
  var engine = params.engine;
  assert(engine, '`params.engine` was not provided to `spritesmith-engine-test`');
  assert(params.engineName, '`params.engineName` was not provided to `spritesmith-engine-test`, please provide one (e.g. \'phantomjssmith\')');

  // Define our tests
  describe(params.engineName, function () {
    describe('interpretting an image file', function () {
      spritesmithUtils.interpretImages([config.singleImage]);

      it('gathers statistics on an image file', function () {
        // Fallback images and grab first one
        var imgs = this.imgs || [];
        var img = imgs[0];

        // Assert against image
        expect(img).to.have.property('height', 50);
        expect(img).to.have.property('width', 50);
      });
    });

    describe('parsing multiple images', function () {
      spritesmithUtils.interpretImages([config.multipleImages]);

      describe('rendering them into a canvas', function () {
        spritesmithUtils.renderCanvas({
          width: 100,
          height: 300,
          coordinateArr: [
            {x: 0, y: 0},
            {x: 0, y: 50},
            {x: 0, y: 100}
          ],
          exportParams: {
            format: 'png'
          }
        });

        it('can output an image', function () {

        });

      });
    });
    describe('interpretting a ridiculous amount of images', function () {
      describe('rendering them into a canvas', function () {
        it('does not crash', function () {

        });
        it('returns an image', function () {

        });
      });
    });

    // DEV: This is testing an edge case of phantomjssmith
    describe('interpretting a large image', function () {
      it('gathers proper image size', function () {

      });
    });
  });
}

// Export the test function
module.exports = spritesmithEngineTest;
