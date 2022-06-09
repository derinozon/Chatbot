// const { io } = require("socket.io-client");

const socket = io('http://localhost:5000')

const btn = document.getElementById('btn');
const field = document.getElementById('field');

btn.addEventListener('click', () => {
	let msg = field.value;
	socket.emit('dish', msg);
})

socket.on('connect', () => {
	
})