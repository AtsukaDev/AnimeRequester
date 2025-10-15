
export function initializeApikey() {
    document.getElementById('closeApikey').addEventListener('click', () => {
        document.getElementById('formApikey').classList.toggle('hidden');
    });

    document.getElementById('apikeyOpen').addEventListener('click', () => {
        document.getElementById('formApikey').classList.toggle('hidden');
    })

    document.getElementById('validApikey').addEventListener('click', () => {
        document.getElementById('formApikey').classList.toggle('hidden');
        localStorage.setItem('api-key', document.getElementById('apikeyValue').value);
    })

    document.getElementById('formApikey').addEventListener("click", (e) => {

        if (e.target.id == "formApikey") {
            document.getElementById('formApikey').classList.toggle('hidden');
        }

    })

    document.getElementById('apikeyValue').addEventListener("keypress", (e) => {
        if (e.key == "Enter") {
            document.getElementById('formApikey').classList.toggle('hidden');
            localStorage.setItem('api-key', document.getElementById('apikeyValue').value);
        }
    })
}