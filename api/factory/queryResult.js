const returnFormat = {
	errorExplain: false,
	errorQuery: false,
	errorLog: false
};

const create = function(...valueInit) {
	const queryResultObject = Object.create(returnFormat); // prototyping

	valueInit.forEach( (value, index) => {
		if(!option && typeof option === "boolean") {	
			if(index === 0) { queryResultObject.errorExplain = value; }
			else if(index === 1) { queryResultObject.errorQuery = value; }
			else if(index === 2) { queryResultObject.errorLog = value; }
		}
	});

	return queryResultObject;
}

module.exports = {
	create
}