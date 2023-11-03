const STORAGE_TOKEN = 'QPHAFGT1Q3UF7KK0TZX16MUQNR784P9PTG8ZWE09';
const STORAGE_URL= 'https://remote-storage.developerakademie.org/item';


async function setItem(key, value){
    const payload = { key, value, token: STORAGE_TOKEN};
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload)})
    .then(res => res.json());
}


async function getItem(key){
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json());
}