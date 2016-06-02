var controller = require('./userControllers.js');

module.exports = function (app, express) {

  app.post('/signup', controller.signup);
  app.post('/signin', controller.signin);
  app.post('/upload', controller.uploadPhoto);
  app.post('/getPhotos', controller.getPhotos);
  //app.post('/user/camera', );
};
  // app.post('/user/login', );

  // app.get('/user/feed', console.log('hello'));
  // app.post('/user/feed', );

  // app.get('/user/settings', );
  // app.post('/user/settings', );

  // app.get('/user/camera', );
  // app.post('/user/camera', );


  // app.use(); //add error handler if routes above not specified
  