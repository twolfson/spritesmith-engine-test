// Load in dependencies
var assert = require('assert');
var fs = require('fs');
var async = require('async');
var expect = require('chai').expect;
var getPixels = require('get-pixels');
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

        it('can output an image', function (done) {
          // Assert the actual image is the same expected
          var actualImage = this.result;

          // Allow for debugging
          if (process.env.TEST_DEBUG) {
            fs.writeFileSync('debug.png', actualImage, 'binary');
          }

          // Load pixels
          async.parallel([
            // DEV: While these have the same signature, the input formats are different
            // and the signatures might change in the near future
            function loadActualPixels (cb) {
              var actualImageBuffer = new Buffer(actualImage, 'binary');
              getPixels(actualImageBuffer, 'image/png', cb);
            },
            function loadExpectedPixels (cb) {
              getPixels(config.expectedMultipleImage, 'image/png', cb);
            }
          ], function handlePixels (err, pixels) {
            // If there was an error, exit early
            if (err) {
              return done(err);
            }

            // Localize pixel info
            var actualPixels = pixels[0].data;
            var expectedPixels = pixels[1].data;

            // Compare pixels
            var pixelsMatchWithinThreshold = true;
            var i = 0;
            var len = actualPixels.length;
            for (; i < len; i++) {
              if (Math.abs(expectedPixels[i] - actualPixels[i]) > 10) {
                pixelsMatchWithinThreshold = false;
                break;
              }
            }

            // If the pixels did not match, complain about the index
            expect(pixelsMatchWithinThreshold).to.equal(true,
              'Expected ' + expectedPixels[i] + ' and ' + actualPixels[i] + ' to be at most 10 apart. Index was ' + i);

            // Callback
            done();
          });
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
      spritesmithUtils.interpretImages(images);

      describe('rendering them into a canvas', function () {
        spritesmithUtils.renderCanvas({
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
      spritesmithUtils.interpretImages([config.largeImage]);

      it('gathers proper image size', function () {
        expect(this.img).to.have.property('height', 600);
        expect(this.img).to.have.property('width', 800);
      });
    });
  });
}

// Export the test function
module.exports = spritesmithEngineTest;
