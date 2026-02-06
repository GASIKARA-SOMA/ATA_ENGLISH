const nameEl = document.getElementById('name');
const emailEl = document.getElementById('email');
const logoutBtn = document.getElementById('logoutBtn');
const adminLink = document.getElementById('adminLink');

const token = localStorage.getItem('token');
const role = localStorage.getItem('role');
if (!token) window.location.href = 'login.html';
if (role === 'admin') adminLink.style.display = 'inline';

logoutBtn.addEventListener('click', () => {
    localStorage.clear();
    window.location.href = 'login.html';
});

async function loadProfile() {
    const res = await fetch('https://ata-english-ss1l.onrender.com/user/me', {
        headers: { 'Authorization': 'Bearer ' + token }
    });
    const user = await res.json();
    nameEl.textContent = user.name;
    emailEl.textContent = user.email;
}

loadProfile();
