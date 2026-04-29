// make connection

let socket = io.connect('http://localhost:3000');

// query DOM

let message = document.getElementById('message');
let handle = document.getElementById('handle');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let feedback = document.getElementById('feedback');

// emit events

btn.addEventListener('click', () => {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = '';
    handle.value = '';
});

message.addEventListener('keypress', () => {
    socket.emit('typing', handle.value);
});

//let typingTimeout;

// listen for events

socket.on('chat', (data) => {
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ':</strong>' + data.message + '</p>';
  //  clearTimeout(typingTimeout);
});

socket.on('typing', (data) => {
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
    /* clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
        feedback.innerHTML = '';
    }, 3000); */
}); 