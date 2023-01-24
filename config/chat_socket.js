module.exports.chatSocket = function (socketServer) {
    let io = require('socket.io')(socketServer);

    io.sockets.on('connect', function (socket) {
        console.log("Connection received", socket.id);

        socket.on('disconnect', function () {
            console.log("Server disconnected!");
        });

        //Get the request which is sent by client to join the room
        socket.on('join_room', function (data) {
            console.log("Joining request received", data);
            socket.join(data.chatroom);
            io.in(data.chatroom).emit('user_joined', data);
        });

        //Detect message has been received to server
        socket.on('send_message', function (data) {
            console.log('Message sent server', data.message);
            //Emit notification to every user in the chat 
            io.in(data.chatroom).emit('receive_message', data);
        });
    })
}