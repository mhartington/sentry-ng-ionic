var fs = require("fs"),
  path = require("path"),
  sourceMap = require("source-map");

// file output by Webpack, Uglify, and so forth
var GENERATED_FILE = path.join(".", "www", "tab1-tab1-module.js.map");

// line and column located in your generated file (for example, the source of your error
// from your minified file)
var GENERATED_LINE_AND_COLUMN = { line: 135, column: 5 };

var rawSourceMap = fs.readFileSync(GENERATED_FILE).toString();
new sourceMap.SourceMapConsumer(rawSourceMap).then(function (smc) {
  var pos = smc.originalPositionFor(GENERATED_LINE_AND_COLUMN);

  // should see something like:
  // { source: 'original.js', line: 57, column: 9, name: 'myfunc' }
  console.log(pos);
});
