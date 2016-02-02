import angular from 'angular';

// codemirror doesnt play nice with our concoction of importers, use old require syntax
let CodeMirror = require('codemirror');
import 'codemirror/mode/javascript/javascript';

window.CodeMirror = CodeMirror;

import './js/CodemirrorCollab';
