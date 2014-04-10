'use strict';

var mongoose = require('mongoose'),
    Artwork = mongoose.model('Artwork');

// exports.create = function(req, res) {
//   var artwork = new Artwork(req.body);
//   return artwork.save(function(error, artwork) {
//     if (error || !artwork) {
//       res.json({ error : error });
//     } else {
//       res.json({ artwork : artwork });
//     }
//   });
// };

exports.list = function(req, res) {
  return Artwork.find(function (err, artworks) {
    if (!err) {
      res.json(artworks);
    } else {
      res.send(err);
    }
  });
};

exports.get = function(req, res) {
  return Artwork.findOne({ _id : req.params.id }, function(error, artwork) {
    if (error || !artwork) {
      res.json({ error : error });
    } else {
      res.json({ artwork : artwork });
    }
  });
};

exports.delete = function(req, res) {
  return Artwork.findOne({ _id : req.params.id }, function(error, artwork) {
    if (error || !artwork) {
      return res.json({ error : error });
    } else {
      artwork.remove(function(error) {
        if (error) {
          res.json({ error : error });
        } else {
          res.json({});
        }
      });
    }
  });
};

