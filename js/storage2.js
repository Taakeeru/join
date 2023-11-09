const STORAGE_TOKEN = 'QPHAFGT1Q3UF7KK0TZX16MUQNR784P9PTG8ZWE09';
const STORAGE_URL= 'https://remote-storage.developerakademie.org/item';


async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json());
}


async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        // Verbesserter code
        if (res.data) { 
            return res.data.value;
        } throw `Could not find data with key "${key}".`;
    });
}


async function removeItem(key) {
    // const key = key;
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
}


// async function removeItem(key) {
//     const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
//     const existingData = await fetch(url).then(res => res.json());

//     if (existingData.success) {
//         return fetch(url, { method: 'DELETE' })
//             .then(res => res.json())
//             .then(res => {
//                 if (res.success) {
//                     console.log(`Item with key "${key}" removed successfully.`);
//                 } else {
//                     throw `Failed to remove item with key "${key}".`;
//                 }
//             });
//     } else {
//         console.log(`Item with key "${key}" not found.`);
//     }
// }