// chat engine functions

// initializing the user and the chatbox id 
class ChatEngine{
    constructor(chatBoxId, userName){
        this.chatBox = $(`#${chatBoxId}`);
        this.userName = userName;

        this.socket = io.connect('http://localhost:5000');

        if (this.userName){
            this.connectionHandler();
        }
    }


    connectionHandler(){
        let self = this;

        // if connection is build
        this.socket.on('connect', function(){
            console.log('connection established using sockets...!');


            self.socket.emit('join_room', {
                user_name: self.userName,
                chatroom: 'codeial'
            });
 
            // if any user joined
            self.socket.on('user_joined', function(data){
                console.log('a user joined!', data);
            })


        });

        // CHANGE :: send a message on clicking the send message button
        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val();

            if (msg != ''){
                self.socket.emit('send_message', {
                    message: msg,
                    user_name: self.userName,
                    chatroom: 'codeial'
                });
            }
        });

        self.socket.on('receive_message', function(data){
            console.log('message received', data.message);


            // html of message part
            let newMessage = $('<li>');

            let messageType = 'other-message';

            if (data.user_name == self.userName){
                messageType = 'self-message';
            }

            newMessage.append($('<span>', {
                'html': data.message
            }));

            newMessage.append($('<sub>', {
                'html': data.user_name
            }));

            newMessage.addClass(messageType);

            $('#chat-messages-list').append(newMessage);
            $('input[id="chat-message-input"], textarea').val('');
        })
    }
}
