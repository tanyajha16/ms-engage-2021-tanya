import helpers from './helpers.js';
export let roomLink;

window.addEventListener( 'load', () => {
    //When the chat icon is clicked
    // to toggle the chat button
    document.querySelector( '#toggle-chat-pane' ).addEventListener( 'click', ( e ) => {
        let chatElem = document.querySelector( '#chat-pane' );
        let mainSecElem = document.querySelector( '#main-section' );

        if ( chatElem.classList.contains( 'chat-opened' ) ) {
            chatElem.setAttribute( 'hidden', true );
            mainSecElem.classList.remove( 'col-md-9' );
            mainSecElem.classList.add( 'col-md-12' );
            chatElem.classList.remove( 'chat-opened' );
        }

        else {
            chatElem.attributes.removeNamedItem( 'hidden' );
            mainSecElem.classList.remove( 'col-md-12' );
            mainSecElem.classList.add( 'col-md-9' );
            chatElem.classList.add( 'chat-opened' );
        }

        //remove the 'New' badge on chat icon (if any) once chat is opened.
        setTimeout( () => {
            if ( document.querySelector( '#chat-pane' ).classList.contains( 'chat-opened' ) ) {
                helpers.toggleChatNotificationBadge();
            }
        }, 300 );
    } );


    //When the video frame is clicked. This will enable picture-in-picture
    document.getElementById( 'local' ).addEventListener( 'click', () => {
        if ( !document.pictureInPictureElement ) {
            document.getElementById( 'local' ).requestPictureInPicture()
                .catch( error => {
                    // Video failed to enter Picture-in-Picture mode.
                    console.error( error );
                } );
                
        }

        else {
            document.exitPictureInPicture()
                .catch( error => {
                    // Video failed to leave Picture-in-Picture mode.
                    console.error( error );
                } );
                
        }
    } );

    //When the 'Create room" is button is clicked
    document.getElementById( 'create-room' ).addEventListener( 'click', ( e ) => {
        e.preventDefault();

        let roomName = document.querySelector( '#room-name' ).value;
        let yourName = document.querySelector( '#your-name' ).value;

        if ( roomName && yourName ) {
            //remove error message, if any
            document.querySelector( '#err-msg' ).innerHTML = "";

            //save the user's name in sessionStorage
            sessionStorage.setItem( 'username', yourName );

            //create room link
            let roomLink = `${ location.origin }/?room=${ roomName.trim().replace( ' ', '_' ) }_${ helpers.generateRandomString() }`;
            let n = roomLink.search("_");
            let m=roomLink.length;
            let res = roomLink.slice(n+1,m);
      
            //show message with link to room
            window.location.href=roomLink;

            //empty the values
            document.querySelector( '#room-name' ).value = '';
            document.querySelector( '#your-name' ).value = '';
        }

        else {
            document.querySelector( '#err-msg' ).innerHTML = "All fields are required";
        }
    } );

    //When the 'Enter room' button is clicked.
    document.getElementById( 'enter-room' ).addEventListener( 'click', ( e ) => {
        e.preventDefault();

        let name = document.querySelector( '#username' ).value;


        if ( name ) {
            //remove error message, if any
            document.querySelector( '#err-msg-username' ).innerHTML = "";

            //save the user's name in sessionStorage
            sessionStorage.setItem( 'username', name );
            //reload room
            location.reload();
        }

        else {
            document.querySelector( '#err-msg-username' ).innerHTML = "Please input your name";
        }
    } );


    document.addEventListener( 'click', ( e ) => {
        if ( e.target && e.target.classList.contains( 'expand-remote-video' ) )
         {
            helpers.maximiseStream( e );
        }

         if ( e.target && e.target.classList.contains( 'mute-remote-mic' ) ) {
            helpers.singleStreamToggleMute( e );
        }
    } );


    document.getElementById( 'closeModal' ).addEventListener( 'click', () => {
        helpers.toggleModal( 'recording-options-modal', false );
    } );

        // Your web app's Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyAVjQP6NVEU8X0-97FU6ltzetQ8LkAYqP0",
            authDomain: "engage-2021-7610e.firebaseapp.com",
            databaseURL: "https://engage-2021-7610e-default-rtdb.firebaseio.com",
            projectId: "engage-2021-7610e",
            storageBucket: "engage-2021-7610e.appspot.com",
            messagingSenderId: "232155852643",
            appId: "1:232155852643:web:69258172aaaf2d58f0ed56"
        };
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        // initialize database
        const db = firebase.database();

        // get user's data
        const userchatname = sessionStorage.getItem('username');

        // submit form
        // listen for submit event on the form and call the postChat function
        document.getElementById("message-form").addEventListener("submit", sendMessage);

        // send message to db
        function sendMessage(e) {
        e.preventDefault();

        // get values to be submitted
        const timestamp = Date.now();
        const messageInput = document.getElementById("message-input");
        const message = messageInput.value;

        // clear the input box
        messageInput.value = "";

        //auto scroll to bottom
        document
            .getElementById("messages")
            .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

        // create db collection and send in the data
        db.ref("messages/"+timestamp).set({
            userchatname,
            message,
            timestamp
        });
        }

        // display the messages
        // reference the collection created earlier
        const fetchChat = db.ref("messages/");

        // check for new messages using the onChildAdded event listener
        fetchChat.on("child_added", function (snapshot) {
        const messages = snapshot.val();
        const message = `<li class=${
            userchatname === messages.userchatname ? "sent" : "receive"
        }><span>${messages.userchatname}-${ moment().format( 'Do MMMM, h:mm a' ) }: </span>${messages.message}</li>`;
        // append the message on the page
        document.getElementById("messages").innerHTML += message;
        });

        document.getElementById('logout').addEventListener('click', resetChat)
        function resetChat()
        {
            console.log("This Works")
            let userRef = db.ref("messages/");
            userRef.remove()
        }
} );
