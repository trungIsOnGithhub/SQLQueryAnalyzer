const queryController = require('../query.js');

function setup(app) {
	app.post('/execute', queryController.execute);
	app.post('/explain', queryController.explain);
}

module.exports = { setup }