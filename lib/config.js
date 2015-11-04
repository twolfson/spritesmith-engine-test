// Load in dependencies
var path = require('path');
var extend = require('obj-extend');

// Define common base case items
exports.imageDir = path.join(__dirname, 'test_sprites');
exports._singleImage = {
  filepaths: null,
  width: 100,
  height: 200,
  coordinateArr: [
    {x: 0, y: 0}
  ]
};
exports.singlePngImage = extend({}, exports._singleImage, {
  filepaths: [path.join(__dirname, '/test_sprites/sprite3.png')],
  ext: 'png',
  type: 'image/png',
  threshold: 10
});
exports.singleJpgImage = extend({}, exports._singleImage, {
  filepaths: [path.join(__dirname, '/test_sprites/sprite3.jpg')],
  ext: 'jpg',
  type: 'image/jpeg',
  threshold: 100
});
exports.singleGifImage = extend({}, exports._singleImage, {
  filepaths: [path.join(__dirname, '/test_sprites/sprite3.gif')],
  ext: 'gif',
  type: 'image/gif',
  threshold: 20
});

// Define multiple images test case
exports.multiplePngImages = {
  expectedImage: path.join(__dirname, 'expected_files/multiple.png'),
  filepaths: [
    path.join(exports.imageDir, 'sprite1.png'),
    path.join(exports.imageDir, 'sprite2.png'),
    path.join(exports.imageDir, 'sprite3.png')
  ],
  width: 100,
  height: 300,
  coordinateArr: [
    {x: 0, y: 0},
    {x: 0, y: 50},
    {x: 0, y: 100}
  ],
  ext: 'png',
  type: 'image/png',
  threshold: 10
};

// Define many images test case info
var manyPngImageFilepath = path.join(exports.imageDir, '16.png');
var manyPngImageFilepaths = [];
var manyPngCoordinateArr = [];
var i = 0;
var len = 500;
for (; i < len; i++) {
  manyPngImageFilepaths.push(manyPngImageFilepath);
  manyPngCoordinateArr.push({
    x: 0,
    y: i * 16
  });
}
exports.manyPngImages = {
  filepaths: manyPngImageFilepaths,
  width: 16,
  height: 16 * len,
  coordinateArr: manyPngCoordinateArr
};

// Define large image test case
exports.largePngImage = {
  filepaths: [path.join(exports.imageDir, '800.png')],
  width: 800,
  height: 600
};
