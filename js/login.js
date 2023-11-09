

function init() {
    renderLogInCard();
    showContentDuringAnimation();
    loadUsers();
}


function renderSignUpContent() {
    renderSignUpBody();
    renderSignUpCard();
}


function renderLogInContent() {
    renderLogInBody();
    renderLogInCard();
}


function renderSignUpBody() {
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


function renderSignUpCard() {
    let title = document.getElementById('title');
    let titleArrow = document.getElementById('arrow-left');
    let form = document.getElementById('form-div');
     
    title.innerHTML = 'Sign in'
    titleArrow.classList.remove('d-none');
    form.innerHTML = '';
    form.innerHTML = signUpFormTemplate();
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
    let title = document.getElementById('title');
    let titleArrow = document.getElementById('arrow-left');
    let form = document.getElementById('form-div');

    title.innerHTML = 'Log in';
    titleArrow.classList.add('d-none');
    form.innerHTML = '';
    form.innerHTML = logInFormTemplate();
}


async function login() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let user = users.find(u => u.email == email.value && u.password == password.value);
    console.log(user);
    if(user) {
        await setItem('loggedInUser', JSON.stringify(user));
        window.location.href = '/html/summary.html';
    } else {
        if (user === undefined) {
            document.getElementById('emailError').textContent = 'Worng E-Mail';
        } else {
            document.getElementById('passwordError').textContent = 'Worng Password';
        }
    }
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
    }, 1300);
}