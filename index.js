import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: 'https://fir-app-1a7e9-default-rtdb.europe-west1.firebasedatabase.app/'
}

const app = initializeApp(appSettings)

const database = getDatabase(app)

const itemsInCart = ref(database, 'items')

let shopList = document.getElementById('shopping-list');
const inputEl = document.getElementById('input-field');
const btnEl = document.getElementById("add-button");

btnEl.addEventListener('click', () => {
    let inputValue = inputEl.value;
    push(itemsInCart, inputValue);
    
    appendToList(inputValue);
    console.log(`${inputValue} added to database`);

    clearInputField();
})

onValue(itemsInCart, function(snapshot) {
    let itemsArray = Object.values(snapshot.val())
    for(let i=0; i< itemsArray.length; i++) {
        appendToList(itemsArray[i])
    }
})

function appendToList(item) {
    shopList.innerHTML += `<li>${item}</li>`
}

function clearInputField() {
    inputEl.value = '';
}