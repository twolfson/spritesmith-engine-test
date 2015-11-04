// Load in dependencies
var assert = require('assert');
var expect = require('chai').expect;
var config = require('./config');
var spritesmithUtils = require('./utils/spritesmith');

// Define our tests
exports._interpretImage = function (singleImage) {
  return function _interpretImageFn (params) {
    describe(params.engineName, function () {
      describe('interpretting an ' + singleImage.ext + ' image file', function () {
        spritesmithUtils.interpretImages(params.engine, singleImage.filepaths);

        it('gathers statistics', function () {
          // Fallback images and grab first one
          var imgs = this.imgs || [];
          var img = imgs[0];

          // Assert against image
          expect(img).to.have.property('height', singleImage.height);
          expect(img).to.have.property('width', singleImage.width);
        });
      });
    });
  };
};
exports.interpretPngImage = exports._interpretImage(config.singlePngImage);
exports.interpretJpgImage = exports._interpretImage(config.singleJpgImage);
exports.interpretGifImage = exports._interpretImage(config.singleGifImage);

exports._renderCanvas = function (multipleImages) {
  return function _renderCanvasFn (params) {
    describe(params.engineName, function () {
      describe('parsing multiple ' + multipleImages.ext + ' images', function () {
        spritesmithUtils.interpretImages(params.engine, multipleImages.filepaths);

        describe('rendering them into a canvas', function () {
          // Render the canvas into a binary image string
          spritesmithUtils.renderCanvas({
            engine: params.engine,
            width: multipleImages.width,
            height: multipleImages.height,
            coordinateArr: multipleImages.coordinateArr,
            exportParams: {
              format: multipleImages.ext
            }
          });

          // Allow for debugging
          if (process.env.TEST_DEBUG) {
            spritesmithUtils.debugResult();
          }

          // Load pixels for comparison
          spritesmithUtils.loadActualPixels(multipleImages.type);
          spritesmithUtils.loadExpectedPixels(multipleImages.expectedImage, multipleImages.type);

          it('can output an image', function () {
            // Localize pixel info
            var actualPixels = this.actualPixels;
            var expectedPixels = this.expectedPixels;

            // Compare pixels
            var i = 0;
            var len = actualPixels.length;
            assert.notEqual(len, undefined, 'Expected `len` to not be `undefined`');
            assert.notEqual(actualPixels[0], undefined, 'Expected `actualPixels[0]` to not be `undefined`');
            assert.notEqual(expectedPixels[0], undefined, 'Expected `expectedPixels[0]` to not be `undefined`');
            for (; i < len; i++) {
              // If the pixels did not match, complain and throw
              var pixelsWithinThreshold = Math.abs(expectedPixels[i] - actualPixels[i]) <= 10;
              expect(pixelsWithinThreshold).to.equal(true,
                'Expected ' + expectedPixels[i] + ' and ' + actualPixels[i] + ' ' +
                'to be at most 10 apart. Index was ' + i);
            }
          });
        });
      });
    });
  };
};

exports.interpretManyPngImages = function (params) {
  describe(params.engineName, function () {
    describe('interpretting a ridiculous amount of png images', function () {
      // Interpret an array of 500 images
      var manyPngImages = config.manyPngImages;
      spritesmithUtils.interpretImages(params.engine, manyPngImages.filepaths);

      describe('rendering them into a canvas', function () {
        spritesmithUtils.renderCanvas({
          engine: params.engine,
          width: manyPngImages.width,
          height: manyPngImages.height,
          coordinateArr: manyPngImages.coordinateArr,
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
  });
};

// DEV: This is testing an edge case of phantomjssmith
exports.interpretLargePngImage = function (params) {
  describe(params.engineName, function () {
    describe('interpretting a large png image', function () {
      var largePngImage = config.largePngImage;
      spritesmithUtils.interpretImages(params.engine, largePngImage.filepaths);

      it('gathers proper image size', function () {
        var img = this.imgs[0];
        expect(img).to.have.property('width', largePngImage.width);
        expect(img).to.have.property('height', largePngImage.height);
      });
    });
  });
};
