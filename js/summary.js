

async function init() {
    loggedInUser = await getLoggedInUser();
    updateGreeting();
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


function updateGreeting() {
    const greeting = document.getElementById('greeting');

    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    let greetingMessage = '';

    if (currentHour >= 5 && currentHour < 12) {
        greetingMessage = 'Good morning, ';
    } else if (currentHour >= 12 && currentHour < 18) {
        greetingMessage = 'Good afternoon, ';
    } else {
        greetingMessage = 'Good evening, ';
    }

    greeting.textContent = greetingMessage;
}