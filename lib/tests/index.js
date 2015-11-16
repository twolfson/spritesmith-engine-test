// Load in dependencies
var expect = require('chai').expect;
var semver = require('semver');
var config = require('../config');
var spritesmithUtils = require('../utils/spritesmith');

// Define our tests
exports.assetSpecVersion = function (params) {
  describe(params.engineName, function () {
    it('has a matching specVersion property', function () {
      expect(params.engine).to.have.property('specVersion');
      expect(semver.satisfies(params.engine.specVersion, '>=2.0.0 <3.0.0')).to.equal(true);
    });
  });
};

exports._interpretImage = function (singleImage) {
  return function _interpretImageFn (params) {
    describe(params.engineName, function () {
      spritesmithUtils.createEngine(params.engine, params.engineOptions);

      describe('interpretting a ' + singleImage.format + ' image file', function () {
        spritesmithUtils.interpretStringImages(singleImage.filepaths);

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

exports._renderCanvas = function (singleImage, interpretImages) {
  return function _renderCanvasFn (params) {
    describe(params.engineName, function () {
      spritesmithUtils.createEngine(params.engine, params.engineOptions);

      describe('rendering a ' + singleImage.format + ' image into a canvas', function () {
        // Load images and render the canvas
        interpretImages(singleImage.filepaths);
        spritesmithUtils.renderCanvas({
          width: singleImage.width,
          height: singleImage.height,
          coordinateArr: singleImage.coordinateArr,
          exportParams: {
            format: singleImage.format
          }
        });

        // Allow for debugging
        spritesmithUtils.debugResult('renderCanvas.' + singleImage.format);

        // Load pixels for comparison
        spritesmithUtils.loadActualPixels(singleImage.type);
        spritesmithUtils.loadExpectedPixels(singleImage.filepaths[0], singleImage.type);

        // Perform our comparison
        it('outputs the same image', function () {
          spritesmithUtils.assertSimilarPixels(this.expectedPixels, this.actualPixels, singleImage.threshold);
        });
      });
    });
  };
};
exports.renderPngCanvas = exports._renderCanvas(config.singlePngImage, spritesmithUtils.interpretStringImages);
exports.renderJpgCanvas = exports._renderCanvas(config.singleJpgImage, spritesmithUtils.interpretStringImages);
exports.renderGifCanvas = exports._renderCanvas(config.singleGifImage, spritesmithUtils.interpretStringImages);
exports.renderPngBufferVinylCanvas = exports._renderCanvas(config.singlePngImage,
  spritesmithUtils.interpretBufferVinylImages);
exports.renderPngStreamVinylCanvas = exports._renderCanvas(config.singlePngImage,
  spritesmithUtils.interpretStreamVinylImages);
exports.renderPngNullVinylCanvas = exports._renderCanvas(config.singlePngImage,
  spritesmithUtils.interpretNullVinylImages);

exports.renderMultiplePngImages = function (params) {
  describe(params.engineName, function () {
    spritesmithUtils.createEngine(params.engine, params.engineOptions);

    describe('rendering multiple png images into a canvas', function () {
      // Load images and render the canvas
      var multiplePngImages = config.multiplePngImages;
      spritesmithUtils.interpretStringImages(multiplePngImages.filepaths);
      spritesmithUtils.renderCanvas({
        width: multiplePngImages.width,
        height: multiplePngImages.height,
        coordinateArr: multiplePngImages.coordinateArr,
        exportParams: {
          format: multiplePngImages.format
        }
      });

      // Allow for debugging
      spritesmithUtils.debugResult('renderMultipleImages.' + multiplePngImages.format);

      // Load pixels for comparison
      spritesmithUtils.loadActualPixels(multiplePngImages.type);
      spritesmithUtils.loadExpectedPixels(multiplePngImages.expectedImage, multiplePngImages.type);

      // Perform our comparison
      it('outputs the same image', function () {
        spritesmithUtils.assertSimilarPixels(this.expectedPixels, this.actualPixels, multiplePngImages.threshold);
      });
    });
  });
};

exports.renderManyPngImages = function (params) {
  describe(params.engineName, function () {
    spritesmithUtils.createEngine(params.engine, params.engineOptions);

    describe('interpretting a ridiculous amount of png images', function () {
      // Interpret an array of 500 images
      var manyPngImages = config.manyPngImages;
      spritesmithUtils.interpretStringImages(manyPngImages.filepaths);

      describe('rendering them into a canvas', function () {
        spritesmithUtils.renderCanvas({
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
    spritesmithUtils.createEngine(params.engine, params.engineOptions);

    describe('interpretting a large png image', function () {
      var largePngImage = config.largePngImage;
      spritesmithUtils.interpretStringImages(largePngImage.filepaths);

      it('gathers proper image size', function () {
        var img = this.imgs[0];
        expect(img).to.have.property('width', largePngImage.width);
        expect(img).to.have.property('height', largePngImage.height);
      });
    });
  });
};
