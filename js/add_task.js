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
  // let date = new Date();
  // let getPriority = getThePriority();
  // let seeContacts = await getItem('users', loggedInUser.contacts);
  // let assignetTo = JSON.parse(seeContacts);
  // let getCategory = document.getElementById('chooseTheCategory').innerHTML; // evl muss da value hin
  // let getSubtask = document.getElementById('addSubtaskContent').value;
  await pushTaskInfo(getTitel, getTextArea, getDateValue);
  
}

function getThePriority(priority) {
  selectedPriority = priority;
}

async function pushTaskInfo(getTitle, getDescription, getDateValue) {
  getTitle = getTitle.trim(); // Ensure title is not empty
  const existingTaskIndex = allTasks.findIndex(task => task.title === getTitle);

  if (existingTaskIndex === -1) {
    let newTask = ({
      id: allTasks.length, 
      title: getTitle,
      description: getDescription,
      date: getDateValue,
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

function showAssignetContacts(loggedInUser) {
  let box = document.getElementById("selectContainer");
  box.classList.toggle("d-none");
  // let getUser = await getItem('loggedInUser', JSON.parse(loggedInUser.contacts));
    for (let i = 0; i < loggedInUser.contacts.length; i++) {
    let userName = loggedInUser.contacts[i].name;
    let getInitial = loggedInUser.contacts[i].initial;
    let getColor = loggedInUser.contacts[i].color;
    box.innerHTML += /*html*/`
      <div class="userBoxContainer">
        <div class="${getColor}">${getInitial}</div>
        <span class="userPosition">${userName}</span>
        <input type="checkbox" id="clicktedSchenBox"> 
      </div>`;
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

  if (subtaskValue.trim() !== '') {
    
    addTask.innerHTML += /*html*/`
    <ul class="lsitSubtask">
      <li class="subtaskList">${subtaskValue} 
      <div class="displayFlex"><img src="../assets/img/edit.svg" onclick="editSubtask()" class="subtaskEditImg">|
      <img src="../assets/img/delete.svg" onclick="deleteSubtask()" class="subtaskDeleteImg">
      </div></li>
    </ul>`;
    subtaskInput.value = '';
  }
}

 