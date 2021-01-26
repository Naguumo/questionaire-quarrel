const io = require('socket.io')();

const PORT = process.env.PORT || 3001;

io.on('connection', socket => {
    console.log(`connect: ${socket.id}`);
})

io.listen(PORT)