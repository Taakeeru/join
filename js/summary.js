let currentTaskInfo = [];


async function init() {
    await includeHTML();
    highlightTitle('summary');
    highlightTitleMobile('summary-mobile');
    loggedInUser = await getLoggedInUser();
    updateGreeting();
    greetUser(loggedInUser);
    showProfileInitials(loggedInUser);
    loadUsers();
    generateUserName(loggedInUser);
    let info = await getItem('newTask');
    let getTask = JSON.parse(info);
    currentTaskInfo.push(getTask);
    getAmountOfTasks();
    upcomingDate();
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


function generateUserName(loggedInUser){
    let getName = document.getElementById('greet-name');
    getName.innerHTML = /*html*/`
        <h1 class="showName">${loggedInUser.username}</h1 >`;
}   


function getAmountOfTasks() {
    let tasks = currentTaskInfo[0];
    let valueToDo = 0;
    let valueProgress = 0;
    let valueFeedBack = 0;
    let valueDone = 0;

    tasks.forEach(task => {
        if (task.category === "toDo") {
            valueToDo++;
        } else if (task.category === "progress") {
            valueProgress++;
        } else if (task.category === "feedBack") {
            valueFeedBack++;
        } else if (task.category === "done") {
            valueDone++;
        }});
    
    let currentValues = getCurrentValues(valueToDo, valueProgress, valueFeedBack,valueDone);
    renderNumbers(currentValues);
    calcAllTogether(currentValues);
    getPriority();
}


function  getCurrentValues(valueToDo, valueProgress, valueFeedBack,valueDone){
    let currentValues = {
        todo: valueToDo,
        progress: valueProgress,
        feedBack: valueFeedBack,
        done: valueDone
    };
    return currentValues;
};


function renderNumbers(currentValues){
    let toTo = document.getElementById('showNumberToDo');
    let progress = document.getElementById('showNumberProgress');
    let feedBack = document.getElementById('showNumberAwaitingFeedback');
    let done = document.getElementById('showNumberTasksDone');

    toTo.innerHTML = '';
    progress.innerHTML = '';
    feedBack.innerHTML = '';
    done.innerHTML = '';

    toTo.innerHTML = /*html*/`<p class="showTheNumbers">${currentValues.todo}</p>`;
    progress.innerHTML = /*html*/`<p class="showTheNumbers">${currentValues.progress}</p>`;
    feedBack.innerHTML = /*html*/`<p class="showTheNumbers">${currentValues.feedBack}</p>`;
    done.innerHTML = /*html*/`<p class="showTheNumbers">${currentValues.done}</p>`;
    renderNumverMobile(currentValues);
}


function renderNumverMobile(currentValues){
    let toTo = document.getElementById('showNumberToDo2');
    let progress = document.getElementById('showNumberProgress2');
    let feedBack = document.getElementById('showNumberAwaitingFeedback2');
    let done = document.getElementById('showNumberTasksDone2');

    toTo.innerHTML = '';
    progress.innerHTML = '';
    feedBack.innerHTML = '';
    done.innerHTML = '';

    toTo.innerHTML = /*html*/`<p class="showTheNumbers">${currentValues.todo}</p>`;
    progress.innerHTML = /*html*/`<p class="showTheNumbers">${currentValues.progress}</p>`;
    feedBack.innerHTML = /*html*/`<p class="showTheNumbers">${currentValues.feedBack}</p>`;
    done.innerHTML = /*html*/`<p class="showTheNumbers">${currentValues.done}</p>`;
}


function calcAllTogether(currentValues){
    let result = currentValues.todo + currentValues.progress + currentValues.feedBack + currentValues.done;
    let resultBox = document.getElementById('showTaskInBoardNumber');
    let resultBox2 = document.getElementById('showTaskInBoardNumber2');
    resultBox.innerHTML = '';
    resultBox2.innerHTML = '';
    resultBox.innerHTML = /*html*/`<p class="showTheNumbers">${result}</p>`;
    resultBox2.innerHTML = /*html*/`<p class="showTheNumbers">${result}</p>`;
}


function getPriority(){
    let tasks = currentTaskInfo[0];
    let valuePriority = 0;

    tasks.forEach(task => {
        if (task.priority === "high") {
            valuePriority++;
        }});

    let valueHighDiv = document.getElementById('showUrgentTasks');
    let valueHighDiv2 = document.getElementById('showUrgentTasks2');
    valueHighDiv.innerHTML = '';
    valueHighDiv2.innerHTML = '';
    valueHighDiv.innerHTML = /*html*/`<p class="showNumber">${valuePriority}</p>`;
    valueHighDiv2.innerHTML = /*html*/`<p class="showNumber">${valuePriority}</p>`;
}


function upcomingDate() {
    let tasks = currentTaskInfo[0];
    let date = document.getElementById('date');
    let dateMobile = document.getElementById('dateMobile');
    upcomingDateIfStatement(tasks.length);
    let urgentDate = new Date(tasks[0].date); // Initialize with the date of the first task

    tasks.forEach(task => {
        const taskDate = new Date(task.date);

        if (taskDate < urgentDate) {
            urgentDate = taskDate;
        }
    });

    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedUrgentDate = urgentDate.toLocaleDateString('en-EN', options);
    date.innerHTML = /*html*/`<div class="showTheNumbers">${formattedUrgentDate}</div>`;
    dateMobile.innerHTML = /*html*/`<div class="showTheNumbers">${formattedUrgentDate}</div>`;
}


function upcomingDateIfStatement(tasks){
    if (tasks === 0) {
        console.log("No tasks available.");
        return;
    }
}