// Load in dependencies
var assert = require('assert');
var fs = require('fs');
var getPixels = require('get-pixels');

// Define our utility functions
exports.interpretImages = function (engine, vinylFiles) {
  before(function interpretImagesFn (done) {
    // Create an image and save it for later
    var that = this;
    engine.createImages(vinylFiles, function (err, imgs) {
      // Save images and callback
      that.imgs = imgs;
      done(err);
    });
  });
  after(function cleanupImages () {
    delete this.imgs;
  });
};

exports._createCanvas = function (engine, width, height) {
  before(function createCanvasFn (done) {
    // Create and save our canvas
    var that = this;
    engine.createCanvas(width, height, function saveCanvas (err, canvas) {
      that.canvas = canvas;
      done(err);
    });
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
    canvas['export'](exportParams, function saveExport (err, result) {
      that.result = result;
      done(err);
    });
  });
  after(function cleanupExport () {
    delete this.result;
  });
};

exports.renderCanvas = function (options) {
  exports._createCanvas(options.engine, options.width, options.height);
  exports._addImages(options.coordinateArr);
  exports._exportCanvas(options.exportParams);
};

exports.debugResult = function (filepath) {
  before(function writeDebugImage (done) {
    fs.writeFile(filepath || 'debug.png', this.result, 'binary', done);
  });
};

exports.loadActualPixels = function (encoding) {
  before(function loadActualPixelsFn (done) {
    // Convert the binary string into a buffer
    var actualImage = this.result;
    var actualImageBuffer = new Buffer(actualImage, 'binary');

    // Load the pixels, save, and callback
    var that = this;
    getPixels(actualImageBuffer, encoding, function saveActualPixels (err, pixels) {
      that.actualPixels = pixels.data;
      done(err);
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
