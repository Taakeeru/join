let currentDraggedElement;
let allTask = [];
let currentElement =[];
// let info = await getItem('newTask');
// let getTaskInfo = JSON.parse(info);

async function init() {
  await includeHTML();
  highlightTitle('board');
  highlightTitleMobile('board-mobile');
  let info = await getItem('newTask');
  let getTaskInfo = JSON.parse(info);
  allTask.push(getTaskInfo);
  updateHTML(getTaskInfo);
  loggedInUser = await getLoggedInUser();
  showProfileInitials(loggedInUser);
  
  loadUsers();
  generateAddTaskSideMenu()
}


// ------------------------ tastBereich------------------

function updateHTML(getTaskInfo) {
  let toDolist = getTaskInfo.filter((t) => t["category"] == "toDo");
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
  let contactsHTML = "";

  for (let i = 0; i < element["contacts"].length; i++) {
    const contact = element["contacts"][i];
    contactsHTML += `
      <div class="cardUserSymbole" style="background-color: ${contact["color"]} !important;">
        ${contact["initial"]}
      </div>`;
  }

  return `
    <div class="taskCards" id="contact${element["id"]}" onclick="openCardContainer('${element["id"]}')" draggable="true" ondragstart="startDragging(${element["id"]})">
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
          <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar w-75"></div>
          </div>
          <p class="cardSubNumber">1/2</p>
        </div>
        <div class="cardAddUser">
        <div class="cardAddUsersIconsContain" ><div class="cardAddUsersIcons" > ${contactsHTML} </div></div>
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
  await setItem('newTask', JSON.stringify(getTaskInfo));
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

function generateAddTaskSideMenu() {
  document.getElementById('FirstCardRenderContainer').innerHTML=
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
                 <div class="dateContent">
                     <p class="dateTitle">Due date</p>
                     <div class="inputfieldDateContainer modal-body">
                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                           <div class="modal-dialog curser">
                             <div class="modal-content curser">
                               <div class="modal-body curser">
                                 <div>
                                    <input required id="dueDateValue" class="inputfieldDate" type="date" placeholder="dd/mm/yyyy">
                                 </div>
                               </div>
                             </div>
                           </div>
                         </div>
                     </div>
                     <div class="textfield-fail" id="date-fail-message"></div>
                  </div>
              </div>
              <div class="assignedContent assignedContent-sideMenu" >
                 <div class="assignedTitleContainer">
                    <p class="assignedTitle">Priority
                    <p class="assignedTitle small" >(optional)</p>
                    </p>
                 </div>
                 <div class="buttonContainer"> 
                    <button onclick="getThePriority('high')" class="prioButtonRed">Urgent<img id="urgentPriority" class="buttonImg" src="../assets/img/prio_alta.svg" alt=""></button>
                    <button onclick="getThePriority('medium')" class="prioButtonYellow">Medium<img id="mediumPriority" class="buttonImg" src="../assets/img/prio_media.svg" alt=""></button>
                    <button onclick="getThePriority('low')" class="prioButtonGreen">Low<img id="lowPriority" class="buttonImg" src="../assets/img/prio_baja.svg" alt=""></button>
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
                    <div class="positionOfButtons">
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

function openCardContainer(element) { // noch später auf die karten übergeben
 
  document.getElementById("FirstCardRenderContainer2").classList.remove("d-none");
  document.getElementById("FirstCardRenderContainer2").innerHTML=
  
   `<div id="openCardContainer" onclick="closeCardContainer()"  class="openCardContainer" >
  <div class="openCardsDetails" onclick="event.stopPropagation()">
     <div class="openCardTitle"> 
      <div><span class="userDetailsTitle">${allTask[0][element]["workCategory"]}</span></div>
        <img class="userDetailsImg" onclick="closeCardContainer()" src="../assets/img/close.svg" alt="">
     </div>
     <div class="openCardDescription">
        <span class="openCardDescriptionText">${allTask[0][element]["title"]}</span>
     </div>
     <div class="openCardText"> 
        <span class="openCardSpanText">${allTask[0][element]["description"]}</span>
     </div>
     <div class="openCardDate">
        <span class="cardsCategoryText">Due date:</span>
        <span class="openCardSecondText" >${allTask[0][element]["date"]}</span>
     </div>
     <div class="openCardPrio">
        <span class="cardsCategoryText">Priority:</span>
        <span class="openCardSecondText" >Medium <img class="openCardPrioImg" src="../assets/img/prio_media.svg" alt=""> </span> 
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
        <div class="subtaskText">Implement Recipe Recommendation</div >
        <div class="subtaskText">Implement Recipe Recommendation</div >
        <div class="subtaskText">Implement Recipe Recommendation</div >
     </div>
     <div class="openCardIcons">
        <div  class="openCardIconsImgContainer" >
           <img class="openCardIconsImg" src="../assets/img/delete.svg" alt=""> <span class="openCardIconsText">Delete</span>
        </div>
        <img class="openCardIconsImg" src="../assets/img/vector3.svg" alt="">
        <div onclick="openEditContainer(${allTask[0][element]["id"]}),showAssignetContacts2(loggedInUser)" class="openCardIconsImgContainer" >
           <img   class="openCardIconsImg" src="../assets/img/edit.svg" alt=""> <span class="openCardIconsText">Edit</span>
        </div>
     </div>
  </div>
</div>
</div>`
usersDate(element)
}

function usersDate(element) {
  let userDateRender =document.getElementById('usersDateContent');
  for (let i = 0; i < allTask[0][element]["contacts"].length; i++) {
    const contact = allTask[0][element]["contacts"][i];
    userDateRender.innerHTML += `
    <div class="detaicardsUserContainer">
      <div class="cardUserSymbole detailVersion" style="background-color: ${contact["color"]} !important;">
        ${contact["initial"]}
      </div>
      <div>
      <span class="cardUserDetailVersion" > ${contact["name"]}</span> 
      </div>
    <div>`;
  }
}





function closeCardContainer() {
  document.getElementById("openCardContainer").classList.add("d-none");
  
}
// Edit secondCard 
function openEditContainer(element) {
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
                  <div class="dateContent">
                     <p class="dateTitle">Due date</p>
                     <div class="inputfieldDateContainer modal-body">
                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                           <div class="modal-dialog curser">
                             <div class="modal-content curser">
                               <div class="modal-body curser">
                                 <div>
                                    <input required id="dueDateValue2" class="inputfieldDate" type="date" placeholder="dd/mm/yyyy">
                                 </div>
                               </div>
                             </div>
                           </div>
                         </div>
                     </div>
                     <div class="textfield-fail" id="date-fail-message2"></div>
                  </div>
               </div>
               <div class="assignedContent assignedContent-sideMenu" >
                  <div class="assignedTitleContainer">
                     <p class="assignedTitle">Priority
                     <p class="assignedTitle small" >(optional)</p>
                     </p>
                  </div>
                  <div class="buttonContainer"> 
                     <button onclick="getThePriority('ssad')" class="prioButtonRed">Urgent<img id="urgentPriority2" class="buttonImg" src="../assets/img/prio_alta.svg" alt=""></button>
                     <button onclick="getThePriority('medium')" class="prioButtonYellow">Medium<img id="mediumPriority2" class="buttonImg" src="../assets/img/prio_media.svg" alt=""></button>
                     <button onclick="getThePriority('low')" class="prioButtonGreen">Low<img id="lowPriority2" class="buttonImg" src="../assets/img/prio_baja.svg" alt=""></button>
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
               <div id="addContactstoassign2" class="addContactstoassign"></div>
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
                  <div id="subtaskContainer2"></div>
               </div>
            </div>
         </div>
            </div>
            <div class="buttonContainerEdit" > <button onclick="createNewTask2()" class="displayFlex btnCreateContact">Ok<img
               src="../assets/img/check.svg" class="samllIconsContactOK"></button></div>
         </div>
      </div>
  `}

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
      <ul>
        <li class="subtaskList">
          <span id="${subtaskId}">${subtaskValue} </span>
          <div class="displayFlex">
            <img src="../assets/img/edit.svg" onclick="editSubtask('${subtaskId}')" class="subtaskEditImg">|
            <img src="../assets/img/delete.svg" onclick="deleteSubtask('${subtaskId}')" class="subtaskDeleteImg">
          </div>
          <div class="d-none">
            <input type="text" class="editSubtask">
            <div class="displayFlex">
              <img src="../assets/img/close.svg" alt="">|
              <img src="../assets/img/checkImg.png" alt="">
            </div>
          </div>
        </li>
      </ul>`;
    subtaskInput.value = '';
  }
}

async function createNewTask2() {
  const titleInput = document.getElementById('addTastTitel2').value.trim();
  const descriptionInput = document.getElementById('addTastTextArea2').value.trim();
  const categoryInput = loadCategory2();

  // Überprüfen, ob der Titel bereits vorhanden ist
  const elementIndex = allTask[0].findIndex(task => task.title === titleInput);

  if (elementIndex !== -1) {
    // Task existiert bereits, aktualisiere die Werte
    allTask[0][elementIndex].title = titleInput;
    allTask[0][elementIndex].description = descriptionInput;
    allTask[0][elementIndex].category = categoryInput;
  } else {
    console.log('task exestiert bereits')
  }

  // Speichern der aktualisierten Aufgabenliste
  await setItem('newTask', JSON.stringify(allTasks));

  // Schließe das Bearbeitungsfenster
  closeEditContainer2();

  // Aktualisiere die HTML-Ansicht mit den neuen Aufgaben
  updateHTML(allTask[0]);
}



function generateUniqueId() {
  return 'id_' + Date.now(); // Hier könnte eine bessere Methode zur Generierung einer eindeutigen ID verwendet werden
}




async function showAssignetContacts2(loggedInUser) {
  let box = document.getElementById("selectContainer2");

  for (let i = 0; i < loggedInUser.contacts.length; i++) {
    let userName = loggedInUser.contacts[i].name;
    let getInitial = loggedInUser.contacts[i].initial;
    let getColor = loggedInUser.contacts[i].color;
    box.innerHTML += /*html*/`
      <div class="userBoxContainer displayFlex">
        <div class="imgPerson displayFlex" style="background-color: ${getColor};">${getInitial}</div>
        <span class="userPosition">${userName}</span>
        <input type="checkbox" id="inputId${i}" onclick="handleCheckboxClick2('${i}', '${userName}', '${getInitial}', '${getColor}')">
      </div>`;

    let userContactData = {
      name: userName,
      email: loggedInUser.contacts[i].email,
      phone: loggedInUser.contacts[i].phone,
      initial: getInitial,
      color: getColor
    };
    
     contactData.push(userContactData);
  }
  return contactData;
}

function handleCheckboxClick2(i, userName, getInitial, getColor) {
  let checkbox = document.getElementById(`inputId${i}`);
  let addUser = document.getElementById("addContactstoassign2");
  let userId = `user_${i}`;

  if (checkbox.checked) {
    addUser.innerHTML += `
      <div id="${userId}" class="userBoxContainer displayFlex">
        <div class="imgPerson displayFlex" style="background-color: ${getColor};">${getInitial}</div>
      </div>`;

    let selectedUser = {
      name: userName,
      email: loggedInUser.contacts[i].email,
      phone: loggedInUser.contacts[i].phone,
      initial: getInitial,
      color: getColor
    };

    selectedUsers.push(selectedUser);
  } else {
    let userToRemove = document.getElementById(userId);
    if (userToRemove) {
      userToRemove.remove();
      selectedUsers = selectedUsers.filter(user => user.name !== userName);
    }
  }
}

function loadCategory2(){
  let getValue = document.getElementById('categorySelect2').textContent.trim();
  return getValue;
}

