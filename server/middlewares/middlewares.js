module.exports = {
  checkEmail : require('./checkEmail.js').checkEmail,
  insertNewUserIntoDb : require('./insertNewUserIntoDb.js').insertNewUserIntoDb,
  makeToken : require('./makeToken.js').makeToken,
  authentication : require('./authentication.js').authentication,
  checkToken : require('./checkToken.js').checkToken
}
