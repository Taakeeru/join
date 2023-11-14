let users = [];


function generateUniqueId() {
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  
    const uniqueId = `${timestamp}${randomLetter}`;
  
    return uniqueId;
}


async function initRegister() {
    register();
    
}


async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch(e) {
        console.error('Loading error:', e);
    }
}


async function register() {
    let signUpButton = document.getElementById('signup-button');
    let username = document.getElementById('user-name');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let confirmPassword = document.getElementById('confirm-password');
    let wrongPwMessage = document.getElementById('pw-fail');

    if (password.value == confirmPassword.value) {
        signUpButton.disabled = true;
        pushUserInfo(username, email, password);
        await setItem('users', JSON.stringify(users));
        resetForm(signUpButton, username, email, password, confirmPassword);
        wrongPwMessage.innerHTML = '';
        password.classList.remove('red-bg');
        confirmPassword.classList.remove('red-bg');
        await signUpSuccessAnimation();
        renderLogInContent();
    }   else {
        wrongPwMessage.innerHTML = /* html */ `<span>* Check passwords again</span>`;
        password.classList.add('red-bg');
        confirmPassword.classList.add('red-bg');
        
    }
}


function pushUserInfo(username, email, password, contacts) {
    const UNIQUE_ID = generateUniqueId();

    users.push({
        id: UNIQUE_ID,
        username: username.value,
        email: email.value,
        password: password.value,
        contacts: []
    });
}


function resetForm(signUpButton, username, email, password, confirmPassword) {
    username.value = '';
    email.value = '';
    password.value = '';
    confirmPassword.value = '';
    signUpButton.disabled = false;
}


async function signUpSuccessAnimation() {
    const successMessage = document.getElementById('successMessage');
    const overlay = document.getElementById('overlay');

    successMessage.classList.remove('d-none');
    overlay.classList.remove('d-none');
    await new Promise(resolve => setTimeout(resolve, 2000));
    successMessage.classList.add('d-none');
    overlay.classList.add('d-none');
}