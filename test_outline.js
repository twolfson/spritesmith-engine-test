module.exports = {
  'interpretting an image file': {
    'gathers statistics on an image file': true
  },
  'parsing multiple images': {
    'rendering them into a canvas': {
      'can output an image': true
    }
  },
  'interpretting a ridiculous amount of images': {
    'rendering them into a canvas': {
      'does not crash': true,
      'returns an image': true
    }
  },
  // DEV: This is testing an edge case of phantomjssmith
  'interpretting a large image': {
    'gathers proper image size': true
  }
};