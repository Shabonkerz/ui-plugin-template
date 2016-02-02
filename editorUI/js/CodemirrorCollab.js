import angular from 'angular';


let module = angular.module('CodemirrorCollab', [
  'ui.codemirror'
]);

module.directive('codemirrorCollab', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/codemirrorCollab.html',
    scope: {},
    link: function(scope, elem, attrs) {
    },
    controller: function($scope) {
      $scope.editorContents = '// the contents\nvar x = function(){\n  console.log(arguments)\n}\n';

      // debugger

      $scope.editorOptions = {
        // lineWrapping : true,
        lineNumbers: true,
        // theme: 'twilight',
        // readOnly: 'nocursor',
        mode: 'javascript'
      };

      $scope.codemirrorLoaded = function(_editor){
        // Editor part
        var _doc = _editor.getDoc();
        _editor.focus();

        // Options
        _editor.setOption('firstLineNumber', 10);
        _doc.markClean();

        // Events
        _editor.on('beforeChange', function(){
          console.log('beforeChange', arguments);
        });
        _editor.on('change', function(){
          console.log('change', arguments);
        });
      };
    }
  };
});
