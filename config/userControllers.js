var fetch = require('node-fetch');
const mongoDB_API_KEY = 'yjH4qEJR-Olag89IaUTXd06IpuVDZWx1';
const baseLink_users = 'https://api.mlab.com/api/1/databases/frantic-rust/collections/users?apiKey=';
const baseLink_pictures = 'https://api.mlab.com/api/1/databases/frantic-rust/collections/pictures?apiKey=';

var filterResults = (pictures_Array, username, pageName) => {
    // iterate over pictures to sort based on which page called this function
    // ex: SwipeView will return all pictures whose author is not the user
    // UserPage will return all pictures whose author is the user
    var results = [];
    var type;
    if (pictures_Array.length === 0) {
      return [];
    }
    if (pageName === 'UserPage') {
      type = 1;
    } else if (pageName === 'SwipeView') {
      type = 0;
    }

    pictures_Array.forEach(picture => {
      if (type) {
        if (picture.username === username) {
          results.push(picture);
        }
      } else {
        if (picture.username !== username) {
          results.push(picture);
        }
      }
    });
    console.log(results);
    return results;
  };
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
          'Content-Type': 'application/json'
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
      imagelink: req.body.imageLink,
      likes: req.body.likes || 0,
      dislikes: req.body.dislikes || 0
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

  getPhotos: (req, res, next) => {
    console.log(req.body);
    const username = req.body.username;
    const pageName = req.body.pagename;
    fetch(baseLink_pictures + mongoDB_API_KEY)
    .then((response) => response.json())
    .then((responseJSON) => {
      res.status(201).send(filterResults(responseJSON, username, pageName));
    })
    .catch((err) => {
      res.sendStatus(400);
    });
  },


  checkAuth: (req, res, next) => {
    //
  }
};
