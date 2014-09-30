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

exports._addImages = function () {
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
