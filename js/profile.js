let loggedInUser;

// async function init() {
//     loggedInUser = await getLoggedInUser();
//     showProfileInitials(loggedInUser);
// }

async function getLoggedInUser() {
    const userData = await getItem('loggedInUser');
    return JSON.parse(userData);
}

function greetUser(loggedInUser) {
    let name = document.getElementById('greet-name');
    name.textContent = loggedInUser.username;
}


function showProfileInitials(loggedInUser) {
    let initials = document.getElementById('profile-initials');
    
    if (loggedInUser && loggedInUser.username) {
        const username = loggedInUser.username;
        const words = username.split(' ');
        let initialsString = '';

        for (const word of words) {
            if (word.length > 0) {
                initialsString += word[0].toUpperCase();
            }
        }
        initials.textContent = initialsString;
    } else {
        initials.textContent = '';
    }
}


function toggleSettings() {
    let settings = document.getElementById('profile-settings');
    let profile = document.getElementById('initials-div')

    if (settings.classList.contains('d-none')) {
        settings.classList.remove('d-none');
        profile.classList.add('bg-colorchange');
    } else {
        settings.classList.add('d-none');
        profile.classList.remove('bg-colorchange');
    }
}


function loadHelp() {

}


function logout() {
    
}