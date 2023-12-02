let firstLetter = [];
let newContactData = [];
let firstLetterOfContatcs = [];
let currentContact = null;
let currentDetails = [];


async function init() {
    await includeHTML();
    highlightTitle('contacts');
    highlightTitleMobile('contacts-mobile');
    loggedInUser = await getLoggedInUser();
    showProfileInitials(loggedInUser);
    loadUsers();
    generateContactInSmall();
}


async function addContactToUserContacts(loggedInUser, name, email, phone, intial, getColor) {
    pushContactInfo(loggedInUser.contacts, name, email, phone, intial, getColor);
    const userIndex = users.findIndex(user => user.id === loggedInUser.id);

    if (userIndex !== -1) {
        pushContactInfo(users[userIndex].contacts, name, email, phone, intial, getColor);
        await setItem('users', JSON.stringify(users));
    } else {
        console.error('User not found in users array');
    }
    await setItem('loggedInUser', JSON.stringify(loggedInUser));
    getLoggedInUser();
}


async function createNewContact() {
    let name = document.getElementById('nameAddContact');
    let email = document.getElementById('emailAddContact');
    let phone = document.getElementById('phoneAddContact');

    let loggedInUser = await getLoggedInUser() || { contacts: [] };
    let test = generateRandomColor();
    let storedColor = localStorage.getItem(test);
    let getColor = storedColor || generateRandomColor();
    
    let sortedContacts = document.getElementById('nameAddContact').value;
    let intial = getInitialContacts(sortedContacts);

    await addContactToUserContacts(loggedInUser, name.value, email.value, phone.value, intial, getColor);
    resetForm(name, email, phone);
    generateContactInSmall();
    removeClassesByNewContacts();
    addContactAnimation();
}


function pushContactInfo(contacts, name, email, phone, intial, getColor) {
    contacts.push({
        name: name,
        email: email,
        phone: phone,
        initial: intial,
        color: getColor
    });
}


function resetForm(name, email, phone) {
    name.value = '';
    email.value = '';
    phone.value = '';
}


function getInitialContacts(sortedContacts){
    const username = sortedContacts.split(' ');
    let initialString = '';
    for (const name of username) {
        initialString += name.charAt(0).toUpperCase();
    }
    return initialString;
} 


async function generateContactInSmall() {
    let contact = document.getElementById('contactInSmall');
    contact.innerHTML = '';
    let loggedInUser = await getLoggedInUser() || { contacts: [] };
    let sortedContacts = sortByFirstLetter(loggedInUser.contacts);
    let currentLetter = null;

    for (let i = 0; i < sortedContacts.length; i++) {
        let initial = sortedContacts[i].initial;
        let contactData = sortedContacts[i];
        let firstLetter = sortedContacts[i].name.charAt(0).toUpperCase();
        let color = sortedContacts[i].color;
        if (firstLetter !== currentLetter) {
            contact.innerHTML += generateContactInSmallHtml(firstLetter);
            currentLetter = firstLetter;
        }
        contact.innerHTML += generateContactInSmallHtml2(contactData.name, contactData.email, contactData.phone, initial, color, i);
    }
}


function sortByFirstLetter(contacts) {
    return contacts.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        return nameA.localeCompare(nameB);
    });
}


function generateRandomColor(){
    let hexArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
    let code = "";
    for(let i=0; i<6; i++){
     code += hexArray[Math.floor(Math.random()*16)];
    }
    return `#${code}`    
}


function showDetailsOfContact(newName, newEmail, newPhone, initial, color, i) {
    let detailsContact = document.getElementById('boxOfDetailsContacts');
    detailsContact.classList.remove('d-none');
  
    if (currentContact === newName) {
      detailsContact.innerHTML = '';
      removeClassesByShowDetailsOfContact(i);
      currentContact = null;
    } else {
        elsePartOfshowDetailsOfContact(newName, newEmail, newPhone, initial, color, i);
    }
}


function elsePartOfshowDetailsOfContact(newName, newEmail, newPhone, initial, color, i){
    let detailsContact = document.getElementById('boxOfDetailsContacts');
    if (currentContact) {
        const previousContactElement = document.getElementById(`addBackgroung${currentContactIndex}`);
        previousContactElement.classList.remove('sizeOfContactBoxOnclick');
        document.getElementById(`changeStyleEMail${currentContactIndex}`).classList.remove('changeStyleMail');
      }
      document.getElementById(`addBackgroung${i}`).classList.add('sizeOfContactBoxOnclick');
      detailsContact.innerHTML = showDetailsOfContactHtml(color, initial, newName, newEmail, newPhone);
      
      saveVariable(newName, newEmail, newPhone, initial, color);

      document.getElementById(`changeStyleEMail${i}`).classList.add('changeStyleMail');
      startAnimation();
      currentContact = newName;
      currentContactIndex = i;
}


function saveVariable(newName, newEmail, newPhone, initial, color){
    currentDetails = {
        newName: newName,
        newEmail: newEmail,
        newPhone: newPhone,
        initial: initial,
        color: color
    };
}


function returnArrow() {
    document.getElementById('boxOfDetailsContacts').classList.add('d-none');
    document.getElementById('boxOfAddingNewContact').style.backgroundColor = null;
}


function addNewContactBtn(){   
    document.getElementById('addBox').classList.add('backgoundBox');
    document.getElementById('boxOfAddingNewContact').classList.add('showSideWindow');
    document.getElementById('boxOfAddingNewContact').innerHTML = addNewContactBtnHtml();
}


function loadMoreVert() {
    let editBox = document.getElementById('responsiveEdit');
    editBox.classList.remove('d-none');
    editBox.innerHTML = loadMoreVertHtml(currentDetails.newName, currentDetails.newEmail, currentDetails.newPhone, currentDetails.initial, currentDetails.color);
}


function closeInfoContainer(event) {
    let box = document.getElementById('responsiveEdit');
    let moreVertButton = document.getElementById('moreVertButtonId');
    if (!box.contains(event.target) && event.target !== moreVertButton) { 
        box.classList.add("d-none");
    }
}


function closeAddContactWindow(){
    document.getElementById('addBox').classList.remove('backgoundBox');
    document.getElementById('boxOfAddingNewContact').classList.remove('showSideWindow');
}


function closeAddContactBoxWithX(){
    document.getElementById('addBox').classList.remove('backgoundBox');
    document.getElementById('boxOfAddingNewContact').classList.remove('showSideWindow');
}


async function editContact(newName, newEmail, newPhone, initial, color){
    document.getElementById('addBox').classList.add('backgoundBox');
    document.getElementById('boxOfEdingContact').classList.add('showSideWindow');
    let valueBox = document.getElementById('boxOfEdingContact');
    valueBox.innerHTML = '';
    valueBox.innerHTML = editContactHtml(color, initial, newName, newEmail, newPhone);
    setValueInIput(newName, newEmail, newPhone);
}


function setValueInIput(newName, newEmail, newPhone){
    document.getElementById('nameEditContact').value = newName;
    document.getElementById('emailEditContact').value = newEmail;
    document.getElementById('phoneEditContact').value = newPhone;
}


function closeEditContactBox(){
    document.getElementById('addBox').classList.remove('backgoundBox');
    document.getElementById('boxOfEdingContact').classList.remove('showSideWindow');
}


async function deleteContact(newName, newEmail, newPhone, initial, color) {
    const contactToDelete = getContact4Delete(newName, newEmail, newPhone, initial, color);

    if (contactToDelete) {
        loggedInUser.contacts = loggedInUser.contacts.filter(contact =>
            contact !== contactToDelete
        );
        const userIndex = users.findIndex(user => user.id === loggedInUser.id);
        users[userIndex].contacts = loggedInUser.contacts;

        await setItem('loggedInUser', JSON.stringify(loggedInUser));
        await generateContactInSmall();
        changeClassesAfterDelete();
    } else {
        console.error('Contact not found in loggedInUser.contacts array');
    }
}

function getContact4Delete(newName, newEmail, newPhone, initial, color) {
    return loggedInUser.contacts.find(contact =>
        contact.name === newName &&
        contact.email === newEmail &&
        contact.phone === newPhone &&
        contact.initial === initial &&
        contact.color === color
    );
}



async function saveEditContactWindow(newName, newEmail, newPhone) {
    const userIndex = users.findIndex(user => user.id === loggedInUser.id);
    const contactIndex = loggedInUser.contacts.findIndex(contact =>
        contact.name === newName && contact.email === newEmail && contact.phone === newPhone
    );
    if (contactIndex !== -1) {
        loggedInUser.contacts[contactIndex].name = document.getElementById('nameEditContact').value.trim();
        loggedInUser.contacts[contactIndex].email = document.getElementById('emailEditContact').value.trim();
        loggedInUser.contacts[contactIndex].phone = document.getElementById('phoneEditContact').value.trim();
        users[userIndex].contacts = loggedInUser.contacts;

        await setItem('loggedInUser', JSON.stringify(loggedInUser));
        removeClassesAfterEdit();
        await generateContactInSmall();
    } else {
        console.error('Contact could not be found');
    }
}


async function addContactAnimation() {
    const successMessage = document.getElementById('successMessage');

    successMessage.classList.remove('d-none');
    await new Promise(resolve => setTimeout(resolve, 2500));
    successMessage.classList.add('slideUpDown');
    await new Promise(resolve => setTimeout(resolve, 300));
    successMessage.classList.remove('slideUpDown');
    successMessage.classList.add('d-none');
}


/**
 * The line void box.offsetWidth; is a trick 
 * that ensures that the browser has applied the previous change before the class is added again. 
 * This is sometimes referred to as the "reflow trick".
 */
function startAnimation() {
    let box = document.getElementById('boxOfDetailsContacts');
    box.classList.remove('slideIn');
    void box.offsetWidth; 
    box.classList.add('slideIn');
}