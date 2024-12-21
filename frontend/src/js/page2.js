window.onload = () => {
    const form = document.querySelector('#form');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);

            fetch('http://localhost/bletaria/backend/api/add_order.php', {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
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
                    Toastify({
                        text: 'Gabim! Porosija nuk osht bere me sukses! ju lutem provoni persei!',
                        duration: 2000,
                        position: 'right',
                        close: true,
                    }).showToast();
                });
        });
    }
};
