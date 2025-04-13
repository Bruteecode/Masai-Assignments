    import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
    import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

    const firebaseConfig = {
      apiKey: "AIzaSyB57iX9Cc1hrvHKAjPe7Wp8wdlThFJhGoE",
      authDomain: "e-commerce-9bef9.firebaseapp.com",
      projectId: "e-commerce-9bef9",
      storageBucket: "e-commerce-9bef9.appspot.com",
      messagingSenderId: "142525809112",
      appId: "1:142525809112:web:a0dc78b9f2011caa9f32ad"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    function fetchProducts() {
      fetch("https://fakestoreapi.com/products")
        .then(res => res.json())
        .then(data => {
          const container = document.getElementById("products");
          container.innerHTML = "";
          data.forEach(product => {
            const div = document.createElement("div");
            div.className = "product";
            div.innerHTML = `
              <img src="${product.image}" alt="${product.title}" />
              <h4>${product.title}</h4>
              <p>Price: $${product.price}</p>
            `;
            container.appendChild(div);
          });
        });
    }

    function logout() {
      signOut(auth).then(() => {
        window.location.href = "login.html";
      });
    }

    onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchProducts();
      } else {
        window.location.href = "login.html";
      }
    });
