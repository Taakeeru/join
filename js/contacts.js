let firstLetter = ['A'];
let contactName = [];
let newContactDatas = [];


async function init(){
    includeHTML();
    loggedInUser = await getLoggedInUser();
    showProfileInitials(loggedInUser);
    generateContactInSmall();
    // await generateLatter();
    loadUsers();
    await loadSavedThingFromStorage();
}

async function loadSavedThingFromStorage(){
    let test = await loadContacts();
    generateContactInSmall(test);
}


async function loadContacts(){
    try {
        let currentContacts = JSON.parse(await getItem('newContactData'));
        return currentContacts;
    } catch(e) {
        console.error('Loading error:', e);
    }
}


async function generateLatter(){
    let letter = document.getElementById('generateLatter');
    letter.innerHTML = '';
    let response = await getItem('newContactData');
    let storedContacts = JSON.parse(response);
    for (const key in storedContacts) {
        let newName = storedContacts[key].fullName;
        let splitName = newName.split(' ');
        let sortedNames = splitName.sort();
        letter.innerHTML += `
            <div class="positionLetterContact">
                <p class="letterContact" id="letterContact">${sortedNames}</p>
            </div>
            <div class="positionLineContact">
                <p class="lineContact"></p>
            </div>`;
    } 
}


function generateContactInSmall(test) {
    let contact = document.getElementById('contactInSmall');
    contact.innerHTML = '';

    // let response = await getItem('newContactData');
    // let storedContacts = JSON.parse(response);
    // contact.innerHTML = `<p class="styleMail">${storedContacts}</p>`;
    for (let i = 0; i < test.length; i++) {
        let newName = test[i].fullName;
        // let sortedNames = newName.split(' ').sort((a, b) => a.charAt(0).toLowerCase().localeCompare(b.charAt(0).toLowerCase()));
        let newEmail = test[i].email;
        let newPhone = test[i].phone;
        contact.innerHTML += /*html*/`
            <div class="sizeOfContactBox displayFlex" onclick="showDetailsOfContact('${newPhone}', '${newEmail}', '${newName}')">
                <div>
                    <img src="../assets/img/head-663997_640.jpg" class="imgOfContackt">
                </div>
                <div>
                    <p style="margin: 6px;">${newName}</p>
                    <p class="styleMail">${newEmail}</p>
                </div>
            </div>`;
        contactName.push(newName);
    }
}




async function createNewContact() {
    const fullName = document.getElementById('nameAddContact');
    const email = document.getElementById('emailAddContact');
    const phone = document.getElementById('phoneAddContact');

    const newContact = {
        fullName: fullName.value,
        email: email.value,
        phone: phone.value
    };

    let contactExists = newContactDatas.some(c =>
        c.fullName === fullName.value || c.email === email.value || c.phone === phone.value
    );

    if (!contactExists) {
        newContactDatas.push(newContact);
        await setItem('newContactData', JSON.stringify(newContactDatas));
        generateContactInSmall();
    }else{
        alert('This contact is allready exist!');
    }

    fullName.value = '';
    email.value = '';
    phone.value = '';
    document.getElementById('boxOfAddingNewContact').classList.toggle('d-none');
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
    let response = await getItem('newContactData');
    let storedContacts = JSON.parse(response);

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
        
        try {
            let key = "newContactData";
            let token = "QPHAFGT1Q3UF7KK0TZX16MUQNR784P9PTG8ZWE09";
            // Remove the key from local storage
            localStorage.removeItem(key);
    
            // Delete the token
            delete localStorage.token;
    
            // Generate a new contact
            await generateContactInSmall();
        } catch (error) {
            console.error("Error occurred: ", error);
        }
    }
    



