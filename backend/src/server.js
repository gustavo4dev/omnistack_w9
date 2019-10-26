//importação de bibliotecas e arquivos
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');

//definindo variáveis da aplicação
const app = express();
const server = http.Server(app);
const io = socketio(server);


mongoose.connect("mongodb+srv://omnistack:omnistack@omnistack-13c2c.mongodb.net/omnistack?retryWrites=true&w=majority",
{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const connectedUsers = {};

io.on('connection', socket => {
    console.log(socket.handshake.query);
    console.log('Usuario conectado', socket.id)

    const {user_id} = socket.handshake.query;

    connectedUsers[user_id] = socket.id;
});

app.use((req, res, next)=>{
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});
//definindo recursos usados pela aplicação
app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname,'..','uploads')));
app.use(routes);




//instanciando o servidor
server.listen(3333);