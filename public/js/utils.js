const setToteItem = (item) => {
    localStorage.setItem('totePics', JSON.stringify(item))
}

const getToteItems = () => {
    return JSON.parse(localStorage.getItem('totePics'))
}
