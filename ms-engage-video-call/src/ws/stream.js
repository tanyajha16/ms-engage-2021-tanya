const stream = ( socket ) => {
    socket.on( 'subscribe', ( data ) => {
        //subscribe/join a room
        socket.join( data.room );
        socket.join( data.socketId );
        socket.join(data.name);
       console.log("the data is ",data);
        //Inform other members in the room of new user's arrival
        if ( socket.adapter.rooms[data.room].length > 1 ) {
            socket.to( data.room ).emit( 'new user', { socketId: data.socketId } );
            console.log("the new user has joined ",data.socketId);
        }
    } );


    socket.on( 'newUserStart', ( data ) => {
        socket.to( data.to ).emit( 'newUserStart', { sender: data.sender } );
        console.log("the sender user is ",data.sender);
    } );


    socket.on( 'sdp', ( data ) => {
        socket.to( data.to ).emit( 'sdp', { description: data.description, sender: data.sender } );
         console.log("the descrtiption is ",data.description);
         console.log("the descrtiption is ",data.sender);
    } );


    socket.on( 'ice candidates', ( data ) => {
        socket.to( data.to ).emit( 'ice candidates', { candidate: data.candidate, sender: data.sender } );
        console.log("the candidate is ",data.candidate);
        console.log("the sender is",data.sender);
    } );


    socket.on( 'chat', ( data ) => {
        socket.to( data.room ).emit( 'chat', { sender: data.sender, msg: data.msg } );
        console.log("the sender is ",data.sender);
        console.log("the msg is",data.msg);
    } );
};

module.exports = stream;
