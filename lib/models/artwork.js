'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Artwork Schema
 */
var ArtworkSchema = new Schema({
  path: String,
  title: String,
  comment: String,
  created: Date
});

// Validate empty path
ArtworkSchema
  .path('path')
  .validate(function(path) {
    return path.length;
  }, 'Path cannot be blank');

module.exports = mongoose.model('Artwork', ArtworkSchema);
