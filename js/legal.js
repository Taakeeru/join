


async function initLegal() {
    loggedInUser = await getLoggedInUser();
    showProfileInitials(loggedInUser);
    removePrivateElements();
}


function removePrivateElements() {
    let help = document.getElementById('helpImg');
    let profile = document.getElementById('profile-div');
    let aside = document.getElementById('aside');
    let headerTitle = document.getElementById('header-title');

    help.classList.add('d-none');
    profile.classList.add('d-none');
    aside.classList.add('d-none');
    headerTitle.onclick = null;
}