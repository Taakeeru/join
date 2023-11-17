let allTasks =[];

async function initAddTask() {
    getAllTasks();
    loggedInUser = await getLoggedInUser();
    showProfileInitials(loggedInUser);
    loadUsers();
    highlightTitle('add-task');
    showAssignetContacts(loggedInUser);
}


async function getAllTasks() {
  try {
      allTasks = JSON.parse(await getItem('newTask'));
  } catch(e) {
      console.error('Loading error:', e);
  }
}
// async function createNewTask() {
//   let getTitle = document.getElementById('addTastTitel').value;
//   let getDescription = document.getElementById('addTastTextArea').value;
//   let getDateValue = document.getElementById('dueDateValue').value;

//   getTitle = getTitle.trim(); // Ensure title is not empty

//   const existingTaskIndex = allTasks.findIndex(task => task.title === getTitle);

//   if (existingTaskIndex === -1) {
//     let newTask = ({
//       title: getTitle,
//       description: getDescription,
//       date: getDateValue,
//     });
//     allTasks.push(newTask);
//     console.log(allTasks);
//   } else {
//     alert('Task bereits vorhanden');
//   }
//   // Update the local storage with the modified array
//   await setItem('newTask', JSON.stringify(allTasks));
// }

async function createNewTask(){
  let getTitel = document.getElementById('addTastTitel').value;
  let getTextArea = document.getElementById('addTastTextArea').value;
  let getDateValue = document.getElementById('dueDateValue').value; // date muss vermutlich überarbeitet werden
  // let getPriority = getThePriority();
  // let seeContacts = await getItem('users', loggedInUser.contacts);
  // let assignetTo = JSON.parse(seeContacts);
  let getCategory = loadCategory(); 
  let getSubtask = addedSubtask();
  await pushTaskInfo(getTitel, getTextArea, getDateValue, getCategory, getCategory, getSubtask);
  
}

// function getThePriority(priority) {
//   selectedPriority = priority;
// }

async function pushTaskInfo(getTitle, getDescription, getDateValue, getCategory, getCategory, getSubtask) {
  getTitle = getTitle.trim(); // Ensure title is not empty
  const existingTaskIndex = allTasks.findIndex(task => task.title === getTitle);

  if (existingTaskIndex === -1) {
    let newTask = ({
      id: allTasks.length, 
      title: getTitle,
      description: getDescription,
      date: getDateValue,
      workCategory: getCategory,
      subtask: getSubtask,
      category: "ToDo"
    });
    allTasks.push(newTask);
    console.log(allTasks);
    alert('Task angelegt');
  } else {
    alert('Task bereits vorhanden');
  }
  // Update the local storage with the modified array
  await setItem('newTask', JSON.stringify(allTasks));
}



// ---------------------------------------Remote
function checkInputFields() {
    let titleInput = document.getElementById('addTastTitel');
    let descriptionInput = document.getElementById('addTastTextArea');
    let dateInput = document.getElementById('dueDateValue');
  
    let titleFail = document.getElementById('tile-fail-message');
    let descriptionFail = document.getElementById('description-fail-message');
    let dateFail = document.getElementById('date-fail-message');
  
    titleFail.innerHTML = '';
    descriptionFail.innerHTML = '';
    dateFail.innerHTML = '';
  
    if (titleInput.value.trim() === '') {
      titleFail.innerHTML = '<span>Title is required</span>';
  }
  
    if (descriptionInput.value.trim() === '') {
      descriptionFail.innerHTML = '<span>Description is required</span>';
    }
  
    if (dateInput.value.trim() === '') {
      dateFail.innerHTML = '<span>Due date is required</span>';
    }
  }

  function test() {
    let box = document.getElementById("selectContainer");
    box.classList.toggle("d-none");
  }

function showAssignetContacts(loggedInUser) {
  let box = document.getElementById("selectContainer");
  
  // let getUser = await getItem('loggedInUser', JSON.parse(loggedInUser.contacts));
  for (let i = 0; i < loggedInUser.contacts.length; i++) {
    let userName = loggedInUser.contacts[i].name;
    let getInitial = loggedInUser.contacts[i].initial;
    let getColor = loggedInUser.contacts[i].color;

    box.innerHTML += /*html*/`
      <div class="userBoxContainer displayFlex">
        <div class="imgPerson displayFlex" style="background-color: ${getColor};">${getInitial}</div>
        <span class="userPosition">${userName}</span>
        <input type="checkbox" id="inputId${i}" onclick="handleCheckboxClick('${i}', '${userName}', '${getInitial}', '${getColor}')">
      </div>`;
  }
}

function handleCheckboxClick(i, userName, getInitial, getColor) {

  let checkbox = document.getElementById(`inputId${i}`);
  let addUser = document.getElementById("addContactstoassign");
  let userId = `user_${i}`;


  if (checkbox.checked) {
   
    addUser.innerHTML += `<div id="${userId}" class="userBoxContainer displayFlex">
      <div class="imgPerson displayFlex" style="background-color: ${getColor};">${getInitial}</div>
    </div>`;
  } else {
    
    let userToRemove = document.getElementById(userId);
    if (userToRemove) {
      userToRemove.remove();
    }
  }
}

  function closeSelectContainer(event) {
  let selectContainer = document.getElementById("selectContainer");
  let assignedSelect = document.getElementById("assignedSelect");

  if (!assignedSelect.contains(event.target) && !selectContainer.contains(event.target)) {
    
    selectContainer.classList.add("d-none");
  }
}

function showCategoryContacts() {
  document.getElementById("categoryContainer").classList.toggle("d-none");

}

function closeCategoryContainer(event) {
  let selectContainer = document.getElementById("categoryContainer");
  let assignedSelect = document.getElementById("categorySelect");

  if (!assignedSelect.contains(event.target) && !selectContainer.contains(event.target)) {
    
    selectContainer.classList.add("d-none");
  }
}

function addSubTask() {
  let subtaskInput = document.getElementById('subtaskInput');
  let addTask =  document.getElementById('subtaskContainer');
  let subtaskValue = subtaskInput.value;
  let subtaskId = 'subtask' + Date.now();
  
  if (subtaskValue.trim() !== '') { 
    addTask.innerHTML += /*html*/`
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


function loadTechnicalTask() {
  let Box = document.getElementById('technicalTaskID');
  let currentValue = Box.innerHTML;

  if (currentValue === "Technical Task") {
    document.getElementById('SelectTaskCatergory').innerHTML = currentValue;
  }
}


function loadUserStory(){
  let Box = document.getElementById('userStoryID');
  let currentValue = Box.innerHTML;

  if (currentValue === "User Story") {
    document.getElementById('SelectTaskCatergory').innerHTML = currentValue;
  }
}


function loadCategory(){
  let getValue = document.getElementById('categorySelect').textContent.trim();
  return getValue;
}


function addedSubtask(){
  let box = document.getElementById("subtaskValue").value;
  return box.textContent;
}


function editSubtask(subtaskId) {
  let editedValue = document.getElementById(subtaskId).textContent;
  console.log('Edit Subtask:', editedValue);
  // Füge hier den Code für die Bearbeitung des Subtasks hinzu
}


function deleteSubtask(subtaskId) {
  document.getElementById(subtaskId).parentNode.parentNode.remove();
}