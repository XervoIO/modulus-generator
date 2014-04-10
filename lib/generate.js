var path    = require('path');
var util    = require('util');
var Zip     = require('adm-zip');
var fs      = require('fs');

//
// Templates are in the form of username/repository which is directly used along
//    with this URL to download the master zip.
//
const HOST_FORMAT = 'https://github.com/%s/archive/master.zip';

//
// Download the template then extract the source to the specified location.
//
module.exports = function (http, template, out, fn) {
  var archive = 'generator-temp.zip';
  var req = http.get(util.format(HOST_FORMAT, template));

  req.pipe(fs.createWriteStream(archive));

  req.on('end', function () {
    var dest = path.normalize(out);
    var zip = new Zip(archive);
    var dir;

    // Unzip the downloaded archive. Overwrite the result.
    zip.extractAllTo(path.dirname(dest), true);

    fs.unlink(archive);
    dir = template.split('/')[1];

    //
    // Rename the new, unzipped directory to what the user asked for.
    // The zip from the master branch is always named "repository-master".
    //
    fs.rename(
      path.resolve(path.dirname(dest), dir + '-master'),
      path.resolve(path.dirname(dest), out),
      function (err) {
        if (err) {
          return fn(err);
        }

        fn(null, path.resolve(out));
      }
    );
  });
};
