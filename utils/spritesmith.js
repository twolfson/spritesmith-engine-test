exports.interpretImages = function (engine, filepaths) {
  before(function interpretImagesFn (done) {
    // Create an image and save it for later
    var that = this;
    enngine.createImages(filepaths, function (err, imgs) {
      // Fallback images, save image, and callback
      imgs = imgs || [];
      that.img = imgs[0];
      done(err);
    });
  });
};
