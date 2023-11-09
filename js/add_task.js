

async function initAddTask() {
    loggedInUser = await getLoggedInUser();
    showProfileInitials(loggedInUser);
}