

function renderSignUpContent() {
    renderBody();
    renderCard();
}


function renderBody() {
    let body = document.getElementById('body');
    let privacy = document.getElementById('privacy');
    let legal = document.getElementById('legal');
    let logo = document.getElementById('logo');
    let loginHeader = document.getElementById('login-header');
    
    body.classList.add('bg-color');
    privacy.classList.add('w-color');
    legal.classList.add('w-color');
    logo.innerHTML = '';
    logo.innerHTML = /* html */ `<img src="/assets/img/join-white.svg" alt="Logo Bild">`;
    loginHeader.classList.add('d-none');
}


function renderCard() {
    let name = document.getElementById('name');
    let confirmPassword = document.getElementById('confirm-password');
    let labelText = document.getElementById('label-text');
    let guestButton = document.getElementById('guest-button');

    name.classList.remove('d-none');
    confirmPassword.classList.remove('d-none');
    labelText.innerHTML = /* html */ `I accept the <a href="privacy.html">Privacy Policy</a>`
    guestButton.classList.add('d-none');
}