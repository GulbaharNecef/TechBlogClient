// auth_script.js

function setAccessToken(token) {
    localStorage.setItem('accessToken', token);
}

function getAccessToken() {
    return localStorage.getItem('accessToken');
}

function isAuthenticated() {
    return !!getAccessToken();
}

function showWriteLink() {
    const writeLink = document.getElementById('write-link');
    if (isAuthenticated()) {
        writeLink.style.display = 'block';
    } else {
        writeLink.style.display = 'none';
    }
}
function updateAuthLink() {
    const authLink = document.getElementById('auth-link');
    const authLinkText = document.getElementById('auth-link-text');
    
    if (isAuthenticated()) {
        authLinkText.textContent = 'Logout';
        authLinkText.href = '#';
        authLink.addEventListener('click', logout);
    } else {
        authLinkText.textContent = 'Login';
        authLinkText.href = 'login.html';
    }
}

function logout() {
    fetch('https://localhost:7185/api/Auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: getAccessToken() })
    })
    .then(response => {
        if (response.ok) {
            localStorage.removeItem('accessToken');
            window.location.href = 'index.html';
        } else {
            alert('Logout failed');
        }
    });
}

