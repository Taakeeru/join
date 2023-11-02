let allContacts = [];
let firstLetter = [];


function init(){
    // generateLatter();
}


function generateLatter(){
    let letter = document.getElementById('generateLatter');
    // letter.innerHTML = '';
    for (let i = 0; i < firstLetter.length; i++) {
        const letters = firstLetter[i];
        letter.innerHTML = /*html*/`
            <div class="positionLetterContact">
                <p class="letterContact" id="letterContact">${letters}</p>
            </div>
            <div class="positionLineContact">
                <p class="lineContact"></p>
            </div>`;
    }
}


function addNewContactBtn(){
    document.getElementById('boxOfAddingNewContact').classList.toggle('d-none');
    createNewContact();
}


/**
 * create new contact vlaues and push it to the localStorage
 */
function createNewContact(){
    const fullName = document.getElementById('nameAddContact').value;
    const email = document.getElementById('emailAddContact').value;
    const phone = document.getElementById('phoneAddContact').value;
    allContacts.push({
        "Neme": fullName,
        "Email": email,
        "Phone": phone
    });
    
    let stringOfJSON = JSON.stringify(allContacts);
    localStorage.setItem('fullContactInfo', stringOfJSON);
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