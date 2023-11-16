let firstLetter = [];
let newContactData = [];
let firstLetterOfContatcs = [];
let currentContact = null;



async function init() {
    includeHTML();
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
    document.getElementById('addBox').classList.remove('backgoundBox');
    document.getElementById('boxOfAddingNewContact').classList.remove('showSideWindow');
    document.getElementById('boxOfDetailsContacts').innerHTML ='';
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
            // Buchstabe und Linie hinzufügen
            contact.innerHTML += /*html*/`
                <div class="positionLetterContact">
                    <p class="letterContact" id="letterContact">${firstLetter}</p>
                </div>
                <div class="positionLineContact">
                    <p class="lineContact"></p>
                </div>`;
            currentLetter = firstLetter;
        }

        // Kontakt hinzufügen
        contact.innerHTML += /*html*/`
            <div class="sizeOfContactBox displayFlex" id="addBackgroung${i}" onclick="showDetailsOfContact('${contactData.name}', '${contactData.email}', '${contactData.phone}', '${initial}', '${color}', '${i}')">
                <div id="renderFirstLetter" style="background-color: ${color};">
                    <p class="imgOfContackt">${initial}</p>
                </div>
                <div>
                    <p style="margin: 6px;">${contactData.name}</p>
                    <p class="styleMail" id="changeStyleEMail${i}">${contactData.email}</p>
                </div>
            </div>`;
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
    detailsContact.classList.remove('addOpacity');
  
    if (currentContact === newName) {
      // If the current element is already shown, hide it
      detailsContact.innerHTML = '';
      document.getElementById(`addBackgroung${i}`).classList.remove('sizeOfContactBoxOnclick');
      document.getElementById(`changeStyleEMail${i}`).classList.remove('changeStyleMail');
      currentContact = null;
    } else {
      // Remove highlighted class from previous contact, if any
        if (currentContact) {
          const previousContactElement = document.getElementById(`addBackgroung${currentContactIndex}`);
          previousContactElement.classList.remove('sizeOfContactBoxOnclick');
          document.getElementById(`changeStyleEMail${currentContactIndex}`).classList.remove('changeStyleMail');
        }
      
        // Display the new element and add highlighted class
        document.getElementById(`addBackgroung${i}`).classList.add('sizeOfContactBoxOnclick');
        detailsContact.innerHTML = /*html*/ `
        <div class="positionHeaderContactDetails">
            <div id="randomBackgroundColor" class="bigImgContacts" style="background-color: ${color};">
                <p class="sizeOfLetterDetails">${initial}</p>
            </div>
            <div>
                <p class="nameHeaderContactDetails">${newName}</p>
                <div class="positionEditAndDelete">
                    <button onclick="editContact('${newName}','${newEmail}','${newPhone}', '${initial}', '${color}')" class="displayFlex clearBtn"><img src="../assets/img/edit.svg"
                            style="margin-right: 8px;">Edit</button>
                    <button onclick="deleteContact('${newName}','${newEmail}','${newPhone}', '${initial}', '${color}')" class="displayFlex clearBtn"><img
                            src="../assets/img/delete.svg" style="margin-right: 8px">Delete</button>
                </div>
            </div>
        </div>
        <div>
            <p class="contantInformation">Contact Information</p>
            <p style="font-weight: 600;">Email</p>
            <a href="#" class="mailContact">${newEmail}</a>
            <p style="font-weight: 600;">Phone</p>
            <p>${newPhone}</p>
        </div>`;
    
        document.getElementById(`changeStyleEMail${i}`).classList.add('changeStyleMail');
        startAnimation();
        currentContact = newName;
        currentContactIndex = i; // Update current contact index
    }
}
  


// function showDetailsOfContact(newName, newEmail, newPhone, initial, color) {
//     let detailsContact = document.getElementById('boxOfDetailsContacts');
//     detailsContact.classList.remove('addOpacity');
//     detailsContact.innerHTML = '';
//     detailsContact.innerHTML = /*html*/ `
//         <div class="positionHeaderContactDetails">
//             <div id="randomBackgroundColor" class="bigImgContacts" style="background-color: ${color};">
//                 <p class="sizeOfLetterDetails">${initial}</p>
//             </div>
//             <div>
//                 <p class="nameHeaderContactDetails">${newName}</p>
//                 <div class="positionEditAndDelete">
//                     <button onclick="editContact('${newName}','${newEmail}','${newPhone}', '${initial}', '${color}')" class="displayFlex clearBtn"><img src="../assets/img/edit.svg"
//                             style="margin-right: 8px;">Edit</button>
//                     <button onclick="deleteContact('${newName}','${newEmail}','${newPhone}', '${initial}', '${color}')" class="displayFlex clearBtn"><img
//                             src="../assets/img/delete.svg" style="margin-right: 8px">Delete</button>
//                 </div>
//             </div>
//         </div>
//         <div>
//             <p class="contantInformation">Contact Information</p>
//             <p style="font-weight: 600;">Email</p>
//             <a href="#" class="mailContact">${newEmail}</a>
//             <p style="font-weight: 600;">Phone</p>
//             <p>${newPhone}</p>
//         </div>`;
//     startAnimation();
// }


function addNewContactBtn(){   
    document.getElementById('addBox').classList.add('backgoundBox');
    document.getElementById('boxOfAddingNewContact').classList.add('showSideWindow');
    document.getElementById('boxOfAddingNewContact').innerHTML = /*html*/`
            <div class="blueBoxAddContact">
            <img src="../assets/img/capa1.svg" class="imgBlueBox">
                <h1 class="h1AddContact">Add Contact</h1>
                <p class="pAddContact">Tasks are better with a team!</p>
            </div>
            <img src="../assets/img/close.svg" class="closeAddContactBox" onclick="closeAddContactBoxWithX()">
            <div class="witheBoxAddContact">
                <form class="detailsOFAddContact" onsubmit="createNewContact(); return false;">
                    <img src="../assets/img/frame79.svg" class="witheBoxAddContactImg">
                    <div class="displayFlex">
                        <input type="text" class="inputField" placeholder="Name" minlength="2" id="nameAddContact" required>
                        <img src="../assets/img/person.svg" class="imgInInput">
                    </div>
                    <div class="displayFlex">
                        <input type="email" class="inputField" placeholder="Email" id="emailAddContact" required>
                        <img src="../assets/img/mail.svg" class="imgInInput">
                    </div>
                    <div class="displayFlex">
                        <input type="text" class="inputField" placeholder="Phone" id="phoneAddContact">
                        <img src="../assets/img/call.svg" class="imgInInput">
                    </div>
                    <div class="btnsAddContact">
                    <button class="displayFlex btnCloseContact" onclick="closeAddContactWindow()" type="button">Close <img
                            src="../assets/img/vector.svg" class="samllIconsContactX"></button>
                    <button class="displayFlex btnCreateContact" type="submit">Create contact
                        <img src="../assets/img/check.svg" class="samllIconsContactOK"></button>
                    </div>
                </form>  
            </div>`;
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
    valueBox.innerHTML = /*html*/`
            <div class="blueBoxEditContact">
                <img src="../assets/img/capa1.svg" class="imgBlueBox">
                <h1 class="h1EditContact">Edit Contact</h1>
            </div>
            <img src="../assets/img/close.svg" class="closeEditContactBox" onclick="closeEditContactBox()">
            <div class="witheBoxAddContact">
                <div class="detailsOFAddContact">
                    <div class="witheBoxAddContactImg" style="background-color: ${color};">
                        <p class="sizeOfLetterDetails">${initial}</p>
                    </div>
                    <div class="displayFlex">
                        <input type="text" class="inputField" placeholder="Name" id="nameEditContact">
                        <img src="../assets/img/person.svg" class="imgInInput">
                    </div>
                    <div class="displayFlex">
                        <input type="text" class="inputField" placeholder="Email" id="emailEditContact">
                        <img src="../assets/img/mail.svg" class="imgInInput">
                    </div>
                    <div class="displayFlex">
                        <input type="text" class="inputField" placeholder="Phone" id="phoneEditContact">
                        <img src="../assets/img/call.svg" class="imgInInput">
                    </div>
                    <div class="btnsAddContact">
                        <button class="displayFlex btnCloseContact" onclick="deleteContact('${newName}','${newEmail}','${newPhone}','${initial}')">Delete</button>
                        <button class="displayFlex btnCreateContact" onclick="saveEditContactWindow('${newName}','${newEmail}','${newPhone}','${color}')">Save <img
                                src="../assets/img/check.svg" class="samllIconsContactOK"></button>
                    </div>
                </div>
            </div>`;
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
    // Identify the contact to delete based on the name
    const contactToDelete = loggedInUser.contacts.find(contact =>
        contact.name === newName && 
        contact.email === newEmail && 
        contact.phone === newPhone && 
        contact.initial === initial && 
        contact.color === color
    );

    if (contactToDelete) {
        // Remove the identified contact from the loggedInUser's contacts
        loggedInUser.contacts = loggedInUser.contacts.filter(contact =>
            contact !== contactToDelete
        );

        // Update the loggedInUser in the users array
        const userIndex = users.findIndex(user => user.id === loggedInUser.id);
        users[userIndex].contacts = loggedInUser.contacts;

        // Save the changes
        await setItem('loggedInUser', JSON.stringify(loggedInUser));
        await generateContactInSmall();
        document.getElementById('boxOfDetailsContacts').innerHTML = '';
        document.getElementById('boxOfEdingContact').classList.remove('showSideWindow');
        document.getElementById('addBox').classList.remove('backgoundBox');
    } else {
        console.error('Contact not found in loggedInUser.contacts array');
    }
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
        await generateContactInSmall();
        document.getElementById('boxOfDetailsContacts').innerHTML ='';
        document.getElementById('addBox').classList.remove('backgoundBox');
        document.getElementById('boxOfEdingContact').classList.remove('showSideWindow');
    } else {
        console.error('Kontakt nicht gefunden im loggedInUser.contacts Array');
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