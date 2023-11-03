let allContacts = [];
let firstLetter = ['A'];


function init(){
    includeHTML();
    generateLatter();
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
    generateContactInSmall(); 
}

async function generateContactInSmall(){
    let contact = document.getElementById('contactInSmall');
    contact.innerHTML = ''; 
    for (let i = 0; i < getItem.length; i++) {
        const fullName = await getItem(`fullName${i}`);
        const email = await getItem(`email${i}`);
        contact.innerHTML += `
            <div class="sizeOfContactBox displayFlex" onclick="shwoDetailsOfContact()">
                <div>
                    <img src="/assets/img/head-663997_640.jpg" class="imgOfContackt">
                </div>
                <div>
                    <p style="margin: 6px;">${fullName}</p>
                    <p class="styleMail">${email}</p>
                </div>
            </div>`;
    }
}



function addNewContactBtn(){
    document.getElementById('boxOfAddingNewContact').classList.toggle('d-none');
}


/**
 * create new contact vlaues and push it to the backendStorage
 */
function createNewContact(){
    const fullName = document.getElementById('nameAddContact').value;
    const email = document.getElementById('emailAddContact').value;
    const phone = document.getElementById('phoneAddContact').value;
    setItem('fullName', fullName);
    setItem('email', email);
    setItem('phone', phone);
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