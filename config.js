// Load in dependencies
var path = require('path');

// Define and export common paths and sizes
exports.imageDir = path.join(__dirname, 'test_sprites');
exports.singleImage = {
  width: 50,
  height: 50,
  filepaths: [path.join(__dirname, '/test_sprites/sprite1.png')]
};
exports.multipleImages = {
  filepaths: [
    path.join(imageDir, 'sprite1.png'),
    path.join(imageDir, 'sprite2.jpg'),
    path.join(imageDir, 'sprite3.png')
  ],
  expectedImage: path.join(__dirname, 'expected_files/multiple.png')
};

exports.multiplePngImages = [
  path.join(imageDir, 'sprite1.png'),
  path.join(imageDir, 'sprite2.png'),
  path.join(imageDir, 'sprite3.png')
];

exports.repeatingImage = path.join(imageDir, '16.jpg');
exports.repeatingPngImage = path.join(imageDir, '16.png');

exports.largeImage = path.join(imageDir, '800.png');
