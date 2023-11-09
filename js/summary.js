

async function init() {
    loggedInUser = await getLoggedInUser();
    greetUser(loggedInUser);
    showProfileInitials(loggedInUser);
}