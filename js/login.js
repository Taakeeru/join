

function init() {
    showContentDuringAnimation();
    loadUsers();
}


function renderSignUpContent() {
    renderBody();
    renderCard();
}


function renderLogInContent() {
    renderLogInBody();
    renderLogInCard();
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
    let name = document.getElementById('user-name');
    let confirmPassword = document.getElementById('confirm-password');
    let labelText = document.getElementById('label-text');
    let logInButton = document.getElementById('login-button');
    let signUpButton = document.getElementById('signup-button');
    let guestButton = document.getElementById('guest-button');
    let title = document.getElementById('title');
    let titleArrow = document.getElementById('arrow-left');

    name.classList.remove('d-none');
    confirmPassword.classList.remove('d-none');
    labelText.innerHTML = /* html */ `I accept the <a href="privacy.html">Privacy Policy</a>`
    logInButton.classList.add('d-none');
    signUpButton.classList.remove('d-none');
    guestButton.classList.add('d-none');
    title.innerHTML = 'Sign in'
    titleArrow.classList.remove('d-none');
}


function renderLogInBody() {
    let body = document.getElementById('body');
    let privacy = document.getElementById('privacy');
    let legal = document.getElementById('legal');
    let logo = document.getElementById('logo');
    let loginHeader = document.getElementById('login-header');
    
    body.classList.remove('bg-color');
    privacy.classList.remove('w-color');
    legal.classList.remove('w-color');
    logo.innerHTML = '';
    logo.innerHTML = /* html */ `<img src="/assets/img/join_logo.svg" alt="Logo Bild">`;
    loginHeader.classList.remove('d-none');
}


function renderLogInCard() {
    let name = document.getElementById('user-name');
    let confirmPassword = document.getElementById('confirm-password');
    let labelText = document.getElementById('label-text');
    let logInButton = document.getElementById('login-button');
    let signUpButton = document.getElementById('signup-button');
    let guestButton = document.getElementById('guest-button');
    let title = document.getElementById('title');
    let titleArrow = document.getElementById('arrow-left');

    name.classList.add('d-none');
    confirmPassword.classList.add('d-none');
    labelText.innerHTML = /* html */ `Remember me`
    logInButton.classList.remove('d-none');
    signUpButton.classList.add('d-none');
    guestButton.classList.remove('d-none');
    title.innerHTML = 'Log in';
    titleArrow.classList.add('d-none');
}


function showContentDuringAnimation() {
    setTimeout(function() {
        let elementsToDisplay = [
            document.getElementById('login-header'),
            document.getElementById('login-card-div'),
            document.getElementById('login-footer')
        ];

        elementsToDisplay.forEach(function(element) {
            if (element) {
                element.classList.remove('d-none-js');
            }
        });
    }, 300);
}