module.exports = {
  poster : require('./post/databaseAPI_Post.js'),
  posterUserLinks : require('./user&post/databaseAPI_User&Post.js'),
  user : require('./user/databaseAPI_User.js'),
  profile : require('./profile/databaseAPI_Profile.js'),
  userProfileLinks : require('./user&profile/databaseAPI_User&Profile.js'),
  answers : require('./user&profile/databaseAPI_answer.js'),
  answersPostLinks : require('./answer&post/databaseAPI_answer&post.js')
}
