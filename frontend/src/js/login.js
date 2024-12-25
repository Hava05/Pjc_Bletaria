window.onload = () => {
    const form = document.querySelector('#form');
    const token = localStorage.getItem('token');

    if (token) {
        window.history.back();
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);

            fetch('http://localhost/Pjc_Bletaria/backend/api/login.php', {
                method: 'POST',
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
                        localStorage.setItem('token', data.token);
                        window.location.href = 'home.html';
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        });
    }
};
