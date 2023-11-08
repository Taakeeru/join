let loggedInUser; // Define loggedInUser in the global scope

async function init() {
    loggedInUser = await getLoggedInUser(); // Wait for the Promise to resolve
    greetUser(loggedInUser);
}

async function getLoggedInUser() {
    const userData = await getItem('loggedInUser');
    return JSON.parse(userData); // Parse the JSON data
}

async function greetUser(loggedInUser) {
    let name = document.getElementById('greet-name');
    name.textContent = loggedInUser.username;
}


// getItem('loggedInUser')
//             .then(loggedInUser => {
//                 // Der Benutzer ist eingeloggt. Sie können auf seine Daten zugreifen.
//                 console.log('Eingeloggter Benutzer:', loggedInUser);

//                 // Hier können Sie den Benutzernamen in Ihren HTML-Code einbetten.
//                 const greetName = document.getElementById('greet-name');
//                 greetName.textContent = loggedInUser.username;
//             })
//             .catch(error => {
//                 // Der Benutzer ist nicht eingeloggt oder die Daten wurden nicht gefunden.
//                 console.error('Benutzer nicht eingeloggt.', error);
//             });