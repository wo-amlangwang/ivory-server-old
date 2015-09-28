module.export = function(io, user, mongoose, app) {
  user.on('connection',function(socket) {
    // body...
  });
}
