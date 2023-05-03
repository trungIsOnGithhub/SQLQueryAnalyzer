const queryHandleModule = require('../query.js');

function setUpRouter(app) {
	app.post('/exec', queryHandleModule.execQueryRequestPOST);
	app.post('/explain',queryHandleModule.execExplainForQuery);
}

module.exports = {
	setUpRouter
}