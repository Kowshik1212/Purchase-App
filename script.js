import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-5be5b-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const dataBase = getDatabase(app);
const itemsInDB = ref(dataBase);

const inputField = document.querySelector("input");
const addItem = document.querySelector("button");
const container = document.querySelector(".container");

addItem.addEventListener('click', function () {
    if (inputField.value) {
        let inputValue = inputField.value;
        inputField.value = "";
        let destinationLocation = ref(dataBase, "items/")
        push(destinationLocation, inputValue);
    }
})

onValue(itemsInDB, function (snapshot) {
    if (snapshot.exists()) {
        let items = Object.entries(snapshot.val().items);
        container.innerHTML = "";
        for (let i = 0; i < items.length; i++) {
            renderItems(items[i]);
        }
    } else {
        container.innerHTML = "";
    }
})

function renderItems(item) {
    let li_tag = document.createElement("li");
    li_tag.textContent = item[1];
    container.append(li_tag);
    li_tag.addEventListener('click', function () {
        let itemLocation = ref(dataBase, `items/${item[0]}`);
        remove(itemLocation);
    })
}
