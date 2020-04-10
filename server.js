const morgan = require("morgan");
const helmet = require("helmet");
const postRouter = require("./posts/postRouter");
const userRouter = require("./users/userRouter");
const express = require('express');
const validatePost = require("./users/userRouter.js")
const server = express();

server.use(logger);
server.use(helmet());
//server.use(morgan("dev"));
server.use(express.json());
server.use("/api/users", validatePost, userRouter)
server.use("/api/posts", postRouter); 

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} Request to ${req.originalUrl} `)
  next()
}

module.exports = server;
