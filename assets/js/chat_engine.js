class ChatEngine{
    constructor(chatBoxId, userEmail) {
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect('http://localhost:5000');
        if (this.userEmail) {
            this.connectionHandler();
        }
    }

    connectionHandler() {
        let self = this;
        this.socket.on('connect', function () {
            console.log('Connection established using sockets...!');

            //Emit request to join the room
            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'Codeial'
            });

            //Detect user has joined
            self.socket.on('user_joined', function (data) {
                console.log("A user has joined", data);
            });

            //Send message to the another user
            $('#send-message').click(function () {
                let msg = $('#user-message').val();

                if (msg != "") {
                    self.socket.emit('send_message', {
                        message: msg,
                        user_email: self.userEmail,
                        chatroom: 'Codeial'
                    });
                }
            });

            //Receive message from server
            self.socket.on('receive_message', function (data) {
                console.log('Message received', data.message);
                let newMessage = $('<li>');

                let messageClass = 'other-message';
                if (data.user_email == self.userEmail) {
                    messageClass = 'self-message';
                }

                newMessage.append($('<span>', {
                    html: data.message
                }));

                // newMessage.append($('<sub>', {
                //     html: data.user_email
                // }));

                newMessage.addClass(messageClass);
                $('#chat-message-list').append(newMessage);
            })
        });
    }
}