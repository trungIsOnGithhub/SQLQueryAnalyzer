const byPassCORS = (request, response, next) => {
    const headerToModify = {
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Credentials' : true,
      'Access-Control-Allow-Methods' : 'GET,HEAD,OPTIONS,POST,PUT',
      'Access-Control-Allow-Headers' : 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
    };
  
    response.set(headerToModify);
    // console.log("header modified");
    next();
};