const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');


// const fileUpload = require('express-fileupload');
const app = express();

//db
const db = require('./dbconfig/configDb');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));

app.use(passport.initialize());
app.use(passport.session());


const registerRouter = require("./router/register");
const signInRouter = require("./router/signin");
const commentRouter = require("./router/comment");
const studentRouter = require("./router/student");
const subjectRouter = require("./router/subject");
const resultRouter = require("./router/result");
const scoreRouter = require("./router/score");

// const branchRouter = require("./router/branch")

const port = process.env.PORT || 3000;

//create endpoints for sql db
//comments, results, students, subjests, scores
app.use('/api/v1/signin', signInRouter);
app.use('/api/v1/register', registerRouter);
// app.use('/api/v1/comments', commentRouter);
// app.use('/api/v1/scores', resultRouter);
// app.use('/api/v1/students', studentRouter);
// app.use('/api/v1/subjects', subjectRouter);
app.use('/api/v1/scores', scoreRouter);



app.listen(port, () => console.log(`listening on port: ${port}`));

module.exports = app;