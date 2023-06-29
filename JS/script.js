button = document.querySelector('.go')
button.addEventListener('mouseup', () => {
    nickname = document.querySelector('.nickname');
    selector = document.querySelector('.select__lvl');
    console.log(nickname.value);
    console.log(selector.value);
    window.location.href = 'http://127.0.0.1:5500/index2.html'
})

