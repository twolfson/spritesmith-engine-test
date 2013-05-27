var fs = require('fs'),
    path = require('path'),
    async = require('async'),
    expect = require('chai').expect,
    imageDir = path.join(__dirname, 'test_sprites');
module.exports = {
  'interpretting an image file': function (done) {
    // Create an image and save it for later
    var filepath = __dirname + '/test_sprites/sprite1.png',
        that = this;
    this.smith.createImages([filepath], function (err, imgs) {
      // Fallback images, save image, and callback
      imgs = imgs || [];
      that.img = imgs[0];
      done(err);
    });
  },
  'gathers statistics on an image file':  function () {
    expect(this.img).to.have.property('height', 50);
    expect(this.img).to.have.property('width', 50);
  },
  'parsing multiple images': function () {
    this.images = [
      path.join(imageDir, 'sprite1.png'),
      path.join(imageDir, 'sprite2.jpg'),
      path.join(imageDir, 'sprite3.png')
    ];
    this.width = 100;
    this.height = 300;
    this.coordinateArr = [{
        "x": 0,
        "y": 0
    }, {
        "x": 0,
        "y": 50
    }, {
        "x": 0,
        "y": 100
    }];
  },
  'interpretting a ridiculous amount of images': function () {
    // Create and save an array of 500 images
    var images = [],
        coordinateArr = [],
        imagePath = path.join(imageDir, '16.jpg'),
        i = 0,
        len = 500;
    for (; i < len; i++) {
      images.push(imagePath);
      coordinateArr.push({
        x: 0,
        y: i * 16
      });
    }
    this.images = images;
    this.width = 16;
    this.height = 16 * 500;
    this.coordinateArr = coordinateArr;
  },
  // TODO: Combine this with first assertion
  'interpretting a large image': function (done) {
    // Save expected stats for later
    this.width = 800;
    this.height = 600;

    // Create an image and save it for later
    var filepath = __dirname + '/test_sprites/800.png',
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
  // TODO: Totally can flatten this out with doubleshot ;)
  'rendering them into a canvas': function (done) {
    var that = this,
        smith = this.smith;
    smith.createImages(this.images, function handleImages (err, imgs) {
      // If there is an error, callback with it
      if (err) { return done(err); }

      // Otherwise, draw them onto a canvas
      smith.createCanvas(that.width, that.height, function (err, canvas) {
        // If there is an error, callback with it
        if (err) { return done(err); }

        // Add each image
        var coordinatesArr = that.coordinateArr;
        imgs.forEach(function (img, i) {
          var coordinates = coordinatesArr[i];
          canvas.addImage(img, coordinates.x, coordinates.y);
        }, canvas);

        // Export canvas
        canvas['export']({format: 'png'}, function (err, result) {
          that.result = result;
          done(err);
        });
      });
    });
  },
  'can output an image':  function () {
    // Assert the actual image is the same expected
    var actualImage = this.result,
        matchesAnImage = false;

    // ANTI-PATTERN: Looping over set without identifiable lines for stack traces
    this.expectedFilepaths.forEach(function testAgainstExpected (filepath) {
      if (!matchesAnImage) {
        var expectedImage = fs.readFileSync(filepath, 'binary');
        matchesAnImage = actualImage === expectedImage;
      }
    });

    expect(matchesAnImage).to.equal(true);
  },
  'does not crash': function () {
    // Would have thrown
  },
  'returns an image': function () {
    expect(this.result).to.not.equal('');
  }
};