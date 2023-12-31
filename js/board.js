let currentDraggedElement;
let allTask = [];
let currentSubtasksBoard = [];
let selectedSubtaskCounts = [];
let currentIndex = 0;
let startDraggingIndex = 0;



async function init() {
  await includeHTML();
  loggedInUser = await getLoggedInUser();
  highlightTitle('board');
  highlightTitleMobile('board-mobile');
  let info = await getItem('newTask');
  let getTaskInfo = JSON.parse(info);
  showProfileInitials(loggedInUser);
  loadUsers();
  generateAddTaskSideMenu();
  allTask.push(getTaskInfo);
  updateHTML(getTaskInfo);
  showAssignetContacts(loggedInUser);
  updateProgressBarOnload()
}


// ------------------------ tastBereich------------------

function getPriorityImagePath(priority) {
 
  const priorityPaths = {
    high: "../assets/img/prio_alta.svg",
    medium: "../assets/img/prio_media.svg",
    low: "../assets/img/prio_baja.svg",
    
  };
  if (priority in priorityPaths) {
    return priorityPaths[priority];
  } else {
  
    return "no found"; 
  }
}


function searchTask() {
  const searchInput = document.getElementById('searchInput');
  const searchTerm = searchInput.value.toLowerCase();

  const filteredTasks = allTask[0].filter((task) => {
    const titleMatches = task.title.toLowerCase().includes(searchTerm);
    const descriptionMatches = task.description.toLowerCase().includes(searchTerm);

    return titleMatches || descriptionMatches;
  });

  updateHTML(filteredTasks);
 updateProgressBarOnload();
  

}


function updateHTML(getTaskInfo) {
  selectedUsers = [];
  let toDolist = getTaskInfo.filter((t) => t["category"] == "toDo");
  let toDoContainer = document.getElementById("toDo");
  toDoContainer.innerHTML = "";

  if (toDolist.length === 0) {
    toDoContainer.innerHTML = generatePlaceholderTasks("toDo");
  } else {
    for (let index = 0; index < toDolist.length; index++) {
      const element = toDolist[index];
      toDoContainer.innerHTML += generateTodoHTML(element,getPriorityImagePath(element.priority));
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
      progressContainer.innerHTML += generateTodoHTML(element,getPriorityImagePath(element.priority));
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
    feedbackContainer.innerHTML += generateTodoHTML(element,getPriorityImagePath(element.priority));
  }}

  let doneList = getTaskInfo.filter((t) => t["category"] == "done");
  let doneListContainer = document.getElementById("done");
  doneListContainer.innerHTML = "";

  if (doneList.length === 0) { 
    doneListContainer.innerHTML = generatePlaceholderTasks("done");
  } else {

  for (let index = 0; index < doneList.length; index++) {
    const element = doneList[index];
    document.getElementById("done").innerHTML += generateTodoHTML(element,getPriorityImagePath(element.priority));
  }}
}



function generateTodoHTML(element, priorityImagePath) {
  let contactsHTML = "";

  for (let i = 0; i < element["contacts"].length; i++) {
    const contact = element["contacts"][i];
    contactsHTML += `
      <div class="cardUserSymbole" style="background-color: ${contact["color"]} !important;">
        ${contact["initial"]}
      </div>`;
  }
  

  return `
    <div class="taskCards" onclick="openCardContainer('${element["id"]}', '${priorityImagePath}')" draggable="true" ondragstart="startDragging(${element["id"]})">
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
          <div class="progress" role="progressbar" aria-label="Subtasks" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar" id="subtaskProgressBar${element["id"]}" style="width: 0;"></div>
          </div>
          <p class="cardSubNumber"><span id="test${element["id"]}">0</span>/${element["subtasks"].length}</p>
        </div>
        <div class="cardAddUser">
          <div class="cardAddUsersIconsContain"><div class="cardAddUsersIcons">${contactsHTML}</div></div>
          <img src=${priorityImagePath} alt="Priority Symbol" />
        </div>
      </div>
    </div>`;
}

function allowDrop(ev) {
  ev.preventDefault();
}

function startDragging(id) {
  currentDraggedElement = id;
}


function getStartDraggingIndex(element){
  let idToDelete = Number(element);
  startDraggingIndex = 0;
  for (let i = 0; i < allTask[0].length; i++) {
    const indexID = allTask[0][i].id;
    if (indexID === idToDelete){
      startDraggingIndex = i;
      return startDraggingIndex;
    }
  }
}


async function moveTo(category) {
  getStartDraggingIndex(currentDraggedElement);
  let info = await getItem('newTask');
  let getTaskInfo = JSON.parse(info);
  getTaskInfo[startDraggingIndex]["category"] = category;
  await setItem('newTask', JSON.stringify(getTaskInfo));
  updateHTML(getTaskInfo);
  updateProgressBarOnload();
}


function highlight(id) {
  document.getElementById(id).classList.add("boardtoDoSektion-highlight");
}

function removeHighlight(id) {
  setTimeout(function () {
    document.getElementById(id).classList.remove("boardtoDoSektion-highlight");
  }, 100);
}

function generateAddTaskSideMenu() {
  document.getElementById('FirstCardRenderContainer').innerHTML =
   `<div class="" id="menuContainerBox"onclick ="closeAddTaskMenu()" >
  <div id="sideMenu" class="sideMenuStyle" onclick="event.stopPropagation()" >
     <div class="header-sideMenu"><span>Add Task</span>
        <img onclick ="closeAddTaskMenu()" class="header-sideMenuImg" src="../assets/img/close.svg" alt="">
     </div>
     <div class="contentContainer-sideMenu" >
        <div class="addTask addTask-sideMenu">
           <div action="">
              <div class="topSektion topSektion-sideMenu">
                 <div class="titleContainer"><input id="addTastTitel" class="inputFieldTitle inputFieldTitle-sideMenu" type="" placeholder="Enter a title"></div>
                 <div class="description description-sideMenu">
                    <div class="descriptionContent">
                       <p class="descriptionText">Description
                       <p class="descriptionText small">(optional)</p>
                       </p>
                    </div>
                    <textarea  id="addTastTextArea" class="textArea" placeholder="Enter a Description" name="" id="" cols="30"
                       rows="10"></textarea>
                 </div>
                 <div class="dateContentMobileDate">
                     <p class="dateTitle">Due date</p>
                    
                    <input  class="inputfieldDateContainer dateMobile" placeholder="tipe you date" type="date" id="dueDateValue" min="2018-01-01">
                     <div class="textfield-fail" id="date-fail-message"></div>
                  </div>
              </div>
              <div class="assignedContent assignedContent-sideMenu" >
                 <div class="assignedTitleContainer">
                    <p class="assignedTitle">Priority
                    <p class="assignedTitle small" >(optional)</p>
                    </p>
                 </div>
                  <div class="buttonContainer mobileButtonContainer"> 
                   <button id="low" onclick="getThePriority('low', 'low', 'medium', 'high')" class="prioButtonGreen sideMobileButtonG">Low<img id="lowPriority" class="buttonImg" src="../assets/img/prio_baja.svg" alt=""></button>
                   <button id="medium" onclick="getThePriority('medium', 'low', 'medium', 'high')" class="prioButtonYellow sideMobileButtonY">Medium<img id="mediumPriority" class="buttonImg" src="../assets/img/prio_media.svg" alt=""></button>
                   <button id="high" onclick="getThePriority('high', 'low', 'medium', 'high')" class="prioButtonRed sideMobileButtonR">Urgent<img id="urgentPriority" class="buttonImg" src="../assets/img/prio_alta.svg" alt=""></button>
                 </div>
                  
              </div>
              <div class="assignedContent assignedContent-sideMenu" >
              <div class="assignedTitleContainer">
              <p class="assignedTitle">Assignet to
              <p class="assignedTitle small" >(optional)</p>
              </p>
           </div>
           <div id="assignedSelect" onclick="addContacts()"class="assignedSelect">
              <div >Select contacts to assign</div>
           </div>
        </div>
        <div id="addContactstoassign" class="addContactstoassign"></div>
        <div  id="selectContainer" class="selectContainer d-none">
              </div>
              <div class="assignedContent assignedContent-sideMenu" >
              <div class="assignedTitleContainer">
              <p class="assignedTitle">Category</p>
           </div>
           <div id="categorySelect" onclick="showCategoryContacts()" class="assignedSelect">
              <div id="SelectTaskCatergory">Select contacts to assign</div>
           </div>
        </div>
        <div id="categoryContainer" class="categoryContainer d-none">
           <div class="userBoxContainer">
              <span class="userPosition" id="technicalTaskID" onclick="loadTechnicalTask()">Technical Task</span>
           </div>
           <div class="userBoxContainer">
              <span class="userPosition" id="userStoryID" onclick="loadUserStory()">User Story</span>
           </div>
        </div>
        <div class="SubtaskContent" >
           <div class="assignedTitleContainer">
              <p class="assignedTitle">Subtask
              <p class="assignedTitle small" >(optional)</p>
              </p>
           </div>
           <input id="subtaskInput" onclick="addSubTask()" placeholder="Add new subtask" class="subtaskInput">
           <div id="subtaskContainer"></div>
        </div>
     </div>
  </div>
                    <div class="positionOfButtons mobileButtons">
                  <button  class="ClearBtn">Clear <img src="../assets/img/vector.svg"></button>
                  <button onclick="createNewTask()" class="createTaskBtn">Create Task <img src="../assets/img/check.svg"></button>
               </div>
           </div>
        </div>
     </div>
  </div>
</div>
`;
}


function showAddTaskMenu() {
  document.getElementById("FirstCardRenderContainer").classList.remove("d-none");
  document.getElementById("menuContainerBox").classList.add("menuContainer");
  document.getElementById("sideMenu").classList.add("showmenu");
}

function closeAddTaskMenu() {
  document.getElementById("menuContainerBox").classList.remove("menuContainer");
  document.getElementById("sideMenu").classList.remove("showmenu");
}

function openCardContainer(element,priorityImagePath) { 
  let priorityText;
  getCurrentIndex(element);
  if (allTask[0][currentIndex]["priority"] === 'high') {
    priorityText = 'High';
  } else if (allTask[0][currentIndex]["priority"] === 'medium') {
    priorityText = 'Medium';
  } else if (allTask[0][currentIndex]["priority"] === 'low') {
    priorityText = 'Low';
  } else {
    priorityText = 'Unknown';
  }
 
  document.getElementById("FirstCardRenderContainer2").classList.remove("d-none");
  document.getElementById("FirstCardRenderContainer2").innerHTML=
  
   `<div id="openCardContainer" onclick="closeCardContainer()"  class="openCardContainer" >
  <div class="openCardsDetails" onclick="event.stopPropagation()">
     <div class="openCardTitle"> 
      <div><span class="userDetailsTitle">${allTask[0][currentIndex]["workCategory"]}</span></div>
        <img class="userDetailsImg" onclick="closeCardContainer()" src="../assets/img/close.svg" alt="">
     </div>
     <div class="openCardDescription">
        <span class="openCardDescriptionText">${allTask[0][currentIndex]["title"]}</span>
     </div>
     <div class="openCardText"> 
        <span class="openCardSpanText">${allTask[0][currentIndex]["description"]}</span>
     </div>
     <div class="openCardDate">
        <span class="cardsCategoryText">Due date:</span>
        <span class="openCardSecondText" >${allTask[0][currentIndex]["date"]}</span>
     </div>
     <div class="openCardPrio">
        <span class="cardsCategoryText">Priority:</span>
        <span class="openCardSecondText" >${priorityText}  <img src=${priorityImagePath} alt="Priority Symbol" /> </span> 
     </div>
     <div class="openCardAssigned">
        <span class="cardsCategoryText">Assignet To:</span>
        <div id="usersDateContent" class="openCardAssignedAddUser" >
          
        </div>
     </div>
     <div class="openCardSubtask">
        <span class="cardsCategoryText" >Subtask</span>
     </div>
     <div class="openCardCheckbox">
     
     <div class="subtaskText">${renderSubtasks(element, allTask[0][currentIndex]["subtasks"])}</div>

     </div>
     <div class="openCardIcons">
     <div  class="openCardIconsImgContainer" onclick="deleteCard('${element}')">
           <img class="openCardIconsImg" src="../assets/img/delete.svg" alt=""> <span class="openCardIconsText">Delete</span>
        </div>
        <img class="openCardIconsImg" src="../assets/img/vector3.svg" alt="">
        <div onclick="openEditContainer(${[currentIndex]}),showAssignetContacts2(loggedInUser)" class="openCardIconsImgContainer" >
           <img   class="openCardIconsImg" src="../assets/img/edit.svg" alt=""> <span class="openCardIconsText">Edit</span>
        </div>
     </div>
  </div>
</div>
</div>`
usersDate();
updateCheckboxStatus(element);
}


function getCurrentIndex(element){
  let idToDelete = Number(element);
  currentIndex = 0;
  for (let i = 0; i < allTask[0].length; i++) {
    const indexID = allTask[0][i].id;
    if (indexID === idToDelete){
      currentIndex = i;
      return currentIndex;
    }
  }
}


function updateCheckboxStatus(element) {
  const checkboxes = document.querySelectorAll('.subtaskCheckbox input[type="checkbox"]');
  const subtaskCounts = selectedSubtaskCounts[element];

  if (subtaskCounts) {
    for (const subtaskId in subtaskCounts) {
      const checkbox = document.getElementById(subtaskId);
      if (checkbox) {
        checkbox.checked = subtaskCounts[subtaskId];
      }
    }
  }
 
}



function usersDate() {
  let userDateRender = document.getElementById('usersDateContent');
  let contactsHTML = "";  // Erstelle eine leere Zeichenkette für die Kontakte

  for (let i = 0; i < allTask[0][currentIndex]["contacts"].length; i++) {
    const contact = allTask[0][currentIndex]["contacts"][i];
    contactsHTML += `
      <div class="detaicardsUserContainer">
        <div class="cardUserSymbole detailVersion" style="background-color: ${contact["color"]} !important;">
          ${contact["initial"]}
        </div>
        <div>
          <span class="cardUserDetailVersion" > ${contact["name"]}</span> 
        </div>
      </div>`;
  }

  // Setze den HTML-Inhalt der usersDateContent-Div mit der erstellten Kontaktliste
  userDateRender.innerHTML = contactsHTML;
}


function renderSubtasks(element, subtasks) {
  let subtasksHTML = "";
  for (let i = 0; i < subtasks.length; i++) {
    const subtask = subtasks[i];
    const isChecked = subtask.status === true; // Hier wird der Status des Subtasks überprüft

    subtasksHTML += `<div class="subtaskCheckbox">
      <input type="checkbox" id="${subtask.id}" name="${subtask.value}" value="${subtask.value}" ${isChecked ? 'checked' : ''} onclick="checkboxClicked('${element}', '${subtask.id}')">
      <label for="${subtask.id}">${subtask.value}</label>
    </div>`;
  }
  return subtasksHTML;
}



async function checkboxClicked(cardElement, subtaskId) {
  const checkbox = document.getElementById(subtaskId);
  let numberOfSubtask = document.getElementById(`test${cardElement}`);

  if (!selectedSubtaskCounts[cardElement]) {
    selectedSubtaskCounts[cardElement] = {};
  }

  selectedSubtaskCounts[cardElement][subtaskId] = checkbox.checked;

  await updateProgressBar(cardElement, subtaskId);
  await updateStatus(subtaskId, checkbox.checked);
}
  
async function updateStatus(subtaskIdToUpdate, newStatusValue) {
    // Iteriere durch das äußere Array
    for (let j = 0; j < allTask[0].length; j++) {
      // Finde die Subtask mit der passenden ID
      if (allTask[0][j].subtasks) {
        const subtaskIndex = allTask[0][j].subtasks.findIndex(subtask => subtask.id === subtaskIdToUpdate);
  
        // Wenn die Subtask gefunden wurde, aktualisiere den Status
        if (subtaskIndex !== -1) {
          allTask[0][j].subtasks[subtaskIndex].status = newStatusValue;
        }
      }
    }
  
    // Speichere den aktualisierten Task im Backend
    await setItem('newTask', JSON.stringify(allTask[0]));
    updateProgressBarOnload()
    // Aktualisiere die lokale Anzeige
    console.log(allTask[0]);
}
  
  

async function updateProgressBar(element, subtaskId) {
  const progressBar = document.getElementById(`subtaskProgressBar${element}`);

  if (!selectedSubtaskCounts[element]) {
    selectedSubtaskCounts[element] = {};
  }

  await setItem('newTask', JSON.stringify(allTask[0][currentIndex].taskbar));
}


// function updateProgressBarOnload() {
//   let progressBar = 0;
//   let tasks = allTask[0];
//   let bar = 0;
//   let currentSubtask = 0;

//   for (let i = 0; i < tasks.length; i++) {
//     // Die Werte in den Variablen aktualisieren
//     bar += tasks[i].taskbar;
//     currentSubtask += tasks[i].subtasks.length;
//     progressBar += document.getElementById(`subtaskProgressBar${tasks[i].id}`);
//   }

//   let totalSubtasks = currentSubtask;
//   let percentage = (bar / totalSubtasks) * 100;

//   progressBar.style.width = `${percentage}%`;
//   progressBar.setAttribute('aria-valuenow', percentage);
// }


function updateProgressBarOnload() {
  for (let i = 0; i < allTask[0].length; i++) {
    const element = allTask[0][i];
    const progressBar = document.getElementById(`subtaskProgressBar${element["id"]}`);

    let numberOfSubtask = document.getElementById(`test${element["id"]}`);
    let completedSubtasks = element.subtasks.filter(subtask => subtask.status === true).length;
    let totalSubtasks = element.subtasks.length;
    let percentage = (completedSubtasks / totalSubtasks) * 100;

    progressBar.style.width = `${percentage}%`;
    progressBar.setAttribute('aria-valuenow', percentage);
    progressBar.innerHTML = `<span>${percentage}%</span>`;
    numberOfSubtask.innerHTML = `<span>${completedSubtasks}</span>`;
  }
  
}








function closeCardContainer() {
  document.getElementById("openCardContainer").classList.add("d-none");
}




// Edit secondCard 
function openEditContainer(element) {

  // Vor dem Aufrufen von showAssignetContacts2 die ausgewählten Benutzer bereitstellen
  selectedUsers = allTask[0][element]["contacts"];
  let selectedSubrasks = allTask[0][element]["subtasks"];
  let getId = allTask[0][element]["id"];
  document.getElementById("secondCardRenderContainer").classList.remove("d-none");
  document.getElementById("openCardContainer").classList.add("d-none");

  document.getElementById("secondCardRenderContainer").innerHTML=`
  <div id="openEditContainer2" onclick="closeEditContainer2()"  class="openCardContainer" >
         <div onclick="event.stopPropagation()"  class="openCardsDetailsEdit">
            <div class="header-EditMenu">
               <img onclick ="closeEditContainer2()" class="header-editMenuImg" src="../assets/img/close.svg" alt="">
            </div>
            <div class="contentContainer-sideMenu" >
            <div class="addTask addTask-sideMenu editMenu">
            <div action="">
               <div class="topSektion topSektion-sideMenu">
                  <div class="titleContainer"><input id="addTastTitel2" class="inputFieldTitle" type="" placeholder="${allTask[0][element]["title"]}"></div>
                  <div class="textfield-fail" id="tile-fail-message2"></div>
                  <div class="description description-sideMenu">
                     <div class="descriptionContent">
                        <p class="descriptionText">Description
                        <p class="descriptionText small">(optional)</p>
                        </p>
                     </div>
                     <textarea class="textArea" placeholder="${allTask[0][element]["description"]}" name="" id="addTastTextArea2" cols="30"
                        rows="10"></textarea>
                  </div>
                  <div class="textfield-fail" id="description-fail-message2"></div>
                  <div class="dateContent editMobileDate">
                     <p class="dateTitle">Due date</p>

                     <input  class="inputfieldDateContainer editMobileDate" placeholder="tipe you date" type="date" min="2018-01-01">

                     <div class="textfield-fail" id="date-fail-message2"></div>
                  </div>
               </div>
               <div class="assignedContent assignedContent-sideMenu" >
                  <div class="assignedTitleContainer">
                     <p class="assignedTitle">Priority
                     <p class="assignedTitle small" >(optional)</p>
                     </p>
                  </div>
                   <div class="buttonContainer editbuttonContainer"> 
                    <button id="low2" onclick="getThePriority2('low', 'low', 'medium', 'high')" class="prioButtonGreen">Low<img id="lowPriority2" class="buttonImg" src="../assets/img/prio_baja.svg" alt=""></button>
                    <button id="medium2" onclick="getThePriority2('medium', 'low', 'medium', 'high')" class="prioButtonYellow">Medium<img id="mediumPriority2" class="buttonImg" src="../assets/img/prio_media.svg" alt=""></button>
                    <button id="high2" onclick="getThePriority2('high', 'low', 'medium', 'high')" class="prioButtonRed">Urgent<img id="urgentPriority2" class="buttonImg" src="../assets/img/prio_alta.svg" alt=""></button>
                   </div>
               </div>
               <div class="assignedContent assignedContent-sideMenu" >
                  <div class="assignedTitleContainer">
                     <p class="assignedTitle">Assignet to
                     <p class="assignedTitle small" >(optional)</p>
                     </p>
                  </div>
                  <div id="assignedSelect2" onclick="addContacts2()"class="assignedSelect">
                     <div >Select contacts to assign</div>
                  </div>
               </div>
               <div id="addContactstoassign2" class="addContactstoassign">
                <div id="renderContacts"></div>
               </div>
               <div  id="selectContainer2" class="selectContainer d-none">
                  
               </div>
               <div class="assignedContent assignedContent-sideMenu" >
                  <div class="assignedTitleContainer">
                     <p class="assignedTitle">Category</p>
                  </div>
                  <div id="categorySelect2" onclick="showCategoryContacts2()" class="assignedSelect">
                     <div id="SelectTaskCatergory2">${allTask[0][element]["workCategory"]}</div>
                  </div>
               </div>
               <div id="categoryContainer2" class="categoryContainer d-none">
                  <div class="userBoxContainer">
                     <span class="userPosition" id="technicalTaskID2" onclick="loadTechnicalTask2()">Technical Task</span>
                  </div>
                  <div class="userBoxContainer">
                     <span class="userPosition" id="userStoryID2" onclick="loadUserStory2()">User Story</span>
                  </div>
               </div>
               <div class="SubtaskContent" >
                  <div class="assignedTitleContainer">
                     <p class="assignedTitle">Subtask
                     <p class="assignedTitle small" >(optional)</p>
                     </p>
                  </div>
                  <input id="subtaskInput2" onclick="addSubTask2()" placeholder="Add new subtask" class="subtaskInput">
                  <div id="selectedSubrasks" style="margin-bottom: 0;"></div>
                  <div id="subtaskContainer2"></div>
               </div>
            </div>
         </div>
            </div>
            <div class="buttonContainerEdit" > <button onclick="createNewTask2('${getId}')" class="displayFlex btnCreateContact">Ok<img
               src="../assets/img/check.svg" class="samllIconsContactOK"></button></div>
         </div>
      </div>`;
      
      renderContactsSmall(allTask[0][element]);
      rederCurrentTasks(selectedSubrasks);
}
 

function renderContactsSmall(element) {
  let box = document.getElementById('addContactstoassign2');
  box.innerHTML = ''; // Clear the content before rendering
   
  for (let i = 0; i < element["contacts"].length; i++) {
    const contact = element["contacts"][i];
    box.innerHTML += `
    <div id="${contact.id}" class="userBoxContainer displayFlex">
      <div class="imgPerson displayFlex" style="background-color: ${contact["color"]};">${contact["initial"]}</div>
    </div>`;
  }
}


function rederCurrentTasks(selectedSubrasks) {
  let box = document.getElementById('selectedSubrasks');
  box.innerHTML = ''; // Clear the content before rendering

  for (let i = 0; i < selectedSubrasks.length; i++) {
    const value = selectedSubrasks[i].value;
    const id = selectedSubrasks[i].id;
    const isSubtaskExist = currentSubtasksBoard.some(subtask => subtask.id === id);
    if (!isSubtaskExist) {
      currentSubtasksBoard.push({ id: id, value: value });
    }
    box.innerHTML += /*html*/ `
        <div class="subtaskList" id="${id}">${value}
          <img src="../assets/img/delete.svg" onclick="deleteSubtaskEdit('${id}')" class="subtaskDeleteImg">
        </div>`;
  }
}



function deleteSubtaskEdit(id){
  
  document.getElementById(`${id}`).remove();
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

// second add Task functions

function closeEditContainer2() {
  document.getElementById("openEditContainer2").classList.add("d-none");

}


function addContacts2() {
  let box = document.getElementById("selectContainer2");
  box.classList.toggle("d-none");
}


function showCategoryContacts2() {
  document.getElementById("categoryContainer2").classList.toggle("d-none");
}


function loadTechnicalTask2() {
  let Box = document.getElementById('technicalTaskID2');
  let currentValue = Box.innerHTML;
  if (currentValue === "Technical Task") {
    document.getElementById('SelectTaskCatergory2').innerHTML = currentValue;
  }
}


function loadUserStory2(){
  let Box = document.getElementById('userStoryID2');
  let currentValue = Box.innerHTML;
  if (currentValue === "User Story") {
    document.getElementById('SelectTaskCatergory2').innerHTML = currentValue;
  }
}


function addSubTask2() {
  let subtaskInput = document.getElementById('subtaskInput2');
  let addTask =  document.getElementById('subtaskContainer2');
  let subtaskValue = subtaskInput.value;
  let subtaskId = 'subtask' + Date.now();
  if (subtaskValue.trim() !== '') { 
    addTask.innerHTML +=`
        <div class="subtaskList" id="${subtaskId}">${subtaskValue} 
            <img src="../assets/img/delete.svg" onclick="deleteSubtask('${subtaskId}')" class="subtaskDeleteImg">
        </div>`;
    subtaskInput.value = '';
    currentSubtasksBoard.push({id: subtaskId, value: subtaskValue,});
  }
}


async function editTask(getId) {
  // Lese die vorhandenen Karten aus
  let info = await getItem('newTask');
  let getTaskInfo = JSON.parse(info);
  let currentID = Number(getId);
  // Finde die zu bearbeitende Karte
  let taskToEditIndex = getTaskInfo.findIndex(task => task.id === currentID);

  if (taskToEditIndex === -1) {
    console.error('Task not found for editing');
    return;
  }

  // Hole die aktualisierten Werte aus den Eingabefeldern
  let getTitel = document.getElementById('addTastTitel2').value;
  let getDiscriptionArea = document.getElementById('addTastTextArea2').value;
  let getCategory = loadCategory2();
  let getPrio = selectedPriority;
  let getSubtask = currentSubtasksBoard;

  // Aktualisiere die Werte der Karte
  getTaskInfo[taskToEditIndex].title = getTitel;
  getTaskInfo[taskToEditIndex].description = getDiscriptionArea;
  getTaskInfo[taskToEditIndex].workCategory = getCategory;
  getTaskInfo[taskToEditIndex].priority = getPrio;
  getTaskInfo[taskToEditIndex].subtasks = getSubtask;
  // Aktualisiere die Kontakte unter "Assignet to" nur mit ausgewählten Kontakten
  getTaskInfo[taskToEditIndex].contacts = selectedUsers;

  // Speichere die aktualisierten Daten
  await setItem('newTask', JSON.stringify(getTaskInfo));

  // Aktualisiere das entsprechende Element in allTask[0]
  allTask[0][taskToEditIndex] = getTaskInfo[taskToEditIndex];
  
  // Führe die Update-Funktion aus, um die Änderungen anzuzeigen
  updateHTML(getTaskInfo);
  // currentSubtasksBoard.length = 0;
}


function createNewTask2(getId) {
  // Falls openEditContainer2 aufgerufen wurde, rufe editTask mit der übergebenen id auf
  editTask(getId);

    // Hier hältst du eine Referenz zu den ausgewählten Kontakten
    let selectedContacts = selectedUsers;
  
    // Ersetze die folgenden Zeilen in der Funktion
    let usersHTML = "";
    let contactsHTML = "";
    for (let i = 0; i < contactData.length; i++) {
      usersHTML += /*html*/`
        <div class="userBoxContainer displayFlex">
          <div class="imgPerson displayFlex" style="background-color: ${contactData[i].color};">${contactData[i].initial}</div>
          <span class="userPosition">${contactData[i].name}</span>
          <input type="checkbox" id="inputId${i}" ${selectedContacts.some(user => user.name === contactData[i].name) ? 'checked' : ''} onclick="handleCheckboxClick2('${i}', '${contactData[i].name}', '${contactData[i].initial}', '${contactData[i].color}')">
        </div>`;
    }
  
    for (let i = 0; i < selectedContacts.length; i++) {
      contactsHTML += /*html*/`
        <div class="userBoxContainer displayFlex">
          <div class="imgPerson displayFlex" style="background-color: ${selectedContacts[i].color};">${selectedContacts[i].initial}</div>
          <span class="userPosition">${selectedContacts[i].name}</span>
        </div>`;
    }
  
    // Ersetze den Inhalt von usersDateContent und cardAddUsersIcons
    document.getElementById("usersDateContent").innerHTML = usersHTML;
    document.querySelector(".cardAddUsersIcons").innerHTML = contactsHTML;
    closeEditContainer2();
}

  
function showAssignetContacts2(loggedInUser) {
  let box = document.getElementById("selectContainer2");

  for (let i = 0; i < loggedInUser.contacts.length; i++) {
    let userName = loggedInUser.contacts[i].name;
    let getInitial = loggedInUser.contacts[i].initial;
    let getColor = loggedInUser.contacts[i].color;

    // Überprüfe, ob der Kontakt ausgewählt ist
    let isChecked = selectedUsers.some(user => user.name === userName);

    box.innerHTML += /*html*/ `
      <div class="userBoxContainer displayFlex">
        <div class="imgPerson displayFlex" style="background-color: ${getColor};">${getInitial}</div>
        <span class="userPosition">${userName}</span>
        <input type="checkbox" id="inputId2${i}" ${isChecked ? 'checked' : ''} onclick="handleCheckboxClick2(${i}, '${userName}', '${getInitial}', '${getColor}', ${isChecked})">
      </div>`;
  }
}


function handleCheckboxClick2(i, userName, getInitial, getColor) {
  let checkbox = document.getElementById(`inputId2${i}`);
  let userId = `user_${i}`;

  if (checkbox.checked) {
    // Check if the contact is already in the array
    if (!selectedUsers.some(user => user.name === userName)) {
      let selectedUser = {
        name: userName,
        email: loggedInUser.contacts[i].email,
        phone: loggedInUser.contacts[i].phone,
        initial: getInitial,
        color: getColor
      };
      selectedUsers.push(selectedUser);
      console.log(`selectedUsers hat ${selectedUsers.length}`);
      renderAddedContactBox(selectedUsers);
    } else {
      console.log(`User ${userName} already exists in selectedUsers`);
    }
    console.log(`${userId} hat value true`);
  } else {
    console.log(`Removing user with ID: ${userId}`);
    // If the checkbox is unchecked and the user is in the list, remove them
    let indexToRemove = selectedUsers.findIndex(user => user.name === userName);

    // If the user was found in the array, remove them
    if (indexToRemove !== -1) {
      selectedUsers.splice(indexToRemove, 1);
    }
    renderAddedContactBox(selectedUsers);

    console.log(`${userId} hat value false`);
  }
}



function renderAddedContactBox(selectedUsers){
  let currentUsers = document.getElementById("addContactstoassign2");
  currentUsers.innerHTML = '';
  for (let i = 0; i < selectedUsers.length; i++) {
    const initial = selectedUsers[i].initial;
    const color = selectedUsers[i].color;
    currentUsers.innerHTML += /*html*/`
          <div class="userBoxContainer displayFlex">
            <div class="imgPerson displayFlex" style="background-color: ${color};">${initial}</div>
          </div>`;
  }
}


function loadCategory2(){
  let getValue = document.getElementById('categorySelect2').textContent.trim();
  return getValue;
}


async function deleteCard(taskId){
  let idToDelete = Number(taskId);
  let info = await getItem('newTask');
  let getTaskInfo = JSON.parse(info);
  let taskToDeleteIndex = getTaskInfo.findIndex(task => task.id === idToDelete);
  if (taskToDeleteIndex === -1) {
    console.error('Task not found for deletion');
    return;
  }
  getTaskInfo.splice(taskToDeleteIndex, 1);
  await setItem('newTask', JSON.stringify(getTaskInfo));
  updateHTML(getTaskInfo);
}