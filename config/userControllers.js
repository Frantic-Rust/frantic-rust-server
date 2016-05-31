var fetch = require('node-fetch');
const mongoDB_API_KEY = 'yjH4qEJR-Olag89IaUTXd06IpuVDZWx1';
const baseLink_users = 'https://api.mlab.com/api/1/databases/frantic-rust/collections/users?apiKey=';
const baseLink_pictures = 'https://api.mlab.com/api/1/databases/frantic-rust/collections/pictures?apiKey=';

module.exports = {
  // code: 200 = good login, 400 = bad login 
  signin: (req, res, next) => {
    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;
    fetch(baseLink_users + mongoDB_API_KEY)
      .then((response) => response.json())
        .then((responseData) => {
          var flag = false;
          for (var i = 0; i < responseData.length; i++) {
            if (responseData[i].username === username && responseData[i].password === password) {
              flag = true;
              break;
            }
          }
          if (flag) {
            res.sendStatus(200);
          } else {
            res.sendStatus(400);
          }
        });
          //.then(() => res.sendStatus(400));
    },

  signup: (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const obj = {
      username: username,
      password: password
    };
    fetch(baseLink_users + mongoDB_API_KEY,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
      })
    .then( err => {
      if (err.status === 200) {
        res.sendStatus(201);
      } else {
        res.sendStatus(400);
      }
    });
  },

  uploadPhoto: (req, res, next) => {

    const obj = {
      username: req.body.username,
      comment: req.body.comment,
      file: req.body.filename,
      likes: 0,
      dislikes: 0
    };

    fetch(baseLink_pictures + mongoDB_API_KEY,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
      })
      .then( err => {
        if (err.status === 200) {
          res.sendStatus(201);
        } else {
          res.sendStatus(400);
        }
      });
  },

  checkAuth: (req, res, next) => {}
};