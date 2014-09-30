// Load in dependencies
var assert = require('assert');

// Define our utility functions
exports.interpretImages = function (engine, filepaths) {
  before(function interpretImagesFn (done) {
    // Create an image and save it for later
    var that = this;
    engine.createImages(filepaths, function (err, imgs) {
      // Save images and callback
      that.imgs = imgs;
      done(err);
    });
  });
  after(function cleanupImages () {
    delete this.imgs;
  });
};

exports._createCanvas = function (width, height) {
  before(function createCanvasFn (done) {
    // Create and save our canvas
    var that = this;
    smith.createCanvas(that.width, that.height, function saveCanvas (err, canvas) {
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
    canvas['export']({format: 'png'}, function saveExport (err, result) {
      that.result = result;
      done(err);
    });
  });
  after(function cleanupExport () {
    delete this.result;
  });
};

exports.renderCanvas = function (options) {
  exports._createCanvas(options.width, options.height);
  exports._addImages(options.coordinateArr);
  exports._addImages(options.exportParams);
};
