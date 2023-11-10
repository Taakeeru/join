let firstLetter = ['A'];
let newContactData = [];



async function init() {
    includeHTML();
    generateLatter();
    loggedInUser = await getLoggedInUser();
    showProfileInitials(loggedInUser);
    loadUsers();
}


async function init() {
    includeHTML();
    generateLatter();
    loggedInUser = await getLoggedInUser();
    showProfileInitials(loggedInUser);
    await generateContactInSmall();
    loadUsers();
}


async function addContactToUserContacts(loggedInUser, name, email, phone) {

    pushContactInfo(loggedInUser.contacts, name, email, phone);
    
    const userIndex = users.findIndex(user => user.id === loggedInUser.id);

    if (userIndex !== -1) {
        pushContactInfo(users[userIndex].contacts, name, email, phone);

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

    await addContactToUserContacts(loggedInUser, name.value, email.value, phone.value);
    resetForm(name, email, phone);
}


function pushContactInfo(contacts, name, email, phone) {
    contacts.push({
        name: name,
        email: email,
        phone: phone
    });
}


function resetForm(name, email, phone) {
    name.value = '';
    email.value = '';
    phone.value = '';
    document.getElementById('boxOfAddingNewContact').classList.toggle('d-none');
}


function generateLatter(){
    let letter = document.getElementById('generateLatter');
    letter.innerHTML = '';
    for (let i = 0; i < firstLetter.length; i++) {
        const letters = firstLetter[i];
        letter.innerHTML += `
            <div class="positionLetterContact">
                <p class="letterContact" id="letterContact">${letters}</p>
            </div>
            <div class="positionLineContact">
                <p class="lineContact"></p>
            </div>`;
    } 
}


async function generateContactInSmall() {
    let contact = document.getElementById('contactInSmall');
    contact.innerHTML = '';

    let loggedInUser = await getLoggedInUser() || { contacts: [] };

    for (let i = 0; i < loggedInUser.contacts.length; i++) {
        let contactData = loggedInUser.contacts[i];

        contact.innerHTML += /*html*/`
            <div class="sizeOfContactBox displayFlex" onclick="showDetailsOfContact('${contactData.name}', '${contactData.email}', '${contactData.phone}')">
                <div>
                    <img src="../assets/img/head-663997_640.jpg" class="imgOfContackt">
                </div>
                <div>
                    <p style="margin: 6px;">${contactData.name}</p>
                    <p class="styleMail">${contactData.email}</p>
                </div>
            </div>`;
    }
}

 
function showDetailsOfContact(newPhone, newEmail, newName){  
    let detailsContact = document.getElementById('boxOfDetailsContacts');
    detailsContact.classList.toggle('d-none');
    detailsContact.innerHTML ='';
    detailsContact.innerHTML =  /*html*/`
        <div class="positionHeaderContactDetails">
            <img src="../assets/img/ellipse5.svg" class="bigImgContacts">
            <div>
                <p class="nameHeaderContactDetails">${newName}</p>
                <div class="positionEditAndDelete">
                    <button onclick="editContact('${newName}','${newEmail}','${newPhone}')" class="displayFlex clearBtn"><img src="../assets/img/edit.svg"
                            style="margin-right: 8px;">Edit</button>
                    <button onclick="deleteContact('${newName}','${newEmail}','${newPhone}')" class="displayFlex clearBtn"><img
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


async function editContact(newName, newEmail, newPhone){
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
                    <img src="../assets/img/head-663997_640.jpg" class="witheBoxAddContactImg">
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
                        <button class="displayFlex btnCloseContact" onclick="deleteContact('${newName}','${newEmail}','${newPhone}')">Delete</button>
                        <button class="displayFlex btnCreateContact" onclick="saveEditContactWindow('${newName}','${newEmail}','${newPhone}')">Save <img
                                src="../assets/img/check.svg" class="samllIconsContactOK"></button>
                    </div>
                </div>
            </div>
        </div>`;
    setValueInIput(newPhone, newEmail, newName);
}


function setValueInIput(newName, newEmail, newPhone){
    document.getElementById('nameEditContact').value = newName;
    document.getElementById('emailEditContact').value = newEmail;
    document.getElementById('phoneEditContact').value = newPhone;
}


function closeEditContactBox(){
    document.getElementById('boxOfEdingContact').classList.toggle('d-none');
}


async function deleteContact(newName, newEmail, newPhone) {
    let response = await getItem('newContactData');
    let storedContacts = JSON.parse(response);

    for (const key in storedContacts) {
        if (storedContacts[key].fullName === newName &&
            storedContacts[key].email === newEmail &&
            storedContacts[key].phone === newPhone) {
            delete storedContacts[key];
            break;
        }
    }

    await setItem('newContactData', JSON.stringify(storedContacts));
    await generateContactInSmall();
    document.getElementById('boxOfDetailsContacts').classList.toggle('d-none');
    document.getElementById('boxOfEdingContact').classList.add('d-none');
}


async function saveEditContactWindow(newName, newEmail, newPhone) {
    const response = await getItem('newContactData');
    const storedContacts = JSON.parse(response.data.value);

    for (const key in storedContacts) {
        if (
            storedContacts[key].fullName === newName &&
            storedContacts[key].email === newEmail &&
            storedContacts[key].phone === newPhone
        ) {
            storedContacts[key].fullName = document.getElementById('nameEditContact').value.trim();
            storedContacts[key].email = document.getElementById('emailEditContact').value.trim();
            storedContacts[key].phone = document.getElementById('phoneEditContact').value.trim();
            break;
        }
    }

    await setItem('newContactData', JSON.stringify(storedContacts));
    await generateContactInSmall();
    document.getElementById('boxOfEdingContact').classList.add('d-none');
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