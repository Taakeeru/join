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