const chatDiv = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const token = localStorage.getItem('token');
const role = localStorage.getItem('role');

if (!token) window.location.href = 'login.html';
if (role === 'admin') document.getElementById('adminLink').style.display = 'inline';

async function loadChat() {
    const res = await fetch('https://ata-english-ss1l.onrender.com/chat', {
        headers: { 'Authorization': 'Bearer ' + token }
    });
    const messages = await res.json();
    chatDiv.innerHTML = '';
    messages.forEach(msg => {
        const el = document.createElement('div');
        el.classList.add('chat-message');
        el.innerHTML = `<strong>${msg.userName}</strong>: ${msg.content}`;
        chatDiv.appendChild(el);
    });
    chatDiv.scrollTop = chatDiv.scrollHeight;
}

sendBtn.addEventListener('click', async () => {
    const content = chatInput.value;
    if (!content) return;
    await fetch('https://ata-english-ss1l.onrender.com/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
        body: JSON.stringify({ content })
    });
    chatInput.value = '';
    loadChat();
});

// Recharger chat toutes les 3 secondes
setInterval(loadChat, 3000);
loadChat();
