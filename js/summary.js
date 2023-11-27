let currentTaskInfo = [];

async function init() {
    await includeHTML();
    highlightTitle('summary');
    highlightTitleMobile('summary-mobile');
    loggedInUser = await getLoggedInUser();
    updateGreeting();
    greetUser(loggedInUser);
    showProfileInitials(loggedInUser);
    updateCurrentDate();
    loadUsers();
    generateUserName(loggedInUser);
    let info = await getItem('newTask');
    let getTask = JSON.parse(info);
    currentTaskInfo.push(getTask);
    getAmountOfTasks();
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
        }
    });

    console.log(`todo = '${valueToDo}', progress = '${valueProgress}', feedBack = '${valueFeedBack}', done = '${valueDone}'`);
    
    let currenValues = {
        todo: valueToDo,
        progress: valueProgress,
        feedBack: valueFeedBack,
        done: valueDone
    };
    renderNumbers(currenValues);
    calcAllTogether(currenValues);
    getPriority();
}


function renderNumbers(currenValues){
    let toTo = document.getElementById('showNumberToDo');
    let progress = document.getElementById('showNumberProgress');
    let feedBack = document.getElementById('showNumberAwaitingFeedback');
    let done = document.getElementById('showNumberTasksDone');

    toTo.innerHTML = '';
    progress.innerHTML = '';
    feedBack.innerHTML = '';
    done.innerHTML = '';

    toTo.innerHTML = /*html*/`<p class="showTheNumbers">${currenValues.todo}</p>`;
    progress.innerHTML = /*html*/`<p class="showTheNumbers">${currenValues.progress}</p>`;
    feedBack.innerHTML = /*html*/`<p class="showTheNumbers">${currenValues.feedBack}</p>`;
    done.innerHTML = /*html*/`<p class="showTheNumbers">${currenValues.done}</p>`;
    renderNumverMobile(currenValues);
}


function renderNumverMobile(currenValues){
    let toTo = document.getElementById('showNumberToDo2');
    let progress = document.getElementById('showNumberProgress2');
    let feedBack = document.getElementById('showNumberAwaitingFeedback2');
    let done = document.getElementById('showNumberTasksDone2');

    toTo.innerHTML = '';
    progress.innerHTML = '';
    feedBack.innerHTML = '';
    done.innerHTML = '';

    toTo.innerHTML = /*html*/`<p class="showTheNumbers">${currenValues.todo}</p>`;
    progress.innerHTML = /*html*/`<p class="showTheNumbers">${currenValues.progress}</p>`;
    feedBack.innerHTML = /*html*/`<p class="showTheNumbers">${currenValues.feedBack}</p>`;
    done.innerHTML = /*html*/`<p class="showTheNumbers">${currenValues.done}</p>`;
}


function calcAllTogether(currenValues){
    let result = currenValues.todo + currenValues.progress + currenValues.feedBack + currenValues.done;
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