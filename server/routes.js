var path = require('path');

var express = require('express');


module.exports.addRoutes = function(app) {
  var buildFolder = path.resolve(__dirname, '..', 'build', 'editorUI');
  console.log('Static files from:', buildFolder);

  app.use(express.static(buildFolder));
};
