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
  'does not crash': function () {
    // Would have thrown
  },
  'returns an image': function () {
    expect(this.result).to.not.equal('');
  }
};
