window.onload = () => {
    const form = document.querySelector('#form');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);

            // fetch('http://localhost/Pjc_Bletaria/backend/api/add_order.php', {
            //     method: 'POST',
            //     body: formData,
            // })
            //     .then((response) => response.json())
            //     .then((data) => {
            //         if (data && data.success) {
            //             Toastify({
            //                 text: 'Porosia është dërguar me sukses!',
            //                 duration: 2000,
            //                 position: 'right',
            //                 close: true,
            //             }).showToast();

            //             form.reset();
            //         }
            //     })
            //     .catch((error) => {
            //         Toastify({
            //             text: 'Gabim! ju lutem provoni persei!',
            //             duration: 2000,
            //             position: 'right',
            //             close: true,
            //         }).showToast();
            //     });

            fetch('http://localhost/Pjc_Bletaria/backend/api/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Tells the server we're sending JSON data
                },
                body: JSON.stringify({
                    email: 'havajusufi@gmail.com',
                    password: 'test1234',
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                })
                .catch((error) => {
                    console.log('error => ', error);

                    Toastify({
                        text: 'Gabim! ju lutem provoni persei!',
                        duration: 2000,
                        position: 'right',
                        close: true,
                    }).showToast();
                });
        });
    }
};
