const filesList = document.getElementById('filesList');
const token = localStorage.getItem('token');
const role = localStorage.getItem('role');
if (!token) window.location.href = 'login.html';
if (role === 'admin') document.getElementById('adminLink').style.display = 'inline';

async function loadFiles() {
    const res = await fetch('https://ata-english-ss1l.onrender.com/files', {
        headers: { 'Authorization': 'Bearer ' + token }
    });
    const files = await res.json();
    filesList.innerHTML = '';
    files.forEach(file => {
        const el = document.createElement('div');
        el.classList.add('file-item');
        el.innerHTML = `
            <p>${file.name}</p>
            ${file.type === 'video' ? `<video width="100%" controls src="${file.url}"></video>` :
            `<a href="${file.url}" download>Télécharger</a>`}
        `;
        filesList.appendChild(el);
    });
}

loadFiles();
