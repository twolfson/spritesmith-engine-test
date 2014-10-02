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
    path.join(exports.imageDir, 'sprite1.png'),
    path.join(exports.imageDir, 'sprite2.jpg'),
    path.join(exports.imageDir, 'sprite3.png')
  ],
  expectedImage: path.join(__dirname, 'expected_files/multiple.png')
};
exports.multiplePngImages = [
  path.join(exports.imageDir, 'sprite1.png'),
  path.join(exports.imageDir, 'sprite2.png'),
  path.join(exports.imageDir, 'sprite3.png')
];

exports.repeatingImage = path.join(exports.imageDir, '16.jpg');
exports.repeatingPngImage = path.join(exports.imageDir, '16.png');

exports.largeImage = path.join(exports.imageDir, '800.png');
