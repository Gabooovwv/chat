import Chat from "./chat.js";

const socket    = io.connect('http://185.13.90.140:8081/');
const ChatClass = new Chat(socket);

socket.on('message', msg => {
    if (msg.user !== 'echoBot2000') {
        ChatClass.insertMessageToHtml('you', `<strong>${msg.user}: </strong>${msg.message}`);
    }
});
