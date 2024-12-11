const socket = io();

const chat = document.querySelector('.chat');
const form = document.querySelector('.form');
const input = document.getElementById('message');

const usernameCache = localStorage.getItem('usernameCache');

const pathParts = window.location.pathname.split('/');
const roomId = pathParts[pathParts.length - 1];

socket.emit('join-room', roomId);

socket.emit('greeting-message', {
    message: `👋 Hello ${usernameCache}! Now you are with us!`,
    author: '🔧 System'
});

socket.on('greeting-message', data => {
    const parsedData = JSON.parse(data);
    appendGreetingMessage(parsedData);

    window.scrollTo(0, document.body.scrollHeight);
});

form.addEventListener('submit', event => {
    event.preventDefault();

    const message = input.value.trim();
    if (!message) return;

    socket.emit('chat-message', {
        message: message,
        author: usernameCache
    });

    input.value = '';
});

socket.on('chat-message', data => {
    const parsedData = JSON.parse(data);
    appendMessage(parsedData);

    window.scrollTo(0, document.body.scrollHeight);
});

function appendMessage(data) {
    const item = document.createElement('li');

    const usernameText = document.createElement('span');
    usernameText.classList.add('displayed-name');
    usernameText.innerText = data.author;
    
    const message = document.createElement('p');
    message.innerHTML = data.message;

    item.appendChild(usernameText);
    item.appendChild(message);

    chat.appendChild(item);
}

function appendGreetingMessage(data) {
    const item = document.createElement('li');
    item.classList.add('greeting-message');

    const usernameText = document.createElement('span');
    usernameText.classList.add('displayed-system');
    usernameText.innerText = data.system;
    usernameText.innerText = data.author;
    
    const message = document.createElement('p');
    message.innerHTML = data.message;

    item.appendChild(usernameText);
    item.appendChild(message);

    chat.appendChild(item);
}

const chatRoomKey = `chat-${roomId}`;
