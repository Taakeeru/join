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

    for (let i = 0; i < 5; i++) { // 1 beheben - eine Var muss statt 1 rein um die länge auszulesen
        const fullName = await getItem(`fullName`);
        const email = await getItem(`email`);
        let newName = fullName.data.value;
        let newEmail = email.data.value;
            contact.innerHTML += `
                <div class="sizeOfContactBox displayFlex" onclick="shwoDetailsOfContact(${i})">
                    <div>
                        <img src="/assets/img/head-663997_640.jpg" class="imgOfContackt">
                    </div>
                    <div>
                        <p style="margin: 6px;">${newName}</p>
                        <p class="styleMail">${newEmail}</p>
                    </div>
                </div>`;
    }
  }
  



  


function shwoDetailsOfContact(i){
    let detailsContact = document.getElementById('boxOfDetailsContacts');
    detailsContact.innerHTML = `
        <div class="positionHeaderContactDetails">
            <img src="/assets/img/ellipse5.svg" class="bigImgContacts">
            <div>
                <p class="nameHeaderContactDetails">${getItem(`fullName${i}`)}</p>
                <div class="positionEditAndDelete">
                    <button onclick="editContact()" class="displayFlex clearBtn"><img src="/assets/img/edit.svg"
                            style="margin-right: 8px;">Edit</button>
                    <button onclick="deleteContact()" class="displayFlex clearBtn"><img
                            src="/assets/img/delete.svg" style="margin-right: 8px">Delete</button>
                </div>
            </div>
        </div>
        <div>
            <p class="contantInformation">Contant Information</p>
            <p style="font-weight: 600;">Email</p>
            <a href="MaxMustermann@gmx.de" class="mailContact">${getItem(`email${i}`)}</a>
            <p style="font-weight: 600;">Phone</p>
            <p>${getItem(`phone`)[i]}</p>
        </div>`;
}


function addNewContactBtn(){
    document.getElementById('boxOfAddingNewContact').classList.toggle('d-none');
}


/**
 * create new contact vlaues and push it to the backendStorage
 */
function createNewContact(){
    const fullName = document.getElementById('nameAddContact');
    const email = document.getElementById('emailAddContact');
    const phone = document.getElementById('phoneAddContact');
    // let newContact = {
    //     'fullName': fullName.value.trim(),
    //     'email': email.value.trim(),
    //     'phone': phone.value.trim()
    // };

    // console.log(newContactData);
    // setItem('newContactData', newContact);

    // fullName.value = '';
    // email.value = '';
    // phone.value = '';


    setItem('fullName', fullName.value.trim());
    setItem('email', email.value.trim());
    setItem('phone', phone.value.trim());
    generateContactInSmall();
    fullName.value = '';
    email.value = '';
    phone.value = '';
}

function closeAddContactWindow(){
    document.getElementById('boxOfAddingNewContact').classList.toggle('d-none');
}


function closeAddContactBoxWithX(){
    document.getElementById('boxOfAddingNewContact').classList.toggle('d-none');
}


function editContact(){
    document.getElementById('boxOfEdingContact').classList.toggle('d-none');
}


function closeEditContactBox(){
    document.getElementById('boxOfEdingContact').classList.toggle('d-none');
}