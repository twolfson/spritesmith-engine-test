module.exports = [{
  'interpretting an image file': [
    'gathers statistics on an image file'
  ]
}, {
  'parsing multiple images': [{
    'rendering them into a canvas': [
      'can output an image'
    ]
  }],
}, {
  'interpretting a ridiculous amount of images': [{
    'rendering them into a canvas': [
      'does not crash',
      'returns an image'
    ]
  }],
}, {
  // DEV: This is testing an edge case of phantomjssmith
  'interpretting a large image': [
    'gathers proper image size'
  ]
}];