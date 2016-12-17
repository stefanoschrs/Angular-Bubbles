module.exports = {
	entry: [
		`${__dirname}/src/polyfills.js`,
		`${__dirname}/src/main.js`
	],
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'babel',
			query: {
				presets: ['es2015', 'stage-0'],
				plugins: ['transform-decorators-legacy']
			}
		}]
	},
	output: {
		path: `${__dirname}/build`,
		filename: 'bundle.js'
	}
};
