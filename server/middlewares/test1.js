module.exports = {
  test1 : function(request,response,next) {
    if(request.body.test === '1')
      response.status(200).send('heo');
    else {
      response.status(200).send('@W@');
    }
  }
}
