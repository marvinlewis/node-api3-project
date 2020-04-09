const express = require('express');
const validatePost = require("../users/userRouter.js")
const postDb = require("./postDb");
const router = express.Router();



router.use(validatePost)

router.get('/', (req, res) => {
  postDb.get()
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(err => {
    res.status(404).json({
      error : "no data"
    })
  })

});

router.get('/:id', (req, res) => {
  postDb.getById(req.params.id)
  .then(post => {
    res.status(200).json(post)
  })
  .catch(err => {
    res.status(404).json({
      error : "error"
    })
  })
});

router.delete('/:id', (req, res) => {
  postDb.remove(req.params.id)
  .then(item => {
    res.status(200).json(item)
  })
  .catch(err => {
    res.status(404).send("no luck deleting")
  })
});

router.put('/:id', (req, res) => {
  postDb.update(req.params.id, req.body)
  .then(post => {
    res.status(200).json(post)
  })
  .catch(err => {
    res.status(404).send("no luck updating records")
  })
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
