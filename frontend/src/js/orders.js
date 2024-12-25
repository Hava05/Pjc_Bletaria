import { jwtDecode } from 'https://cdn.jsdelivr.net/npm/jwt-decode@4.0.0/+esm';

window.onload = () => {
    const token = localStorage.getItem('token');
    const loggedInNav = document.querySelector('#logged-in-nav');
    const loggedInNavImage = document.querySelector('#logged-in-nav img');
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

    window.onclick = (event) => {
        if (event.target !== dropdown && event.target !== loggedInNavImage) {
            dropdown.classList.add('hide');
        }
    };

    const API_URL = 'http://localhost/Pjc_Bletaria/backend/api/';

    const fetchData = () => {
        fetch(API_URL + 'fetch_orders.php', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    Toastify({
                        text: 'Gabim! ju lutem provoni persei!',
                        duration: 2000,
                        position: 'right',
                        close: true,
                    }).showToast();
                }
                return response.json();
            })
            .then((response) => {
                if (response && response.success) {
                    const data = response.data;

                    populateTable(data);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const populateTable = (data) => {
        const tableBody = document.querySelector('#dataTable tbody');

        tableBody.innerHTML = '';

        data.forEach((row) => {
            const tr = document.createElement('tr');

            for (let key in row) {
                const td = document.createElement('td');

                td.textContent =
                    key === 'type' ? getTextFromType(row[key]) : row[key];

                tr.appendChild(td);
            }

            tableBody.appendChild(tr);
        });
    };

    const getTextFromType = (type) => {
        switch (type) {
            case '0':
                return 'MJALT';
            case '1':
                return 'VOJSHTIN';
        }
    };

    fetchData();

    const form = document.querySelector('#form');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);

            fetch(API_URL + 'register.php', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            })
                .then((response) => {
                    if (!response.ok) {
                        Toastify({
                            text: 'Gabim! ju lutem provoni persei!',
                            duration: 2000,
                            position: 'right',
                            close: true,
                        }).showToast();
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data && data.success) {
                        Toastify({
                            text: 'Regjistrimi u krye me sukses!',
                            duration: 2000,
                            position: 'right',
                            close: true,
                        }).showToast();

                        form.clear();
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        });
    }
};
