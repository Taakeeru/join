let loggedInUser;

async function init() {
    loggedInUser = await getLoggedInUser();
    greetUser(loggedInUser);
    loadProfile(loggedInUser);
}

async function getLoggedInUser() {
    const userData = await getItem('loggedInUser');
    return JSON.parse(userData);
}

function greetUser(loggedInUser) {
    let name = document.getElementById('greet-name');
    name.textContent = loggedInUser.username;
}


function loadProfile(loggedInUser) {
    let name = document.getElementById('greet-name');
    name.textContent = loggedInUser.username;
}


