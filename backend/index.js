let express = require('express');
let app = express();
let dotenv = require('dotenv').config();
let userRouter = require('./API/routes/users');
let profilRouter = require('./API/routes/profil');
let searchRouter = require('./API/routes/search');
let friendRouter = require('./API/routes/friends');
let messageRouter = require('./API/routes/message');
let session = require('express-session');
var cors = require('cors');

app.use(cors())
app.use(session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* ROUTES */
// app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/profil', profilRouter);
app.use('/search', searchRouter);
app.use('/friend', friendRouter);
app.use('/message', messageRouter);


app.listen(process.env.PORT, () => console.log('Server is Up on the port ' + process.env.PORT));
