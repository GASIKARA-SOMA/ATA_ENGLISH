const token = localStorage.getItem('token');
const role = localStorage.getItem('role');

if (!token || role !== 'admin') {
    alert('Accès refusé');
    window.location.href = 'login.html';
}

// Navbar logout
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.clear();
    window.location.href = 'login.html';
});

// =================== POSTS ===================
const adminPostBtn = document.getElementById('adminPostBtn');
const adminPostContent = document.getElementById('adminPostContent');
const adminPostsList = document.getElementById('adminPostsList');

async function loadAdminPosts() {
    const res = await fetch('https://ata-english-ss1l.onrender.com/posts', {
        headers: { 'Authorization': 'Bearer ' + token }
    });
    const posts = await res.json();
    adminPostsList.innerHTML = '';
    posts.forEach(post => {
        const el = document.createElement('div');
        el.classList.add('post-item');
        el.innerHTML = `
            <strong>${post.userName}</strong>: ${post.content}
            ${post.video ? `<video width="100%" controls src="${post.video}"></video>` : ''}
        `;
        adminPostsList.appendChild(el);
    });
}

adminPostBtn.addEventListener('click', async () => {
    const content = adminPostContent.value;
    if (!content) return alert('Écris quelque chose !');
    await fetch('https://ata-english-ss1l.onrender.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
        body: JSON.stringify({ content })
    });
    adminPostContent.value = '';
    loadAdminPosts();
});

loadAdminPosts();

// =================== FILES ===================
const uploadFileBtn = document.getElementById('uploadFileBtn');
const fileNameInput = document.getElementById('fileName');
const fileURLInput = document.getElementById('fileURL');
const fileTypeSelect = document.getElementById('fileType');
const filesListAdmin = document.getElementById('filesListAdmin');

async function loadFilesAdmin() {
    const res = await fetch('https://ata-english-ss1l.onrender.com/files', {
        headers: { 'Authorization': 'Bearer ' + token }
    });
    const files = await res.json();
    filesListAdmin.innerHTML = '';
    files.forEach(file => {
        const el = document.createElement('div');
        el.classList.add('file-item');
        el.innerHTML = `
            <p>${file.name} (${file.type}) 
            <button onclick="deleteFile('${file._id}')">Supprimer</button></p>
        `;
        filesListAdmin.appendChild(el);
    });
}

uploadFileBtn.addEventListener('click', async () => {
    const name = fileNameInput.value;
    const url = fileURLInput.value;
    const type = fileTypeSelect.value;
    if (!name || !url) return alert('Remplis tous les champs !');

    await fetch('https://ata-english-ss1l.onrender.com/files', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
        body: JSON.stringify({ name, url, type })
    });
    fileNameInput.value = '';
    fileURLInput.value = '';
    loadFilesAdmin();
});

window.deleteFile = async (id) => {
    if (!confirm('Supprimer ce fichier ?')) return;
    await fetch(`https://ata-english-ss1l.onrender.com/files/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + token }
    });
    loadFilesAdmin();
}

loadFilesAdmin();

// =================== USERS ===================
const usersListAdmin = document.getElementById('usersListAdmin');

async function loadUsersAdmin() {
    const res = await fetch('https://ata-english-ss1l.onrender.com/users', {
        headers: { 'Authorization': 'Bearer ' + token }
    });
    const users = await res.json();
    usersListAdmin.innerHTML = '';
    users.forEach(user => {
        const el = document.createElement('div');
        el.classList.add('user-item');
        el.innerHTML = `
            ${user.name} (${user.email}) - Role: ${user.role} 
            <button onclick="deleteUser('${user._id}')">Supprimer</button>
        `;
        usersListAdmin.appendChild(el);
    });
}

window.deleteUser = async (id) => {
    if (!confirm('Supprimer cet utilisateur ?')) return;
    await fetch(`https://ata-english-ss1l.onrender.com/users/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + token }
    });
    loadUsersAdmin();
}

loadUsersAdmin();

// =================== CHAT ===================
const chatAdminMessages = document.getElementById('chatAdminMessages');
const chatAdminInput = document.getElementById('chatAdminInput');
const sendChatAdminBtn = document.getElementById('sendChatAdminBtn');

async function loadChatAdmin() {
    const res = await fetch('https://ata-english-ss1l.onrender.com/chat', {
        headers: { 'Authorization': 'Bearer ' + token }
    });
    const messages = await res.json();
    chatAdminMessages.innerHTML = '';
    messages.forEach(msg => {
        const el = document.createElement('div');
        el.classList.add('chat-message');
        el.innerHTML = `<strong>${msg.userName}</strong>: ${msg.content}`;
        chatAdminMessages.appendChild(el);
    });
    chatAdminMessages.scrollTop = chatAdminMessages.scrollHeight;
}

sendChatAdminBtn.addEventListener('click', async () => {
    const content = chatAdminInput.value;
    if (!content) return;
    await fetch('https://ata-english-ss1l.onrender.com/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
        body: JSON.stringify({ content })
    });
    chatAdminInput.value = '';
    loadChatAdmin();
});

// Recharger chat toutes les 3 secondes
setInterval(loadChatAdmin, 3000);
loadChatAdmin();
