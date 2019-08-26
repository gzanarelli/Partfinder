let express = require('express');
let app = express();
let dotenv = require('dotenv').config();
let userRouter = require('./API/routes/users');
let profilRouter = require('./API/routes/profil');
let searchRouter = require('./API/routes/search');
let messageRouter = require('./API/routes/message');
var cors = require('cors');
const server = require('http').Server(app);
const conversationModel = require('./API/models/message');
const io = require('socket.io')(server);  

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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* ROUTES */

app.use('/users', userRouter);
app.use('/profil', profilRouter);
app.use('/search', searchRouter);
app.use('/message', messageRouter);


server.listen(process.env.PORT, () => console.log('Server is Up on the port ' + process.env.PORT));

