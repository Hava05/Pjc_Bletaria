import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ADD YOUR FIREBASE CONFIG HERE
const firebaseConfig = {
    apiKey: "your_api_key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your_project_id",
    storageBucket: "your_storage_bucket",
    messagingSenderId: "123456789",
    appId: "your_app_id"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function showToast(message, type = "info") {
    const backgroundColor = type === "success" ? "#28a745" : type === "error" ? "#dc3545" : "#f4b41a";
    Toastify({
        text: message,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor,
    }).showToast();
}

function validateOrder(order) {
    const phoneRegex = /^[0-9\+\s\-]{6,20}$/;
    if (!order.name || !order.surname || !order.address || !order.product) {
        showToast("Plotësoni të gjitha fushat e detyrueshme.", "error");
        return false;
    }
    if (!phoneRegex.test(order.phone)) {
        showToast("Numri i telefonit nuk është në format të saktë.", "error");
        return false;
    }
    if (!Number.isInteger(order.quantity) || order.quantity <= 0) {
        showToast("Sasia duhet të jetë një numër pozitiv.", "error");
        return false;
    }
    return true;
}

window.onload = () => {
    const userEmail = document.getElementById("user-email");
    const signOutButton = document.getElementById("sign-out-button");
    const form = document.querySelector('#form');

    onAuthStateChanged(auth, (user) => {
        if (!user) {
            window.location.href = "login.html";
            return;
        }

        if (userEmail) {
            userEmail.textContent = user.email;
        }
    });

    if (signOutButton) {
        signOutButton.addEventListener("click", async () => {
            try {
                await signOut(auth);
                window.location.href = "login.html";
            } catch (error) {
                console.error(error);
                showToast("Gabim gjatë daljes. Provoni përsëri.", "error");
            }
        });
    }

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log("Order submit, currentUser:", auth.currentUser ? auth.currentUser.email : "null");
            if (!auth.currentUser) {
                showToast("Duhet të jeni autentifikuar.", "error");
                window.location.href = "login.html";
                return;
            }
            const inputs = form.querySelectorAll('input');
            const order = {
                name: inputs[0].value.trim(),
                surname: inputs[1].value.trim(),
                address: inputs[2].value.trim(),
                phone: inputs[3].value.trim(),
                product: inputs[4].value.trim(),
                quantity: Number(inputs[5].value.trim()),
                createdAt: new Date(),
                userId: auth.currentUser.uid
            };

            if (!validateOrder(order)) {
                return;
            }

            try {
                await addDoc(collection(db, "orders"), order);
                showToast("Porosia u ruajt në Firebase ✅", "success");
                setTimeout(() => {
                    window.location.href = "page1.html";
                }, 2000);
                form.reset();
            } catch (error) {
                console.error(error);
                showToast("Gabim në ruajtje ❌", "error");
            }
        });
    }
};
