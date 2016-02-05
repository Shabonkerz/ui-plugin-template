import angular from 'angular';


let module = angular.module('CodemirrorCollab', [
	'ui.codemirror'
]);

var socket = io.connect(window.location.origin);
var cursors = {};

socket.on('news', function (data) {
	console.log(data);
	socket.emit('my other event', {
		my: 'data'
	});
});
socket.on('cursor.move', function (id, cursor) {
	console.log(arguments);

	// Cursor already exists. Update position.
	if (cursors[id])
	{
		var node = cursors[id];

		// Get coords from line and character position.
		var coords = editor.doc.cm.charCoords(cursor, 'local');

		node.style.left = coords.left + "px";
		node.style.top = coords.top + "px";
	}
	// Cursor does not exist. Add new widget.
	else {

		var node = document.createElement('div');
		node.innerHTML = '';
		node.classList.add('my-widget');

		editor.addWidget(cursor, node, true);

		cursors[id] = node;
	}
});

var editor;

module.directive('codemirrorCollab', function () {
	return {
		restrict: 'E',
		templateUrl: 'templates/codemirrorCollab.html',
		scope: {},
		link: function (scope, elem, attrs) {},
		controller: function ($scope) {
			$scope.editorContents = '// the contents\nvar x = function(){\n  console.log(arguments)\n}\n';

			// debugger

			$scope.editorOptions = {
				// lineWrapping : true,
				lineNumbers: true,
				// theme: 'twilight',
				// readOnly: 'nocursor',
				mode: 'javascript'
			};

			$scope.codemirrorLoaded = function (_editor) {
				editor = _editor;
				// Editor part
				var _doc = editor.getDoc();
				editor.focus();

				// Options
				editor.setOption('firstLineNumber', 10);
				_doc.markClean();

				// Events
				editor.on('beforeChange', function () {
					console.log('beforeChange', arguments);
				});
				editor.on('change', function () {
					console.log('change', arguments);
				});
				editor.on('cursorActivity', (codemirror) => {

					socket.emit('cursor.move', codemirror.doc.getCursor());
				});

			};
		}
	};
});
