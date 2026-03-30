const year = document.querySelector('#year')

window.addEventListener('load', async (event) => {
    year.innerHTML = (new Date().getFullYear())
})
