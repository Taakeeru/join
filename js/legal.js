


async function initLegal() {
    loggedInUser = await getLoggedInUser();
    showProfileInitials(loggedInUser);
    highlightTitle('ln');
}


async function initPrivacy() {
    loggedInUser = await getLoggedInUser();
    showProfileInitials(loggedInUser);
    highlightTitle('pp');
}


