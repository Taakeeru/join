

async function init() {
    loggedInUser = await getLoggedInUser();
    greetUser(loggedInUser);
    showProfileInitials(loggedInUser);
    updateCurrentDate();
}


function updateCurrentDate() {
    const date = document.getElementById('date');
    const currentDate = new Date();
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-EN', options);
    date.textContent = formattedDate;
}