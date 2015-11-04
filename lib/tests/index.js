// Load in dependencies
var assert = require('assert');
var expect = require('chai').expect;
var config = require('../config');
var spritesmithUtils = require('../utils/spritesmith');

// Define our tests
exports._interpretImage = function (singleImage) {
  return function _interpretImageFn (params) {
    describe(params.engineName, function () {
      describe('interpretting a ' + singleImage.ext + ' image file', function () {
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

exports._renderCanvas = function (singleImage) {
  return function _renderCanvasFn (params) {
    describe(params.engineName, function () {
      describe('rendering a ' + singleImage.ext + ' image into a canvas', function () {
        // Load images and render the canvas
        spritesmithUtils.interpretImages(params.engine, singleImage.filepaths);
        spritesmithUtils.renderCanvas({
          engine: params.engine,
          width: singleImage.width,
          height: singleImage.height,
          coordinateArr: singleImage.coordinateArr,
          exportParams: {
            format: singleImage.ext
          }
        });

        // Allow for debugging
        spritesmithUtils.debugResult('renderCanvas.' + singleImage.ext);

        // Load pixels for comparison
        spritesmithUtils.loadActualPixels(singleImage.type);
        spritesmithUtils.loadExpectedPixels(singleImage.filepaths[0], singleImage.type);

        // Perform our comparison
        it('outputs the same image', function () {
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
            var pixelsWithinThreshold = Math.abs(expectedPixels[i] - actualPixels[i]) <= singleImage.threshold;
            expect(pixelsWithinThreshold).to.equal(true,
              'Expected ' + expectedPixels[i] + ' and ' + actualPixels[i] + ' ' +
              'to be at most ' + singleImage.threshold + ' apart. Index was ' + i);
          }
        });
      });
    });
  };
};
exports.renderPngCanvas = exports._renderCanvas(config.singlePngImage);
exports.renderJpgCanvas = exports._renderCanvas(config.singleJpgImage);
exports.renderGifCanvas = exports._renderCanvas(config.singleGifImage);

exports.renderMultiplePngImages = function (params) {
  describe(params.engineName, function () {
    describe('rendering multiple png images into a canvas', function () {
      // Load images and render the canvas
      var multiplePngImages = config.multiplePngImages;
      spritesmithUtils.interpretImages(params.engine, multiplePngImages.filepaths);
      spritesmithUtils.renderCanvas({
        engine: params.engine,
        width: multiplePngImages.width,
        height: multiplePngImages.height,
        coordinateArr: multiplePngImages.coordinateArr,
        exportParams: {
          format: multiplePngImages.ext
        }
      });

      // Allow for debugging
      spritesmithUtils.debugResult('renderMultipleImages.' + multiplePngImages.ext);

      // Load pixels for comparison
      spritesmithUtils.loadActualPixels(multiplePngImages.type);
      spritesmithUtils.loadExpectedPixels(multiplePngImages.expectedImage, multiplePngImages.type);

      // Perform our comparison
      it('outputs the same image', function () {
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
          var pixelsWithinThreshold = Math.abs(expectedPixels[i] - actualPixels[i]) <= multiplePngImages.threshold;
          expect(pixelsWithinThreshold).to.equal(true,
            'Expected ' + expectedPixels[i] + ' and ' + actualPixels[i] + ' ' +
            'to be at most ' + multiplePngImages.threshold + ' apart. Index was ' + i);
        }
      });
    });
  });
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
