window.onload = () => {
    const form = document.querySelector('#form');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);

            fetch('http://localhost/Pjc_Bletaria/backend/api/add_order.php', {
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
                        Toastify({
                            text: 'Porosia është dërguar me sukses!',
                            duration: 2000,
                            position: 'right',
                            close: true,
                        }).showToast();

                        form.reset();
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        });
    }
};
