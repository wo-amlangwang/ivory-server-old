module.exports = {
  checkEmail : require('./checkEmail.js').checkEmail,
  insertNewUserIntoDb : require('./insertNewUserIntoDb.js').insertNewUserIntoDb,
  makeToken : require('./makeToken.js').makeToken,
  authentication : require('./authentication.js').authentication,
  checkToken : require('./checkToken.js').checkToken,
  findOrInsertProfile : require('./findOrInsertProfile.js').findOrInsertProfile,
  postNewPost : require('./postNewPost.js').postNewPost,
  updateOrInsertProfile : require('./updateOrInsertProfile.js').updateOrInsertProfile,
  getAllPost : require('./getAllPost.js').getAllPost
}
