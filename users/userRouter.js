const express = require('express');
const userDb = require("./userDb");
const router = express.Router();
const server = require("../server");
const postDb = require("../posts/postDb");

router.use(validateUser)

router.post('/', (req, res) => {
  userDb.insert(req.body)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(err => {
    res.status(404).send("error adding user")
  })
});

router.post('/:id/posts', (req, res) => {
  userDb.getById(req.params.id)
});

router.get('/', (req, res) => {
  userDb.get()
  .then(users => {
    res.status(200).json(users)
  })
  .catch(err => {
    res.status(404).send("error")
  })
});

router.get('/:id', (req, res) => {
  userDb.getById(req.params.id)
  .then(post => {
    res.status(200).json(post)
  })
  .catch(err => {
    res.status(400).send("error")
  })
});

router.get('/:id/posts', (req, res) => {
  postDb.getById(req.params.id)
  .then(post => {
    res.status(200).json(post)
  })
  .catch(err => {
    res.status(400).send("error")
  })
});

router.delete('/:id', (req, res) => {
  userDb.remove(req.params.id)
  .then(post => {
    res.status(200).json(post)
  })
  .catch(err => {
    res.status(400).send("error deleting")
  })
});

router.put('/:id', (req, res) => {
  userDb.update(req.params.id, req.body)
  .then(post => {
    res.status(200).json(post)
  })
  .catch(err => {
    res.status(400).send("error updating")
  })
});

//custom middleware

function validateUserId(req, res, next) {
const { id } = req.body;
console.log (req.body)
if ( id == userDb.getById(id)){
  next()
} else {
  res.status(400).json(`{ message: "invalid user id" }`)
}
}

function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({
      message: "missing user data" 
    })
  } else if (!req.body.name){
    res.status(400).json({
      message: "missing required name field"
    })
  } else {
    next()
  }
};

function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({
      message: "missing post data" 
    })
  } else if (!req.body.text) {
    res.status(400).json({
      message: "missing required text field"
    })
  } else {
    next()
  }
}

module.exports = router, validatePost;
