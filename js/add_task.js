let allTasks =[];
let contactData = [];
let selectedPriority;
let currentSubtasks = [];
let checked = true;

async function initAddTask() {
  await includeHTML();
  highlightTitle('add-task');
  highlightTitleMobile('add-task-mobile');
  getAllTasks();
  loggedInUser = await getLoggedInUser();
  showProfileInitials(loggedInUser);
  loadUsers();
  showAssignetContacts(loggedInUser);
}


async function getAllTasks() {
  try {
      allTasks = JSON.parse(await getItem('newTask'));
  } catch(e) {
      console.error('Loading error:', e);
  }
}


async function createNewTask(){
  // if (checkInputFields()) {
  let getTitel = document.getElementById('addTastTitel').value;
  let getTextArea = document.getElementById('addTastTextArea').value;
  let getDateValue = document.getElementById('dueDateValue').value;
  // let contactData = await showAssignetContacts(loggedInUser);
  // let assignetTo = JSON.parse(seeContacts);
  let getCategory = loadCategory(); 
  // let getSubtask = addedSubtask();
  await pushTaskInfo(getTitel, getTextArea, getDateValue, selectedUsers, getCategory,selectedPriority,currentSubtasks);
// } else {
  console.log('Not all fields are filled out correctly');
 
// }
}

function clearArray(){
  allTasks.splice(0, allTasks.length);
}
function clearTasksArray() {
  if (confirm('Are you sure you want to clear all tasks?')) {
    clearArray(); // Assuming clearArray is the function that clears the array
    setItem('newTask', JSON.stringify([])) // Also clear the data in the backend
      .then(() => {
        console.log('Tasks array cleared');
      })
      .catch((error) => {
        console.error('Error clearing tasks array:', error);
      });
  }
}

async function pushTaskInfo(getTitle, getDescription, getDateValue, contactData, getCategory, selectedPriority, currentSubtasks){
  getTitle = getTitle.trim();

  // Fetch existing tasks from the backend
  let existingTasks;
  try {
    existingTasks = JSON.parse(await getItem('newTask'));
  } catch (e) {
    console.error('Error fetching existing tasks:', e);
    existingTasks = [];
  }

  // Check if the task with the same title already exists
  const existingTaskIndex = existingTasks.findIndex((task) => task.title === getTitle);

  if (existingTaskIndex === -1) {
    // Task does not exist, create a new one
    let newTask = {
      id: existingTasks.length,
      title: getTitle,
      description: getDescription,
      priority: selectedPriority,
      date: getDateValue,
      contacts: contactData,
      workCategory: getCategory,
      category: "toDo",
      subtasks: currentSubtasks,
      isChecked: checked 
    };

    existingTasks.push(newTask);
    // Update the backend with the modified task list
    await setItem('newTask', JSON.stringify(existingTasks));

    console.log(existingTasks);
    await showCreateAnimation();
  } else {
    // Task with the same title already exists
    alert('Task bereits vorhanden');
  }
}


async function showCreateAnimation(){
  const successMessage = document.getElementById('animation');

  successMessage.classList.remove('d-none');
  await new Promise(resolve => setTimeout(resolve, 2500));
  successMessage.classList.add('slideUpDown');
  await new Promise(resolve => setTimeout(resolve, 300));
  successMessage.classList.remove('slideUpDown');
  successMessage.classList.add('d-none');
}



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

    let isValid=true;
  
    if (titleInput.value.trim() === '') {
      titleFail.innerHTML = '<span>Title is required</span>';
      isValid = false;
  }
  
    if (descriptionInput.value.trim() === '') {
      descriptionFail.innerHTML = '<span>Description is required</span>';
      isValid = false;
    }
  
    if (dateInput.value.trim() === '') {
      dateFail.innerHTML = '<span>Due date is required</span>';
      isValid = false;
    }
    return isValid;
  }

  function getThePriority(priority, lowId, mediumId, highId) {
    const low = document.getElementById(lowId);
    const medium = document.getElementById(mediumId);
    const urgent = document.getElementById(highId);
    const lowIcon = document.getElementById("lowPriority");
    const mediumIcon = document.getElementById("mediumPriority");
    const highIcon = document.getElementById("urgentPriority");

  
    if (low && medium && urgent && lowIcon && mediumIcon && highIcon) {
      low.classList.remove("active3");
      medium.classList.remove("active2");
      urgent.classList.remove("active");
      lowIcon.classList.remove("colorIcon3");
      mediumIcon.classList.remove("colorIcon2");
      highIcon.classList.remove("colorIcon");
  
      if (selectedPriority === priority) {
        selectedPriority = null;
      } else {
        selectedPriority = priority;
  
        if (selectedPriority === 'low') {
          low.classList.add("active3");
          lowIcon.classList.add("colorIcon3");
        } else if (selectedPriority === 'medium') {
          medium.classList.add("active2");
          mediumIcon.classList.add("colorIcon2");
        } else if (selectedPriority === 'high') {
          urgent.classList.add("active");
          highIcon.classList.add("colorIcon");
        }
      }
    } else {
      console.error("Ein oder mehrere Elemente wurden nicht gefunden.");
    }
  }
  
function getThePriority2(priority, lowId, mediumId, highId) {
  const low2 = document.getElementById(`${lowId}2`);
  const medium2 = document.getElementById(`${mediumId}2`);
  const urgent2 = document.getElementById(`${highId}2`);
  const lowIcon2 = document.getElementById("lowPriority2");
  const mediumIcon2 = document.getElementById("mediumPriority2");
  const highIcon2 = document.getElementById("urgentPriority2");

  if (`${lowId}2` && `${mediumId}2` && `${highId}2` && lowIcon2 && mediumIcon2 && highIcon2) {
    low2.classList.remove("active3");
    medium2.classList.remove("active2");
    urgent2.classList.remove("active");
    lowIcon2.classList.remove("colorIcon3");
    mediumIcon2.classList.remove("colorIcon2");
    highIcon2.classList.remove("colorIcon");

    if (selectedPriority === priority) {
      selectedPriority = null;
    } else {
      selectedPriority = priority;

      if (selectedPriority === 'low') {
        low2.classList.add("active3");
        lowIcon2.classList.add("colorIcon3");
      } else if (selectedPriority === 'medium') {
        medium2.classList.add("active2");
        mediumIcon2.classList.add("colorIcon2");
      } else if (selectedPriority === 'high') {
        urgent2.classList.add("active");
        highIcon2.classList.add("colorIcon");
      }
    }
  } else {
    console.error("Ein oder mehrere Elemente wurden nicht gefunden.");
  }
}


function addContacts() {
    let box = document.getElementById("selectContainer");
    box.classList.toggle("d-none");
  }

  async function showAssignetContacts(loggedInUser) {
    let box = document.getElementById("selectContainer");
  
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
  

  let selectedUsers = [];

  function handleCheckboxClick(i, userName, getInitial, getColor) {
    let checkbox = document.getElementById(`inputId${i}`);
    let addUser = document.getElementById("addContactstoassign");
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

    currentSubtasks.push({id: subtaskId,value: subtaskValue,});
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
  
}


function deleteSubtask(subtaskId) {
  document.getElementById(subtaskId).parentNode.parentNode.remove();
}