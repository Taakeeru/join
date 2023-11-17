let currentDraggedElement;
let allTask = [];
// let info = await getItem('newTask');
// let getTaskInfo = JSON.parse(info);

async function init() {
  await includeHTML();
  highlightTitle('board');
  let info = await getItem('newTask');
  let getTaskInfo = JSON.parse(info);
  allTask.push(getTaskInfo);
  updateHTML(getTaskInfo);
  loggedInUser = await getLoggedInUser();
  showProfileInitials(loggedInUser);
  loadUsers();
}


// ------------------------ tastBereich------------------

function updateHTML(getTaskInfo) {
  let toDolist = getTaskInfo.filter((t) => t["category"] == "ToDo");
  let toDoContainer = document.getElementById("toDo");
  toDoContainer.innerHTML = "";

  if (toDolist.length === 0) {
    toDoContainer.innerHTML = generatePlaceholderTasks("ToDo");
  } else {
    for (let index = 0; index < toDolist.length; index++) {
      const element = toDolist[index];
      toDoContainer.innerHTML += generateTodoHTML(element);
    }
  }

  let progressList = getTaskInfo.filter((t) => t["category"] == "progress");
  let progressContainer = document.getElementById("progress");
  progressContainer.innerHTML = ""; 

  if (progressList.length === 0) { 
    progressContainer.innerHTML = generatePlaceholderTasks("progress");
  } else {
    for (let index = 0; index < progressList.length; index++) {
      const element = progressList[index];
      progressContainer.innerHTML += generateTodoHTML(element); 
    }
  }

  let feedbackList = getTaskInfo.filter((t) => t["category"] == "feedBack");
  let feedbackContainer = document.getElementById("feedBack");
  feedbackContainer.innerHTML = "";

  if (feedbackList.length === 0) { 
    feedbackContainer.innerHTML = generatePlaceholderTasks("progress");
  } else {

  for (let index = 0; index < feedbackList.length; index++) {
    const element = feedbackList[index];
    feedbackContainer.innerHTML += generateTodoHTML(element);
  }}

  let doneList = getTaskInfo.filter((t) => t["category"] == "done");
  let doneListContainer = document.getElementById("done");
  doneListContainer.innerHTML = "";

  if (doneList.length === 0) { 
    doneListContainer.innerHTML = generatePlaceholderTasks("done");
  } else {

  for (let index = 0; index < doneList.length; index++) {
    const element = doneList[index];
    document.getElementById("done").innerHTML += generateTodoHTML(element);
  }
}}


function startDragging(id) {
  currentDraggedElement = id;
}

function generateTodoHTML(element) {
  return `
    <div class="taskCards" onclick="openCardContainer()" draggable="true" ondragstart="startDragging(${element["id"]})">
      <div class="cardContent">
        <div class="cardHeader">
          <p class="userStory">${element["workCategory"]}</p>
        </div>
        <div class="cardDescription">
          <p class="cardDescriptionHeader">${element["title"]}</p>
          <p class="cardDescriptionInfo">
            ${element["description"]}
          </p>
        </div>
        <div class="cardSub">
          <div class="progress"role="progressbar"aria-label="Basic example"aria-valuenow="75"aria-valuemin="0"aria-valuemax="100">
            <div class="progress-bar w-75"></div>
          </div>
          <p class="cardSubNumber">1/2</p>
        </div>
        <div class="cardAddUser">
          <div class="cardUserSymbole">AS</div>
          <img src="../assets/img/priority_symbols.svg" alt="" />
        </div>
      </div>
    </div>`;
}

function allowDrop(ev) {
  ev.preventDefault();
}

async function moveTo(category) {
  let info = await getItem('newTask');
  let getTaskInfo = JSON.parse(info);
  getTaskInfo[currentDraggedElement]["category"] = category;
  updateHTML(getTaskInfo);
}

function highlight(id) {
  document.getElementById(id).classList.add("boardtoDoSektion-highlight");
}

function removeHighlight(id) {
  setTimeout(function () {
    document.getElementById(id).classList.remove("boardtoDoSektion-highlight");
  }, 100);
}

function showAddTaskMenu() {
  document.getElementById("menuContainerBox").classList.add("menuContainer");
  document.getElementById("sideMenu").classList.add("showmenu");
}

function closeAddTaskMenu() {
  document.getElementById("menuContainerBox").classList.remove("menuContainer");
  document.getElementById("sideMenu").classList.remove("showmenu");
}

function openCardContainer() { // noch später auf die karten übergeben
  document.getElementById("openCardContainer").classList.remove("d-none");

}

function closeCardContainer() {
  document.getElementById("openCardContainer").classList.add("d-none");
  
}

function closeEditContainer() {
  document.getElementById("openEditContainer").classList.add("d-none");
}

function generatePlaceholderTasks(category) {
  return`<div class="placeholderTaskContainer" ><span>No tasks in ${category}</span></div>`;
  
}

function shwoCurrentDate(){
  document.getElementById('autoJsCalendar').classList.toggle('d-none');
}


