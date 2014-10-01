// Load in dependencies
var fs = require('fs');
var path = require('path');
var async = require('async');
var expect = require('chai').expect;
var getPixels = require('get-pixels');
var config = require('./config');

// Localize `imageDir` for reuse
var imageDir = config.imageDir;

module.exports = {
  // TODO: Combine this with first assertion
  'interpretting a large image': function (done) {
    // Save expected stats for later
    this.width = 800;
    this.height = 600;

    // Create an image and save it for later
    var filepath = config.largeImage,
        that = this;
    this.smith.createImages([filepath], function (err, imgs) {
      // Fallback images, save image, and callback
      imgs = imgs || [];
      that.img = imgs[0];
      done(err);
    });
  },
  // TODO: Combine this with first assertion
  'gathers proper image size': function () {
    expect(this.img).to.have.property('height', this.height);
    expect(this.img).to.have.property('width', this.width);
  },
  'can output an image':  function (done) {
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
  },
  'does not crash': function () {
    // Would have thrown
  },
  'returns an image': function () {
    expect(this.result).to.not.equal('');
  }
};
