// Load in dependencies
var path = require('path');
var extend = require('obj-extend');

// Define common base case items
exports.imageDir = path.join(__dirname, 'test_sprites');
exports.singleImage = {
  filepaths: [path.join(__dirname, '/test_sprites/sprite1.png')],
  width: 50,
  height: 50
};

// Define multiple images test case
exports.multipleImages = {
  filepaths: [
    path.join(exports.imageDir, 'sprite1.png'),
    path.join(exports.imageDir, 'sprite2.jpg'),
    path.join(exports.imageDir, 'sprite3.png')
  ],
  width: 100,
  height: 300,
  coordinateArr: [
    {x: 0, y: 0},
    {x: 0, y: 50},
    {x: 0, y: 100}
  ],
  expectedImage: path.join(__dirname, 'expected_files/multiple.png')
};
exports.multiplePngImages = extend({}, exports.multipleImages, {
  filepaths: [
    path.join(exports.imageDir, 'sprite1.png'),
    path.join(exports.imageDir, 'sprite2.png'),
    path.join(exports.imageDir, 'sprite3.png')
  ]
});

// Define repeating image test case info
var repeatingImageFilepath = path.join(exports.imageDir, '16.jpg');
var repeatingPngImageFilepath = path.join(exports.imageDir, '16.png');
var repeatingImageFilepaths = [];
var repeatingPngImageFilepaths = [];
var repeatingCoordinateArr = [];
var i = 0;
var len = 500;
for (; i < len; i++) {
  repeatingImageFilepaths.push(repeatingImageFilepath);
  repeatingPngImageFilepaths.push(repeatingPngImageFilepaths);
  repeatingCoordinateArr.push({
    x: 0,
    y: i * 16
  });
}
exports.repeatingImages = {
  filepaths: repeatingImageFilepaths,
  width: 16,
  height: 16 * len,
  coordinateArr: repeatingCoordinateArr
};
exports.repeatingPngImages = extend({}, exports.repeatingImages, {
  filepaths: repeatingPngImageFilepaths
});

// Define large image test case
exports.largeImage = {
  filepaths: [path.join(exports.imageDir, '800.png')],
  width: 800,
  height: 600
};
