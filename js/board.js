let allTask = [
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
  includeHTML();
  updateHTML();
  loggedInUser = await getLoggedInUser();
  showProfileInitials(loggedInUser);
  loadUsers();
}

let currentDraggedElement;

function updateHTML() {
  let toDolist = allTask.filter((t) => t["category"] == "toDo");

  document.getElementById("toDo").innerHTML = "";

  for (let index = 0; index < toDolist.length; index++) {
    const element = toDolist[index];
    document.getElementById("toDo").innerHTML += generateTodoHTML(element);
  }

  let progressList = allTask.filter((t) => t["category"] == "progress");

  document.getElementById("progress").innerHTML = "";

  for (let index = 0; index < progressList.length; index++) {
    const element = progressList[index];
    document.getElementById("progress").innerHTML += generateTodoHTML(element);
  }

  let feedbackList = allTask.filter((t) => t["category"] == "feedBack");

  document.getElementById("feedBack").innerHTML = "";

  for (let index = 0; index < feedbackList.length; index++) {
    const element = feedbackList[index];
    document.getElementById("feedBack").innerHTML += generateTodoHTML(element);
  }

  let doneList = allTask.filter((t) => t["category"] == "done");

  document.getElementById("done").innerHTML = "";

  for (let index = 0; index < doneList.length; index++) {
    const element = doneList[index];
    document.getElementById("done").innerHTML += generateTodoHTML(element);
  }
}

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




