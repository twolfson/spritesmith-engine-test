// Load in dependencies
var path = require('path');

// Define and export common paths
var imageDir = path.join(__dirname, 'test_sprites');
module.exports = {
  imageDir: imageDir,
  singleImage: path.join(__dirname, '/test_sprites/sprite1.png'),

  multipleImages: [
    path.join(imageDir, 'sprite1.png'),
    path.join(imageDir, 'sprite2.jpg'),
    path.join(imageDir, 'sprite3.png')
  ],
  multiplePngImages: [
    path.join(imageDir, 'sprite1.png'),
    path.join(imageDir, 'sprite2.png'),
    path.join(imageDir, 'sprite3.png')
  ],
  expectedMultipleImage: path.join(__dirname, 'expected_files/multiple.png'),

  repeatingImage: path.join(imageDir, '16.jpg'),
  repeatingPngImage: path.join(imageDir, '16.png'),

  largeImage: path.join(imageDir, '800.png')
};
