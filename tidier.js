var { tidy } = require('htmltidy2');
const path  = require('path');
const fs = require('fs');
const glob = require('glob');

var tidyOpts = {
	// Document Display Options
	quiet: true,

	// Document In and Out Options
	doctype: 'html5',
	outputHtml: true,

	// Cleanup Options
	dropEmptyElements: false,

	// Transformation Options
	hideComments: true,

	// Pretty Print Options
	breakBeforeBr: true,
	indent: true,
	indentSpaces: 4,
	tidyMark: false,
	wrap: 0
}

var getFiles = function (src, extension, callback) {
	glob(src + '/**/*.' + extension, callback);
};

getFiles('public', 'html', function (err, files) {
	files.forEach(file => {
		console.log(file);
		try {
			const messyHtml = fs.readFileSync(file, 'utf8');
			tidy(messyHtml, tidyOpts, function (error, tidyHtml) {
				fs.writeFileSync(file, tidyHtml);
			});
		} catch (err) {
			console.log(err);
		}
	});
});