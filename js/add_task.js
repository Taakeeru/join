

async function initAddTask() {
    loggedInUser = await getLoggedInUser();
    showProfileInitials(loggedInUser);
    loadUsers();
}

function checkInputFields() {
    let titleInput = document.getElementById('title-fail');
    let descriptionInput = document.getElementById('description-fail');
    let dateInput = document.getElementById('date-fail');
  
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

  function showAssignetContacts() {
    document.getElementById("selectContainer").classList.toggle("d-none");
  
  }

  
  function closeSelectContainer(event) {
  let selectContainer = document.getElementById("selectContainer");
  let assignedSelect = document.getElementById("assignedSelect");

  if (!assignedSelect.contains(event.target) && !selectContainer.contains(event.target)) {
    
    selectContainer.classList.add("d-none");
  }
}

 