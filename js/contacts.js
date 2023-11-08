let firstLetter = ['A'];
let newContactData = [];

async function init(){
    includeHTML();
    generateLatter();
    await generateContactInSmall();
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

    const response = await getItem(`newContactData`);
    const storedContacts = JSON.parse(response.data.value);

    for (const key in storedContacts) {
        let newName = storedContacts[key].fullName;
        let newEmail = storedContacts[key].email;
        let newPhone = storedContacts[key].phone;
        contact.innerHTML += `
        <div class="sizeOfContactBox displayFlex" onclick="showDetailsOfContact('${newPhone}', '${newEmail}', '${newName}')">
        <div>
                <img src="../assets/img/head-663997_640.jpg" class="imgOfContackt">
            </div>
            <div>
                <p style="margin: 6px;">${newName}</p>
                <p class="styleMail">${newEmail}</p>
            </div>
        </div>`;
    
    }
}


async function createNewContact() {
    const fullName = document.getElementById('nameAddContact');
    const email = document.getElementById('emailAddContact');
    const phone = document.getElementById('phoneAddContact');

    const existingDataResponse = await getItem('newContactData');
    const existingData = existingDataResponse.data.value ? JSON.parse(existingDataResponse.data.value) : {};
    const newContact = {
        fullName: fullName.value.trim(),
        email: email.value.trim(),
        phone: phone.value.trim()
    };

    // Überprüfen Sie, ob der Schlüssel bereits vorhanden ist, und fügen Sie ggf. den neuen Kontakt hinzu
    if (existingData) {
        // Überprüfen Sie, ob der neue Schlüssel bereits vorhanden ist
        if (existingData.hasOwnProperty(newContact.fullName)) {
            // Hier können Sie eine entsprechende Logik für den Fall implementieren, dass der Schlüssel bereits vorhanden ist
            // Zum Beispiel könnten Sie eine Warnung ausgeben oder eine andere Vorgehensweise wählen
        } else {
            existingData[newContact.fullName] = newContact;
        }
    } else {
        existingData[newContact.fullName] = newContact;
    }

    await setItem('newContactData', existingData);
    generateContactInSmall(existingData);

    fullName.value = '';
    email.value = '';
    phone.value = '';
}




/** --- erstmal ignorieren
 * create new contact vlaues and push it to the backendStorage
 */
// function createNewContact(){
//     const fullName = document.getElementById('nameAddContact');
//     const email = document.getElementById('emailAddContact');
//     const phone = document.getElementById('phoneAddContact');
//     let newContact = {
//         'fullName': fullName.value.trim(),
//         'email': email.value.trim(),
//         'phone': phone.value.trim()
//     };
//     setItem('newContactData', newContact);

//     fullName.value = '';
//     email.value = '';
//     phone.value = '';
//     generateContactInSmall();

//     // setItem('fullName', fullName.value.trim());
//     // setItem('email', email.value.trim());
//     // setItem('phone', phone.value.trim());
//     // generateContactInSmall();
//     // fullName.value = '';
//     // email.value = '';
//     // phone.value = '';
// }

  


function showDetailsOfContact(newPhone, newEmail, newName){  
    let detailsContact = document.getElementById('boxOfDetailsContacts');
    detailsContact.innerHTML ='';
    detailsContact.innerHTML = `
        <div class="positionHeaderContactDetails">
            <img src="../assets/img/ellipse5.svg" class="bigImgContacts">
            <div>
                <p class="nameHeaderContactDetails">${newName}</p>
                <div class="positionEditAndDelete">
                    <button onclick="editContact()" class="displayFlex clearBtn"><img src="../assets/img/edit.svg"
                            style="margin-right: 8px;">Edit</button>
                    <button onclick="deleteContact()" class="displayFlex clearBtn"><img
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
}


function closeAddContactWindow(){
    document.getElementById('boxOfAddingNewContact').classList.toggle('d-none');
}


function closeAddContactBoxWithX(){
    document.getElementById('boxOfAddingNewContact').classList.toggle('d-none');
}


async function editContact(){
    const response = await getItem(`newContactData`);
    const storedContacts = JSON.parse(response.data.value);
    let newName = storedContacts.fullName;
    let newEmail = storedContacts.email;
    let newPhone = storedContacts.phone;
    document.getElementById('boxOfEdingContact').classList.toggle('d-none');
    let valueBox = document.getElementById('boxOfEdingContact');
    valueBox.innerHTML = '';
    valueBox.innerHTML = `
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
                    <button class="displayFlex btnCloseContact" onclick="deleteEditContactWindow()">Delete</button>
                    <button class="displayFlex btnCreateContact" onclick="saveEditContactWindow()">Save <img
                            src="../assets/img/check.svg" class="samllIconsContactOK"></button>
                </div>
            </div>
        </div>`;
    setValueInIput(newPhone, newEmail, newName);
}


function setValueInIput(newPhone, newEmail, newName){
    document.getElementById('nameEditContact').value =`${newName}`;
    document.getElementById('emailEditContact').value =`${newEmail}`;
    document.getElementById('phoneEditContact').value =`${newPhone}`;
}

function closeEditContactBox(){
    document.getElementById('boxOfEdingContact').classList.toggle('d-none');
}