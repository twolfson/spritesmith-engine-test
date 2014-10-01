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
      spritesmithUtils.interpretImages(engine, config.singleImage.filepaths);

      it('gathers statistics on an image file', function () {
        // Fallback images and grab first one
        var imgs = this.imgs || [];
        var img = imgs[0];

        // Assert against image
        expect(img).to.have.property('height', config.singleImage.height);
        expect(img).to.have.property('width', config.singleImage.width);
      });
    });

    describe('parsing multiple images', function () {
      spritesmithUtils.interpretImages(engine, config.multipleImages);

      describe('rendering them into a canvas', function () {
        // Render the canvas into a binary image string
        spritesmithUtils.renderCanvas({
          engine: engine,
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

        // Allow for debugging
        // TODO: Test me
        if (process.env.TEST_DEBUG) {
          spritesmithUtils.debugResult();
        }

        // Load pixels for comparison
        spritesmithUtils.loadActualPixels('image/png');
        spritesmithUtils.loadExpectedPixels(config.expectedMultipleImage, 'image/png');

        it('can output an image', function () {
          // Localize pixel info
          var actualPixels = this.actualPixels;
          var expectedPixels = this.expectedPixels;

          // Compare pixels
          var i = 0;
          var len = actualPixels.length;
          for (; i < len; i++) {
            // If the pixels did not match, complain and throw
            var pixelsWithinThreshold = Math.abs(expectedPixels[i] - actualPixels[i]) <= 10;
            expect(pixelsWithinThreshold).to.equal(true,
              'Expected ' + expectedPixels[i] + ' and ' + actualPixels[i] + ' to be at most 10 apart. Index was ' + i);
          }
        });
      });
    });
    describe('interpretting a ridiculous amount of images', function () {
      // Create and interpret an array of 500 images
      var images = [];
      var coordinateArr = [];
      var i = 0;
      var len = 500;
      for (; i < len; i++) {
        images.push(config.repeatingImage);
        coordinateArr.push({
          x: 0,
          y: i * 16
        });
      }
      spritesmithUtils.interpretImages(engine, images);

      describe('rendering them into a canvas', function () {
        spritesmithUtils.renderCanvas({
          engine: engine,
          width: 16,
          height: 16 * 500,
          coordinateArr: coordinateArr,
          exportParams: {
            format: 'png'
          }
        });

        it('does not crash', function () {
          // Would have thrown
        });
        it('returns an image', function () {
          expect(this.result).to.not.equal('');
        });
      });
    });

    // DEV: This is testing an edge case of phantomjssmith
    describe('interpretting a large image', function () {
      spritesmithUtils.interpretImages(engine, [config.largeImage]);

      it('gathers proper image size', function () {
        var img = this.imgs[0];
        expect(img).to.have.property('height', 600);
        expect(img).to.have.property('width', 800);
      });
    });
  });
}

// Export the test function
module.exports = spritesmithEngineTest;
