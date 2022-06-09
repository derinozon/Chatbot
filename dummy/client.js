// const { io } = require("socket.io-client");

const socket = io('http://localhost:5000')

const chatbox = document.getElementById('chatbox');
const btn = document.getElementById('btn');
const field = document.getElementById('field');

btn.addEventListener('click', () => {
	let msg = field.value;
	socket.emit('dish', msg);
	chatbox.innerText += ('\n'+'You: '+msg);
	field.value = '';
})

socket.on('connect', () => {
	
})

socket.on('answer', (msg) => {
	chatbox.innerText += ('\n'+msg)
})