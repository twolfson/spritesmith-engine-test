// Load in dependencies
var assert = require('assert');
var fs = require('fs');
var async = require('async');
var expect = require('chai').expect;
var concat = require('concat-stream');
var getPixels = require('get-pixels');
var Vinyl = require('vinyl');

// Define our utility functions
exports.createEngine = function (Engine, options) {
  before(function createEngineFn () {
    this.engine = new Engine(options);
  });
  after(function cleanupEngine () {
    delete this.engine;
  });
};

exports.interpretStringImages = function (filepaths) {
  before(function interpretStringImagesFn (done) {
    // Create an image and save it for later
    var that = this;
    assert(this.engine, '`this.engine` was not defined. Please verify `spritesmithUtils.createEngine` has been run');
    this.engine.createImages(filepaths, function (err, imgs) {
      // Save images and callback
      that.imgs = imgs;
      done(err);
    });
  });
  after(function cleanupImages () {
    delete this.imgs;
  });
};

exports.interpretBufferVinylImages = function (filepaths) {
  before(function interpretBufferVinylImagesFn (done) {
    // Create an image and save it for later
    var that = this;
    async.map(filepaths, fs.readFile, function handleBuffers (err, buffArr) {
      // If there was an error, callback with it
      if (err) {
        return done(err);
      }

      // Create buffer-basd vinyl object
      var vinylArr = buffArr.map(function createVinylObj (buff, i) {
        return new Vinyl({
          path: filepaths[i],
          contents: buff
        });
      });

      // Create our images
      that.engine.createImages(vinylArr, function (err, imgs) {
        // Save images and callback
        that.imgs = imgs;
        done(err);
      });
    });
  });
  after(function cleanupImages () {
    delete this.imgs;
  });
};

exports._createCanvas = function (width, height) {
  before(function createCanvasFn () {
    assert(this.engine, '`this.engine` was not defined. Please verify `spritesmithUtils.createEngine` has been run');
    this.canvas = this.engine.createCanvas(width, height);
  });
  after(function cleanupCanvas () {
    delete this.canvas;
  });
};

exports._addImages = function (coordinateArr) {
  before(function addImagesFn () {
    // Assert we have images, a canvas, and the proper amount of items
    var canvas = this.canvas;
    var imgs = this.imgs;
    assert(canvas, '`this.canvas` was not defined. Please verify `spritesmithUtils._createCanvas` has been run');
    assert(imgs, '`this.imgs` was not defined. Please verify `spritesmithUtils.interpretImages` has been run');
    assert.strictEqual(imgs.length, coordinateArr.length, 'Expected: ' + imgs.length + ' === ' + coordinateArr.length +
      '. `imgs.length` to equal `coordinateArr.length` for `spritesmithUtils._addImages`');

    // Add the images based on an array mapping
    imgs.forEach(function (img, i) {
      var coordinates = coordinateArr[i];
      canvas.addImage(img, coordinates.x, coordinates.y);
    });
  });
};

exports._exportCanvas = function (exportParams) {
  before(function exportCanvasFn (done) {
    // Assert we have images, a canvas, and the proper amount of items
    var canvas = this.canvas;
    assert(canvas, '`this.canvas` was not defined. Please verify `spritesmithUtils._createCanvas` has been run');

    // Export canvas, save result, and callback
    var that = this;
    var resultStream = canvas['export'](exportParams);
    resultStream.on('error', done);
    resultStream.pipe(concat(function saveExport (result) {
      that.result = result;
      done();
    }));
  });
  after(function cleanupExport () {
    delete this.result;
  });
};

exports.renderCanvas = function (options) {
  exports._createCanvas(options.width, options.height);
  exports._addImages(options.coordinateArr);
  exports._exportCanvas(options.exportParams);
};

exports.debugResult = function (filepath) {
  assert(filepath, '`exports.debugResult` requires a filepath. Please provide one');
  if (process.env.TEST_DEBUG) {
    before(function writeDebugImage (done) {
      fs.writeFile(filepath, this.result, done);
    });
  }
};

exports.loadActualPixels = function (encoding) {
  before(function loadActualPixelsFn (done) {
    // Load the pixels, save, and callback
    var that = this;
    var actualImage = this.result;
    getPixels(actualImage, encoding, function saveActualPixels (err, pixels) {
      if (err) {
        return done(err);
      }
      that.actualPixels = pixels.data;
      done();
    });
  });
  after(function cleanupActualPixels () {
    delete this.actualPixels;
  });
};

exports.loadExpectedPixels = function (filepath, encoding) {
  before(function loadExpectedPixelsFn (done) {
    // Load the pixels from disk, save, and callback
    var that = this;
    getPixels(filepath, encoding, function saveExpectedPixels (err, pixels) {
      that.expectedPixels = pixels.data;
      done(err);
    });
  });
  after(function cleanupExpectedPixels () {
    delete this.expectedPixels;
  });
};

exports.assertSimilarPixels = function (expectedPixels, actualPixels, threshold) {
  // Compare pixels
  var i = 0;
  var len = actualPixels.length;
  assert.notEqual(len, undefined, 'Expected `len` to not be `undefined`');
  assert.notEqual(actualPixels[0], undefined, 'Expected `actualPixels[0]` to not be `undefined`');
  assert.notEqual(expectedPixels[0], undefined, 'Expected `expectedPixels[0]` to not be `undefined`');
  assert.strictEqual(expectedPixels.length, len);
  for (; i < len; i++) {
    // If the pixels did not match, complain and throw
    var pixelsWithinThreshold = Math.abs(expectedPixels[i] - actualPixels[i]) <= threshold;
    expect(pixelsWithinThreshold).to.equal(true,
      'Expected ' + expectedPixels[i] + ' and ' + actualPixels[i] + ' ' +
      'to be at most ' + threshold + ' apart. Index was ' + i);
  }
};
