const submitBtn = document.getElementById('submit');
const roomIdInput = document.getElementById('room-id');
const usernameInput = document.getElementById('name');

const usernameCache = localStorage.getItem('usernameCache');
if (usernameCache) {
    usernameInput.value = usernameCache;
}

submitBtn.addEventListener('mousedown', function (e) {
    let addDiv 	        = document.createElement('div'),
        maxValue 		= Math.max(this.clientWidth, this.clientHeight),
        rect			= this.getBoundingClientRect(),
        divStyle        = addDiv.style;

    divStyle.width = divStyle.height = maxValue + 'px';
    divStyle.left = e.clientX - rect.left - (maxValue / 2) + 'px';
    divStyle.top = e.clientY - rect.top - (maxValue / 2) + 'px';

    addDiv.classList.add('pulse');
    this.appendChild(addDiv);

    setTimeout(() => {
        addDiv.remove();
    }, 801);
});

roomIdInput.addEventListener('input', function() {
    this.value = this.value.replace(/\D/g, '');
});
