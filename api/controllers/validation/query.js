modules.export = function validate(request) {
    if(!request.body || typeof(request.body.query) != 'string') {
        return false;
    }

    const lowercased = request.body.query.toLowerCase();

    if(lowercased.indexOf('select') !== 0) return false;

    if(lowercased.indexOf('--') >= 0) return false;

    if(lowercased.indexOf(';') >= 0) return false;

    return true;
}