let loggedInUser;

async function initProfile() {
    loggedInUser = await getLoggedInUser();
    showProfileInitials(loggedInUser);
}

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
    window.location.href = '/html/help.html';
}


async function logout() {
    try {
        await updateLoggedInUser({});
        window.location.href = '/html/login.html';
    } catch (error) {
        console.error('Error during logout:', error);
    }
}


async function updateLoggedInUser(newValues) {
    const url = `${STORAGE_URL}?key=loggedInUser&token=${STORAGE_TOKEN}`;
    const payload = { key: 'loggedInUser', token: STORAGE_TOKEN, value: newValues };
    
    try {
        const response = await fetch(url, { method: 'POST', body: JSON.stringify(payload) });
        const responseData = await response.json();

        console.log('Server Response:', responseData);

        if (response.ok) {
            console.log('loggedInUser updated successfully.');
        } else {
            throw 'Error updating loggedInUser.';
        }
    } catch (error) {
        console.error('Error during updateLoggedInUser:', error);
        throw error;
    }
}