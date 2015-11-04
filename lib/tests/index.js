// Define our tests
exports.interpretImage = function (params, config) {
  describe(params.engineName, function () {
    describe('interpretting an image file', function () {
      var singleImage = config.singleImage;
      spritesmithUtils.interpretImages(engine, singleImage.filepaths);

      it('gathers statistics on an image file', function () {
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

exports.renderCanvas = function (params, config) {
  describe(params.engineName, function () {
    describe('parsing multiple images', function () {
      var multipleImages = config.multipleImages;
      spritesmithUtils.interpretImages(engine, multipleImages.filepaths);

      describe('rendering them into a canvas', function () {
        // Render the canvas into a binary image string
        spritesmithUtils.renderCanvas({
          engine: engine,
          width: multipleImages.width,
          height: multipleImages.height,
          coordinateArr: multipleImages.coordinateArr,
          exportParams: {
            format: 'png'
          }
        });

        // Allow for debugging
        if (process.env.TEST_DEBUG) {
          spritesmithUtils.debugResult('renderCanvas');
        }

        // Load pixels for comparison
        spritesmithUtils.loadActualPixels('image/png');
        spritesmithUtils.loadExpectedPixels(multipleImages.expectedImage, 'image/png');

        it('can output an image', function () {
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
            var pixelsWithinThreshold = Math.abs(expectedPixels[i] - actualPixels[i]) <= 10;
            expect(pixelsWithinThreshold).to.equal(true,
              'Expected ' + expectedPixels[i] + ' and ' + actualPixels[i] + ' to be at most 10 apart. Index was ' + i);
          }
        });
      });
    });
  });
};

exports.interpretManyImages = function (params, config) {
  describe(params.engineName, function () {
    describe('interpretting a ridiculous amount of images', function () {
      // Interpret an array of 500 images
      var repeatingImages = config.repeatingImages;
      spritesmithUtils.interpretImages(engine, repeatingImages.filepaths);

      describe('rendering them into a canvas', function () {
        spritesmithUtils.renderCanvas({
          engine: engine,
          width: repeatingImages.width,
          height: repeatingImages.height,
          coordinateArr: repeatingImages.coordinateArr,
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
exports.interpretLargeImage = function (params, config) {
  describe(params.engineName, function () {
    describe('interpretting a large image', function () {
      var largeImage = config.largeImage;
      spritesmithUtils.interpretImages(engine, largeImage.filepaths);

      it('gathers proper image size', function () {
        var img = this.imgs[0];
        expect(img).to.have.property('width', largeImage.width);
        expect(img).to.have.property('height', largeImage.height);
      });
    });
  });
};
