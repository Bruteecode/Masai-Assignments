import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyB57iX9Cc1hrvHKAjPe7Wp8wdlThFJhGoE",
    authDomain: "e-commerce-9bef9.firebaseapp.com",
    projectId: "e-commerce-9bef9",
    storageBucket: "e-commerce-9bef9.firebasestorage.app",
    messagingSenderId: "142525809112",
    appId: "1:142525809112:web:a0dc78b9f2011caa9f32ad",
    measurementId: "G-25GMSLR38R"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const addProductBtn = document.getElementById("addProductBtn");

addProductBtn.addEventListener("click", () => {
    const title = prompt("Enter product title:");
    const price = prompt("Enter product price:");
    const image = prompt("Enter product image URL:");

    const newProductRef = ref(db, 'products/' + Date.now());
    set(newProductRef, {
        title: title,
        price: price,
        image: image
    }).then(() => {
        alert("Product added!");
    }).catch((error) => {
        alert(error.message);
    });
});

get(ref(db, 'products')).then((snapshot) => {
    const products = snapshot.val();
    const productsList = document.getElementById("productsList");
    for (const key in products) {
        const product = products[key];
        const productDiv = document.createElement("div");
        productDiv.innerHTML = `<h3>${product.title}</h3><p>${product.price}</p><img src="${product.image}" alt="${product.title}"/>`;
        productsList.appendChild(productDiv);
    }
});