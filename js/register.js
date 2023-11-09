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

    signUpButton.disabled = true;
    pushUserInfo(username, email, password);
    await setItem('users', JSON.stringify(users));
    resetForm(signUpButton, username, email, password, confirmPassword);
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