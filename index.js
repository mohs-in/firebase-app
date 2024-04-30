import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: 'https://fir-app-1a7e9-default-rtdb.europe-west1.firebasedatabase.app/'
}

const app = initializeApp(appSettings)

const database = getDatabase(app)

const itemsInCart = ref(database, 'items')

let shoppingList = document.getElementById('shopping-list');
const inputEl = document.getElementById('input-field');
const btnEl = document.getElementById("add-button");

btnEl.addEventListener('click', () => {
    let inputValue = inputEl.value;
    push(itemsInCart, inputValue);
    
    console.log(`${inputValue} added to database`);

    clearInputField();
})

onValue(itemsInCart, function(snapshot) {
    if(snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val());

        clearShoppingList();
        
        for(let i=0; i< itemsArray.length; i++) {
            let currentItem = itemsArray[i];
            appendToShoppingList(currentItem)
        }
    } else {
        shoppingList.innerHTML = `Add items to display...`
    }
})

function appendToShoppingList(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `items/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
    
    shoppingList.append(newEl)
}

function clearShoppingList() {
    shoppingList.innerHTML = '';
}

function clearInputField() {
    inputEl.value = '';
}