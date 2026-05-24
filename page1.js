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

function validateContact(contact) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!contact.name.trim() || !contact.email.trim() || !contact.message.trim()) {
    showToast("Plotësoni të gjitha fushat e detyrueshme.", "error");
    return false;
  }
  if (!emailRegex.test(contact.email)) {
    showToast("Email-i nuk është në format të saktë.", "error");
    return false;
  }
  return true;
}

window.onload = () => {
  const contactForm = document.querySelector(".contact-form");
  const statusMessage = document.getElementById("contact-status");
  const loginLink = document.getElementById("login-link");
  const signOutButton = document.getElementById("sign-out-button");
  const orderNowButton = document.getElementById("order-now-button");

  const setUnauthenticatedState = () => {
    if (statusMessage) {
      statusMessage.textContent = "Ju duhet të hyni për të dërguar mesazh.";
    }
    if (loginLink) {
      loginLink.style.display = "inline-block";
    }
    if (signOutButton) {
      signOutButton.style.display = "none";
    }
    if (contactForm) {
      contactForm.querySelectorAll("input, textarea, button[type='submit']").forEach(el => el.disabled = true);
    }
  };

  const setAuthenticatedState = (email) => {
    if (statusMessage) {
      statusMessage.textContent = `Jeni të identifikuar si ${email}.`; 
    }
    if (loginLink) {
      loginLink.style.display = "none";
    }
    if (signOutButton) {
      signOutButton.style.display = "inline-block";
    }
    if (contactForm) {
      contactForm.querySelectorAll("input, textarea, button[type='submit']").forEach(el => el.disabled = false);
    }
  };

  onAuthStateChanged(auth, (user) => {
    console.log("Auth state changed:", user ? user.email : "null");
    if (user) {
      setAuthenticatedState(user.email || "përdorues");
    } else {
      setUnauthenticatedState();
    }
  });

  // Kontroll shtesë pas 1 sekondi për rastet kur onAuthStateChanged nuk ekzekutohet menjëherë
  setTimeout(() => {
    console.log("Timeout check, currentUser:", auth.currentUser ? auth.currentUser.email : "null");
    if (auth.currentUser) {
      setAuthenticatedState(auth.currentUser.email || "përdorues");
    } else {
      setUnauthenticatedState();
    }
  }, 1000);

  if (orderNowButton) {
    orderNowButton.addEventListener("click", () => {
      console.log("Order now clicked, currentUser:", auth.currentUser ? auth.currentUser.email : "null");
      if (auth.currentUser) {
        window.location.href = "page2.html";
      } else {
        window.location.href = "login.html";
      }
    });
  }

  if (signOutButton) {
    signOutButton.addEventListener("click", async () => {
      try {
        await signOut(auth);
        showToast("U shkëputët nga llogaria.", "success");
      } catch (error) {
        console.error(error);
        showToast("Gabim gjatë daljes. Provoni përsëri.", "error");
      }
    });
  }

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      console.log("Submit clicked, currentUser:", auth.currentUser ? auth.currentUser.email : "null");
      if (!auth.currentUser) {
        showToast("Duhet të hyni për të dërguar mesazh.", "error");
        window.location.href = "login.html";
        return;
      }

      const inputs = contactForm.querySelectorAll(".form-input");
      const contact = {
        name: inputs[0].value.trim(),
        email: inputs[1].value.trim(),
        message: inputs[2].value.trim(),
        createdAt: new Date()
      };

      if (!validateContact(contact)) {
        return;
      }

      try {
        await addDoc(collection(db, "contacts"), contact);
        showToast("Mesazhi u dërgua në Firebase ✅", "success");
        contactForm.reset();
      } catch (error) {
        console.error(error);
        showToast("Gabim gjatë dërgimit. Provoni përsëri.", "error");
      }
    });
  }
};
