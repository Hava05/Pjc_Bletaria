window.onload = () => {
    const form = document.querySelector('#form');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            Toastify({
                text: "Porosia është dërguar me sukses!",
                duration: 2000,
                position: "right",
                close: true,
            }).showToast();

            setTimeout(() => {
                form.reset();
            }, 1500)
        })
    }
}