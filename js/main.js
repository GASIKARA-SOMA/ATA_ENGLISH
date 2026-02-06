const feedDiv = document.getElementById('feed');
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

async function loadFeed() {
    const res = await fetch('https://ata-english-ss1l.onrender.com/posts', {
        headers: { 'Authorization': 'Bearer ' + token }
    });
    const posts = await res.json();
    feedDiv.innerHTML = '';
    posts.forEach(post => {
        const postEl = document.createElement('div');
        postEl.classList.add('post');
        postEl.innerHTML = `
            <h3>${post.userName}</h3>
            <p>${post.content}</p>
            ${post.video ? `<video width="100%" controls src="${post.video}"></video>` : ''}
        `;
        feedDiv.appendChild(postEl);
    });
}

loadFeed();
