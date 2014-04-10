'use strict';

var should = require('should'),
    Artwork = require('../../../lib/models/artwork')

var artwork;

describe('Artwork model', function() {
  before(function(done) {
    artwork = new Artwork({
      path: './public/images/magritte.png',
      title: 'La Trahison des images',
      comment: "Ceci n'est pas une pipe",
      created: new Date(0)
    });

    // Clear artwork before testing
    Artwork.remove().exec();
    done();
  });

  afterEach(function(done) {
    Artwork.remove().exec();
    done();
  });

  it('should begin with no artwork', function(done) {
    Artwork.find({}, function(err, artworks) {
      artworks.should.have.length(0);
      done();
    });
  });

  it('should fail when saving an empty path', function(done) {
    artwork.path = '';
    artwork.save(function(err) {
      should.exist(err);
      done();
    });
  });
});
