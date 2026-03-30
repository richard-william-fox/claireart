const tosCheck = document.querySelector('#tosCheck')
const tosButton = document.querySelector('#tosButton')

window.addEventListener('load', (event) => {
    tosButton.disabled = true
})

tosCheck.addEventListener('change', (event) => {
    if (event.srcElement.checked) {
        tosButton.disabled = false
    } else {
        tosButton.disabled = true
    }
})

tosButton.addEventListener('click', async () => {
    const url = 'tosAgreement'

    let resp = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({'tos': true})
    })

    if (resp.status == 200) {
        //window.location.href = "/"
    }
})
