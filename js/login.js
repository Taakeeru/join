

function renderSignUpContent() {
    getElements();
    let loginHeader = document.getElementById('login-header');

    body.classList = 'bg-color';
    privacy.classList = 'w-color';
    legal.classList = 'w-color';
    logo.innerHTML = '';
    logo.innerHTML = `<img src="/assets/img/join-white.svg" alt="Logo Bild">`;
    loginHeader.classList += ' d-none';
}

function getElements() {
    let body = document.getElementById('body');
    let privacy = document.getElementById('privacy');
    let legal = document.getElementById('legal');
    let logo = document.getElementById('logo');
    
}


