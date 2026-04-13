const toteCount = document.querySelector('#toteCount')

const setToteItem = (item) => {
    localStorage.setItem('totePics', JSON.stringify(item))
}

const getToteItems = () => {
    return JSON.parse(localStorage.getItem('totePics'))
}

const setShippingInfo = (info) => {
    localStorage.setItem('shippingInfo', JSON.stringify(info))
}

const getShippingInfo = () => {
    return JSON.parse(localStorage.getItem('shippingInfo'))
}

window.addEventListener('load', () => {
    const path = window.location.pathname

    if (!path.includes('picsDetail') && !path.includes('viewTote') && !path.includes('checkout')) {
        let link = document.querySelector('#banner-' + path.slice(1))

        if (path == '/') {
            link = document.querySelector('#banner-home')
        }

        let children = document.querySelector('#navLinks').childNodes

        for (let child of children) {
            if (child.nodeName == 'A') {
                child.classList.remove('bg-gray-900')
            }
        }

        link.classList.add('bg-gray-900')
    }

    var count = 0
    var totePics = getToteItems()
    if (!totePics) {
        setToteItem([])
        count = 0
    } else {
        count = totePics.length
    }

    toteCount.innerHTML = 'View Tote: ' + count
})

/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
function displayMobileMenu(el) {
    el.classList.toggle('change')
    var Menu = document.querySelector('#Menu')
    if (Menu.style.display === 'none') {
        Menu.style.display = 'block'
    } else {
        Menu.style.display = 'none'
    }
}
