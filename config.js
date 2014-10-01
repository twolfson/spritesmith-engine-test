// Load in dependencies
var path = require('path');

// Define and export common paths and sizes
var imageDir = path.join(__dirname, 'test_sprites');
module.exports = {
  imageDir: imageDir,
  singleImage: {
    width: 50,
    height: 50,
    filepaths: [path.join(__dirname, '/test_sprites/sprite1.png')]
  },


  // TODO: Continue defining these as altogether cases
  multipleImages: {
    filepaths: [
      path.join(imageDir, 'sprite1.png'),
      path.join(imageDir, 'sprite2.jpg'),
      path.join(imageDir, 'sprite3.png')
    ],
    expectedImage: path.join(__dirname, 'expected_files/multiple.png')
  },

  multiplePngImages: [
    path.join(imageDir, 'sprite1.png'),
    path.join(imageDir, 'sprite2.png'),
    path.join(imageDir, 'sprite3.png')
  ],

  repeatingImage: path.join(imageDir, '16.jpg'),
  repeatingPngImage: path.join(imageDir, '16.png'),

  largeImage: path.join(imageDir, '800.png')
};
