let firstLetter = [];
let newContactData = [];
let firstLetterOfContatcs = [];



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
    
    let sortedContacts = sortByFirstLetter(loggedInUser.contacts);
    let intial = getInitialContacts(sortedContacts);

    await addContactToUserContacts(loggedInUser, name.value, email.value, phone.value, intial, getColor);
    resetForm(name, email, phone);
    generateContactInSmall();
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
    document.getElementById('boxOfAddingNewContact').classList.toggle('d-none');
}


function getInitialContacts(sortedContacts){
    for (let i = 0; i < sortedContacts.length; i++) {
        const username = sortedContacts[i].name;
        const words = username.split(' ');
        let initialString = '';

        for (const word of words) {
            if (word.length > 0) {
                initialString += word[0].toUpperCase();
            }
        }
        return initialString;
    }
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
            <div class="sizeOfContactBox displayFlex" onclick="showDetailsOfContact('${contactData.name}', '${contactData.email}', '${contactData.phone}', '${initial}', '${color}')">
                <div id="renderFirstLetter" style="background-color: ${color};">
                    <p class="imgOfContackt">${initial}</p>
                </div>
                <div>
                    <p style="margin: 6px;">${contactData.name}</p>
                    <p class="styleMail">${contactData.email}</p>
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

 
function showDetailsOfContact(newName, newEmail, newPhone, initial, color){  
    let detailsContact = document.getElementById('boxOfDetailsContacts');
    // detailsContact.classList.toggle('d-none');
    detailsContact.innerHTML ='';
    detailsContact.innerHTML =  /*html*/`
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
            <p class="contantInformation">Contant Information</p>
            <p style="font-weight: 600;">Email</p>
            <a href="#" class="mailContact">${newEmail}</a>
            <p style="font-weight: 600;">Phone</p>
            <p>${newPhone}</p>
        </div>`;
}


function addNewContactBtn(){
    document.getElementById('boxOfAddingNewContact').classList.toggle('d-none');
    document.getElementById('boxOfAddingNewContact').innerHTML = /*html*/`
        <div>
            <div class="boxOfAddingNewContact">
                <div class="blueBoxAddContact">
                <img src="../assets/img/capa1.svg" class="imgBlueBox">
                    <h1 class="h1AddContact">Add Contact</h1>
                    <p class="pAddContact">Tasks are better with a team!</p>
                </div>
                <img src="../assets/img/close.svg" class="closeAddContactBox" onclick="closeAddContactBoxWithX()">
                <div class="witheBoxAddContact">
                    <div class="detailsOFAddContact">
                        <img src="../assets/img/head-663997_640.jpg" class="witheBoxAddContactImg">
                        <div class="displayFlex">
                            <input type="text" class="inputField" placeholder="Name" id="nameAddContact">
                            <img src="../assets/img/person.svg" class="imgInInput">
                        </div>
                        <div class="displayFlex">
                            <input type="text" class="inputField" placeholder="Email" id="emailAddContact">
                            <img src="../assets/img/mail.svg" class="imgInInput">
                        </div>
                        <div class="displayFlex">
                            <input type="text" class="inputField" placeholder="Phone" id="phoneAddContact">
                            <img src="../assets/img/call.svg" class="imgInInput">
                        </div>
                        <div class="btnsAddContact">
                            <button class="displayFlex btnCloseContact" onclick="closeAddContactWindow()">Close <img
                                    src="../assets/img/vector.svg" class="samllIconsContactX"></button>
                            <button class="displayFlex btnCreateContact" onclick="createNewContact()">Create contact
                                <img src="../assets/img/check.svg" class="samllIconsContactOK"></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
}


function closeAddContactWindow(){
    document.getElementById('boxOfAddingNewContact').classList.toggle('d-none');
}


function closeAddContactBoxWithX(){
    document.getElementById('boxOfAddingNewContact').classList.toggle('d-none');
}


async function editContact(newName, newEmail, newPhone, initial, color){
    document.getElementById('boxOfEdingContact').classList.toggle('d-none');
    let valueBox = document.getElementById('boxOfEdingContact');
    valueBox.innerHTML = '';
    valueBox.innerHTML = /*html*/`
        <div class="boxOfEdingContact">
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
    document.getElementById('boxOfEdingContact').classList.toggle('d-none');
}


async function deleteContact(newName, newEmail, newPhone, initial, color) {
    // Push the contact info to the loggedInUser.contacts array.  die zeile soll verantworlich fürs löschen sein
    loggedInUser.contacts = loggedInUser.contacts.filter((contact) => {
        return (
            contact.name !== newName ||
            contact.email !== newEmail ||
            contact.phone !== newPhone ||
            contact.initial !== initial ||
            contact.color !== color 
        );
    });

    // Update the loggedInUser in the users array.
    const userIndex = users.findIndex(user => user.id === loggedInUser.id);
    users[userIndex].contacts = loggedInUser.contacts;

    await setItem('loggedInUser', JSON.stringify(loggedInUser));
    await generateContactInSmall();
    document.getElementById('boxOfDetailsContacts').classList.add('d-none');
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
        await generateContactInSmall(); // Wait for generateContactInSmall to complete
        document.getElementById('boxOfEdingContact').classList.add('d-none');
        document.getElementById('boxOfDetailsContacts').classList.add('d-none');
    } else {
        console.error('Kontakt nicht gefunden im loggedInUser.contacts Array');
    }
}


async function clearStorage() {
    const key = "newContactData";
    try {
        // Fetch the current data from the server
        const response = await getItem(key);
        const { data } = response;

        // Check if the response is successful and the value exists
        if (response.status === "success" && data && data.value) {
            // Delete the value
            delete data.value;

            // Upload the updated data to the server
            const updatedResponse = await setItem(key, data);
            console.log(updatedResponse); // Optionally, handle the response
        } else {
            console.log("Value not found or server response unsuccessful");
        }
    } catch (error) {
        console.error("Error occurred: ", error);
    }
    await generateContactInSmall();
}