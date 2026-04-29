let express=require('express');
let socket=require('socket.io');

let app=express();

/* app.get('/',(req,res)=>{
    res.send('Hello World');
}) */

let server=app.listen(3000,()=>{
    console.log('Server is running on port 3000 ');
})
app.use(express.static('public'));

let io=socket(server);

io.on('connection',(socket)=>{
    console.log('New connection: '+socket.id);
     socket.on('chat',(data)=>{
        io.sockets.emit('chat',data);
    }
    );
    
    socket.on('typing',(data)=>{
        socket.broadcast.emit('typing',data);
    }
    );
    /*
    socket.on('disconnect',()=>{
        console.log('User disconnected: '+socket.id);
    }); */
});