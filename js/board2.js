let currentDraggedElement;

let allTask = [

];
let TEST = [
  {
    id: 0,
    title: "Ich",
    category: "toDo",
  },
  {
    id: 1,
    title: "Du",
    category: "toDo",
  },
  {
    id: 2,
    title: "Sie",
    category: "progress",
  },
  {
    id: 3,
    title: "Er",
    category: "feedBack",
  },
  {
    id: 4,
    title: "Wir",
    category: "done",
  },
  {
    id: 5,
    title: "Alle",
    category: "done",
  },
];

async function init() {
  await includeHTML();
  highlightTitle('board');
  let info = await getItem('newTask');
  let getTaskInfo = JSON.parse(info);
  allTask.push(getTaskInfo);
  updateHTML()
  loggedInUser = await getLoggedInUser();
  showProfileInitials(loggedInUser);
  loadUsers();
}


// ------------------------ tastBereich------------------

function updateHTML() {
  let toDolist = TEST.filter((t) => t["category"] == "toDo");
  let toDoContainer = document.getElementById("toDo");
  toDoContainer.innerHTML = "";

  if (toDolist.length === 0) {
    toDoContainer.innerHTML = generatePlaceholderTasks("toDo");
  } else {
    for (let index = 0; index < toDolist.length; index++) {
      const element = toDolist[index];
      toDoContainer.innerHTML += generateTodoHTML(element);
    }
  }

  let progressList = TEST.filter((t) => t["category"] == "progress");
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

  let feedbackList = TEST.filter((t) => t["category"] == "feedBack");
  let feedbackContainer = document.getElementById("feedBack");
  feedbackContainer.innerHTML = "";

  if (feedbackList.length === 0) { 
    feedbackContainer.innerHTML = generatePlaceholderTasks("progress");
  } else {

  for (let index = 0; index < feedbackList.length; index++) {
    const element = feedbackList[index];
    feedbackContainer.innerHTML += generateTodoHTML(element);
  }}

  let doneList = TEST.filter((t) => t["category"] == "done");
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
          <p class="userStory">${element["title"]}</p>
        </div>
        <div class="cardDescription">
          <p class="cardDescriptionHeader">Contact Form & Imprint</p>
          <p class="cardDescriptionInfo">
            Create a contact from and imprint page..
          </p>
        </div>
        <div class="cardSub">
          <div class="progress"role="progressbar"aria-label="Basic example"aria-valuenow="75"aria-valuemin="0"aria-valuemax="100">
            <div class="progress-bar w-75"></div>
          </div>
          <p class="cardSubNumber">1/2 Subtasks</p>
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

function moveTo(category) {
  allTask[currentDraggedElement]["category"] = category;
  updateHTML();
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


