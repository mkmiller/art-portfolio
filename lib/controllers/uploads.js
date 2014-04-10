'use strict';

var mongoose = require('mongoose'),
    Artwork = mongoose.model('Artwork'),
    fs = require('fs'),
    gm = require('gm');

/**
 *  Copy uploaded files to public folder
 *  and create new artwork model
 */
exports.upload = function (req, res, next) {
    var file = req.files.file,
        tmp = file.path,
        sub = 'images/' + file.name,
        target = './public/' + sub;

    gm(tmp)
        .resize(768, 576) // this also on client side
        .background('#FFFF') // transparent white
        .compose('Copy')
        .gravity('Center')
        .extent(768, 576)
        .noProfile()
        .write(target, function (err) {
            if (err) throw err;

            var artwork = new Artwork();
            artwork.path = sub;
            artwork.title = req.body.title;
            artwork.comment = req.body.comment;
            artwork.created = new Date();
            artwork.save();
            fs.unlink(tmp, function(err) {
                if (err) throw err;
                res.send('file uploaded');
                //res.send('file uploaded to ' + target + ' - ' + file.size + 'bytes');
            });
        });
};
