import { jwtDecode } from 'https://cdn.jsdelivr.net/npm/jwt-decode@4.0.0/+esm';

window.onload = () => {
    const token = localStorage.getItem('token');
    const loggedInNav = document.querySelector('#logged-in-nav');
    const loginNav = document.querySelector('#login-nav');
    const dropdown = document.querySelector('.dropdown');
    const logout = document.querySelector('#logout-button');
    const nameContainer = document.querySelector('#name-container');
    const orders = document.querySelector('#orders');

    if (token) {
        const decoded = jwtDecode(token);

        if (nameContainer) {
            nameContainer.innerHTML = `${decoded.firstname} ${decoded.lastname}`;
        }

        if (loggedInNav) {
            loggedInNav.classList.remove('hide');
        }

        if (orders) {
            orders.classList.remove('hide');
        }

        if (loginNav) {
            loginNav.classList.add('hide');
        }
    } else {
        if (loggedInNav) {
            loggedInNav.classList.add('hide');
        }

        if (orders) {
            orders.classList.add('hide');
        }

        if (loginNav) {
            loginNav.classList.remove('hide');
        }
    }

    if (loggedInNav) {
        loggedInNav.addEventListener('click', () => {
            if (dropdown) {
                dropdown.classList.toggle('hide');
            }
        });
    }

    if (logout) {
        logout.addEventListener('click', () => {
            localStorage.removeItem('token');
            window.location.reload();
        });
    }
};
