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
  showAssignetContacts(loggedInUser)
  // generateAddTaskSideMenu()
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
    <div class="taskCards" onclick="openCardContainer('${element["id"]}')" draggable="true" ondragstart="startDragging(${element["id"]})">
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

// function generateAddTaskSideMenu() {
//   document.getElementById('FirstCardRenderContainer').innerHTML=
//    `<div class="" id="menuContainerBox"onclick ="closeAddTaskMenu()" >
//   <div id="sideMenu" class="sideMenuStyle" onclick="event.stopPropagation()" >
//      <div class="header-sideMenu"><span>Add Task</span>
//         <img onclick ="closeAddTaskMenu()" class="header-sideMenuImg" src="../assets/img/close.svg" alt="">
//      </div>
//      <div class="contentContainer-sideMenu" >
//         <div class="addTask addTask-sideMenu">
//            <div action="">
//               <div class="topSektion topSektion-sideMenu">
//                  <div class="titleContainer"><input id="addTastTitel" class="inputFieldTitle inputFieldTitle-sideMenu" type="" placeholder="Enter a title"></div>
//                  <div class="description description-sideMenu">
//                     <div class="descriptionContent">
//                        <p class="descriptionText">Description
//                        <p class="descriptionText small">(optional)</p>
//                        </p>
//                     </div>
//                     <textarea  id="addTastTextArea" class="textArea" placeholder="Enter a Description" name="" id="" cols="30"
//                        rows="10"></textarea>
//                  </div>
//                  <div class="dateContent">
//                     <p class="dateTitle">Due date</p>
//                     <div class="inputfieldDateContainer modal-body">
//                        <input id="dueDateValue" class="inputfieldDate" type="text" placeholder="dd/mm/yyyy">
//                        <img class="dateImg " src="../assets/img/event.svg" onclick="shwoCurrentDate()">
//                        <div class="auto-jsCalendar d-none" id="autoJsCalendaR"></div>
//                     </div>
//                  </div>
//               </div>
//               <div class="assignedContent assignedContent-sideMenu" >
//                  <div class="assignedTitleContainer">
//                     <p class="assignedTitle">Priority
//                     <p class="assignedTitle small" >(optional)</p>
//                     </p>
//                  </div>
//                  <div class="buttonContainer"> 
//                     <button onclick="getThePriority('high')" class="prioButton">Urgent<img id="urgentPriority" class="buttonImg" src="../assets/img/prio_alta.svg" alt=""></button>
//                     <button onclick="getThePriority('medium')" class="prioButton">Medium<img id="mediumPriority" class="buttonImg" src="../assets/img/prio_media.svg" alt=""></button>
//                     <button onclick="getThePriority('low')" class="prioButton">Low<img id="lowPriority" class="buttonImg" src="../assets/img/prio_baja.svg" alt=""></button>
//                   </div>
                  
//               </div>
//               <div class="assignedContent assignedContent-sideMenu" >
//                  <div class="assignedTitleContainer">
//                     <p class="assignedTitle">Assignet to
//                     <p class="assignedTitle small" >(optional)</p>
//                     </p>
//                  </div>
//                  <select class="assignedSelect">
//                     <option>Select contacts to assign</option>
//                     <option value="User1">User1</option>
//                     <option value="User2">User2</option>
//                     <option value="User3">User3</option>
//                  </select>
//               </div>
//               <div class="assignedContent assignedContent-sideMenu" >
//                  <div class="assignedTitleContainer">
//                     <p class="assignedTitle">Category</p>
//                  </div>
//                  <select class="assignedSelect">
//                     <option>Select task catergory</option>
//                     <option value="User1">User1</option>
//                     <option value="User2">User2</option>
//                     <option value="User3">User3</option>
//                  </select>
//               </div>
//               <div class="SubtaskContent" >
//                  <div class="assignedTitleContainer">
//                     <p class="assignedTitle">Subtask
//                     <p class="assignedTitle small" >(optional)</p>
//                     </p>
//                  </div>
//                  <input placeholder="Add new subtask" class="subtaskInput">
//                  <button onclick="createNewTask()">createTask</button>
//               </div>
//            </div>
//         </div>
//      </div>
//   </div>
// </div>`
// }


function showAddTaskMenu() {
  // document.getElementById("FirstCardRenderContainer").classList.remove("d-none");
  document.getElementById("menuContainerBox").classList.add("menuContainer");
  document.getElementById("sideMenu").classList.add("showmenu");
}

function closeAddTaskMenu() {
  document.getElementById("menuContainerBox").classList.remove("menuContainer");
  document.getElementById("sideMenu").classList.remove("showmenu");
}

function openCardContainer(element) { // noch später auf die karten übergeben
 
  document.getElementById("FirstCardRenderContainer").classList.remove("d-none");
  document.getElementById("FirstCardRenderContainer").innerHTML=
  
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
        <div onclick="openEditContainer(${allTask[0][element]["id"]})" class="openCardIconsImgContainer" >
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
  <div id="openEditContainer" onclick="closeEditContainer()"  class="openCardContainer" >
         <div onclick="event.stopPropagation()"  class="openCardsDetailsEdit">
            <div class="header-EditMenu">
               <img onclick ="closeEditContainer()" class="header-editMenuImg" src="../assets/img/close.svg" alt="">
            </div>
            <div class="contentContainer-sideMenu" >
               <div class="addTask addTask-sideMenu editMenu">
                  <div action="">
                     <div class="topSektion topSektion-sideMenu">
                        <div class="titleContainer"><input class="inputFieldTitle inputFieldTitle-sideMenu" type="" placeholder=${allTask[0][element]["title"]}></div>
                        <div class="description description-sideMenu">
                           <div class="descriptionContent">
                              <p class="descriptionText">Description
                              <p class="descriptionText small">(optional)</p>
                              </p>
                           </div>
                           <textarea class="textArea" placeholder=${allTask[0][element]["description"]} name="" id="" cols="30"
                              rows="10"></textarea>
                        </div>
                        <div class="dateContent">
                           <p class="dateTitle">Due date</p>
                           <div class="inputfieldDateContainer"><input class="inputfieldDate" type="text"
                              placeholder=${allTask[0][element]["date"]}>
                              <img class="dateImg" src="../assets/img/event.svg" alt="">
                           </div>
                        </div>
                     </div>
                     <div class="assignedContent assignedContent-sideMenu" >
                        <div class="assignedTitleContainer">
                           <p class="assignedTitle">Priority
                           <p class="assignedTitle small" >(optional)</p>
                           </p>
                        </div>
                        <div class="buttonContainer"> 
                           <button class="prioButtonRed">Urgent<img class="buttonImg" src="../assets/img/prio_alta.svg" alt=""></button>
                           <button class="prioButtonYellow">Medium<img class="buttonImg" src="../assets/img/prio_media.svg" alt=""></button>
                           <button class="prioButtonGreen">Low<img class="buttonImg" src="../assets/img/prio_baja.svg" alt=""></button>
                        </div>
                     </div>
                     <div class="assignedContent assignedContent-sideMenu" >
                        <div class="assignedTitleContainer">
                           <p class="assignedTitle">Assignet to
                           <p class="assignedTitle small" >(optional)</p>
                           </p>
                        </div>
                        <select class="assignedSelect">
                           <option>Select contacts to assign</option>
                           <option value="User1">User1</option>
                           <option value="User2">User2</option>
                           <option value="User3">User3</option>
                        </select>
                     </div>
                     <div class="SubtaskContentEdit" >
                        <div class="assignedTitleContainer">
                           <p class="assignedTitle">Subtask
                           <p class="assignedTitle small" >(optional)</p>
                           </p>
                        </div>
                        <input placeholder="Add new subtask" class="subtaskInput">
                        <div class="openCardCheckbox">
                           <div class="subtaskText">Implement Recipe Recommendation</div >
                           <div class="subtaskText">Implement Recipe Recommendation</div >
                           <div class="subtaskText">Implement Recipe Recommendation</div >
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div class="buttonContainerEdit" > <button onclick ="closeEditContainer()" class="displayFlex btnCreateContact">Ok<img
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
