console.clear();

const io = require("socket.io")(5030, {
  cors: {
    origin: "*"
  }
});

const express = require('express');
const path = require('path');
const app = express();

/* settings */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

/* socket */
io.on('connection', socket => {
  socket.on('setColor', data => {
    console.log(data);
    socket.broadcast.emit('rescolor',data)
  })
})
/* routes */
app.get('/',(req,res)=> {
  res.sendFile(path.join(__dirname+'/public/index.html'))
})

/* listener */
app.listen(5050,() => {
  console.log('http://localhost:5050');
})