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


function updateContainer(category, taskList) {
  let container = document.getElementById(category);
  container.innerHTML = "";

  if (taskList.length === 0) {
    container.innerHTML = generatePlaceholderTasks(category);
  } else {
    for (let index = 0; index < taskList.length; index++) {
      const element = taskList[index];
      container.innerHTML += generateTodoHTML(element, getPriorityImagePath(element.priority));
    }
  }
}


function updateHTML(getTaskInfo) {
  selectedUsers = [];

  const toDolist = getTaskInfo.filter((t) => t["category"] === "toDo");
  updateContainer("toDo", toDolist);

  const progressList = getTaskInfo.filter((t) => t["category"] === "progress");
  updateContainer("progress", progressList);

  const feedbackList = getTaskInfo.filter((t) => t["category"] === "feedBack");
  updateContainer("feedBack", feedbackList);

  const doneList = getTaskInfo.filter((t) => t["category"] === "done");
  updateContainer("done", doneList);
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
  document.getElementById('FirstCardRenderContainer').innerHTML = generateTemplateHtmlSideMenu();
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
  generateTemplateHtmlFirstCard(allTask[0][currentIndex], currentIndex,priorityText,priorityImagePath,element);

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
  let contactsHTML = "";  

  for (let i = 0; i < allTask[0][currentIndex]["contacts"].length; i++) {
    const contact = allTask[0][currentIndex]["contacts"][i];
    contactsHTML += generateTemplateHtmlUserDate(contact);
  }
  userDateRender.innerHTML = contactsHTML;
}


function renderSubtasks(element, subtasks) {
  let subtasksHTML = "";
  for (let i = 0; i < subtasks.length; i++) {
    const subtask = subtasks[i];
    const isChecked = subtask.status === true; 

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
  
    for (let j = 0; j < allTask[0].length; j++) {
     
      if (allTask[0][j].subtasks) {
        const subtaskIndex = allTask[0][j].subtasks.findIndex(subtask => subtask.id === subtaskIdToUpdate);
  
        if (subtaskIndex !== -1) {
          allTask[0][j].subtasks[subtaskIndex].status = newStatusValue;
        }
      }
    }
    await setItem('newTask', JSON.stringify(allTask[0]));
    updateProgressBarOnload()
  
    console.log(allTask[0]);
}
  
  
async function updateProgressBar(element, subtaskId) {
  const progressBar = document.getElementById(`subtaskProgressBar${element}`);

  if (!selectedSubtaskCounts[element]) {
    selectedSubtaskCounts[element] = {};
  }

  await setItem('newTask', JSON.stringify(allTask[0][currentIndex].taskbar));
}


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


function openEditContainer(element) {
  selectedUsers = allTask[0][element]["contacts"];
  let selectedSubrasks = allTask[0][element]["subtasks"];
  let getId = allTask[0][element]["id"];
  document.getElementById("secondCardRenderContainer").classList.remove("d-none");
  document.getElementById("openCardContainer").classList.add("d-none");

  document.getElementById("secondCardRenderContainer").innerHTML=generateTemplateHtmlEditCard(allTask[0][element], element,getId);
      
      renderContactsSmall(allTask[0][element]);
      rederCurrentTasks(selectedSubrasks);
}
 

function renderContactsSmall(element) {
  let box = document.getElementById('addContactstoassign2');
  box.innerHTML = '';
   
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
  box.innerHTML = ''; 

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

  let info = await getItem('newTask');
  let getTaskInfo = JSON.parse(info);
  let currentID = Number(getId);

  let taskToEditIndex = getTaskInfo.findIndex(task => task.id === currentID);

  if (taskToEditIndex === -1) {
    console.error('Task not found for editing');
    return;
  }

  let getTitel = document.getElementById('addTastTitel2').value;
  let getDiscriptionArea = document.getElementById('addTastTextArea2').value;
  let getCategory = loadCategory2();
  let getPrio = selectedPriority;
  let getSubtask = currentSubtasksBoard;

  getTaskInfo[taskToEditIndex].title = getTitel;
  getTaskInfo[taskToEditIndex].description = getDiscriptionArea;
  getTaskInfo[taskToEditIndex].workCategory = getCategory;
  getTaskInfo[taskToEditIndex].priority = getPrio;
  getTaskInfo[taskToEditIndex].subtasks = getSubtask;
  getTaskInfo[taskToEditIndex].contacts = selectedUsers;
  await setItem('newTask', JSON.stringify(getTaskInfo));
  allTask[0][taskToEditIndex] = getTaskInfo[taskToEditIndex];
  updateHTML(getTaskInfo);
}


function createNewTask2(getId) {
  editTask(getId);
    let selectedContacts = selectedUsers;
    let usersHTML = "";
    let contactsHTML = "";
    for (let i = 0; i < contactData.length; i++) {
      usersHTML += generateTemplateHtmlCreateNewTask2(contactData,i,selectedContacts);
    }
  
    for (let i = 0; i < selectedContacts.length; i++) {
      contactsHTML += /*html*/`
        <div class="userBoxContainer displayFlex">
          <div class="imgPerson displayFlex" style="background-color: ${selectedContacts[i].color};">${selectedContacts[i].initial}</div>
          <span class="userPosition">${selectedContacts[i].name}</span>
        </div>`;
        }
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
    
    let indexToRemove = selectedUsers.findIndex(user => user.name === userName);

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