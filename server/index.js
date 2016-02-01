var express = require('express');

var routes = require('./routes');


var PORT = 8080;


var main = function() {
  var app = express();

  routes.addRoutes(app);

  app.listen(PORT, function(err) {
    if (err) {
     console.log(err);
    } else {
     console.log('App started on port', PORT);
    }
  });
};

if (require.main === module) {
  main();
}
