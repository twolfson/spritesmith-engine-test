var path = require('path'),
    imageDir = path.join(__dirname, 'test_sprites');
module.exports = {
  imageDir: imageDir,
  singleImage: __dirname + '/test_sprites/sprite1.png',

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

  repeatingImage: path.join(imageDir, '16.jpg'),
  repeatingPngImage: path.join(imageDir, '16.png'),

  largeImage: path.join(imageDir, '800.png')
};