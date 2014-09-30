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
    assert.strictEqual(imgs.length, coordinatesArr.length, 'Expected: ' + imgs.length + ' === ' + coordinatesArr.length +
      '. `imgs.length` to equal `coordinatesArr.length` for `spritesmithUtils._addImages`');

    // Add the images based on an array mapping
    imgs.forEach(function (img, i) {
      var coordinates = coordinatesArr[i];
      canvas.addImage(img, coordinates.x, coordinates.y);
    });
  });
};
