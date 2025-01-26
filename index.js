// Node server which will handle socket io connections
const io=require('socket.io')(8000,{
    cors:{origin:"*"}
});
  
const users = {};

io.on('connection', socket=>{
    socket.on('new-user-joined', userName=>{
        console.log("New user - ", userName);
        users[socket.id]=userName;
        socket.broadcast.emit('user-joined', userName)
    });

    socket.on('message-send', message=>{
        socket.broadcast.emit('message-receive', {message: message, userName: users[socket.id]})
    });
})