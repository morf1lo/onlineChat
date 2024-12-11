const urlParams = new URLSearchParams(window.location.search);
let username = urlParams.get('username');

console.log(`extracted username: ${username}`);
if (username) {
    username = decodeURIComponent(username);
    localStorage.setItem("usernameCache", username);
} else {
    const usernameCache = localStorage.getItem('usernameCache');
    if (usernameCache) {
        username = usernameCache;
    } else {
        window.location.replace('http://localhost:5000');
    }
}
