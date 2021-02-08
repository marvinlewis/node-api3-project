const express = require("express");
const userDb = require("./userDb");
const router = express.Router();
const server = require("../server");



router.post("/", (req, res) => {
  userDb
    .insert(req.body)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(404).send("error adding user");
    });
});

router.post("/:id/posts", (req, res) => {
  userDb.getById(req.params.id);
});

router.get("/",  (req, res) => {
  userDb
    .get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(404).send("error");
    });
});

router.get("/:id", validateUserId, (req, res) => {
  console.log(req.body)
  userDb
    .getById(req.params.id)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(400).send("error");
    });
});

router.get("/:id/posts", validateUserId, (req, res) => {
  userDb
    .getUserPosts(req.params.id)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(400).send("error");
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  userDb
    .remove(req.params.id)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(400).send("error deleting");
    });
});

router.put("/:id", validateUserId, (req, res) => {
  userDb
    .update(req.params.id, req.body)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(400).send("error updating");
    });
});

//custom middleware

function validateUserId (req, res, next) {
  const id = req.params.id;
  userDb
    .getById(id)
    .then((post) => {
      if (id == post.id) {
        next();
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "invalid user id" });
    });
  }

function validateUser (req, res, next) {
  if (!req.body) {
    res.status(400).json({
      message: "missing user data",
    });
  } else if (!req.body.name) {
    res.status(400).json({
      message: "missing required name field",
    });
  } else {
    next();
  }
}



(module.exports = router);
