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
var server = require('http').Server(app);
const io = require('socket.io')(server);  
const conversationModel = require('./API/models/message');

// io.on('connection', (socket) => {
//     socket.on('chatMessage', (data) => {
//         let message = {
//             message: data.msg,
//         }
//         socket.broadcast.emit('chatMessage', data.msg);
//     })
// })

io.on('connection', (socket) => {
    socket.broadcast.emit('user Connected');
    socket.on('channel', (channelID) => {
        console.log('enter: ', channelID);
        socket.join(channelID);
    })
    socket.on('chatMessage', (data) => {
        console.log(data.msg[0].user);
        let message = {
            message: data.msg[0].text,
            user: data.msg[0].user._id,
            date: data.msg[0].createdAt
        }

        conversationModel.findOneAndUpdate({_id: data.channelID}, {$push: {message}}, {new: true}, (err, data) => {
            if (err) console.error(err)
        });
        console.log('message: ', data.msg);
        io.in(data.channelID).emit('chatMessage', data.msg)
    })
})

app.use(cors())
app.use(session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* ROUTES */

app.use('/users', userRouter);
app.use('/profil', profilRouter);
app.use('/search', searchRouter);
app.use('/friend', friendRouter);
app.use('/message', messageRouter);


server.listen(process.env.PORT, () => console.log('Server is Up on the port ' + process.env.PORT));

