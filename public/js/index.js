const win = window
var userId = null
/*const sheets = document.querySelector('#allSheets')
const errorsNode = document.querySelector('#errorMessages')
const sheetStatus = document.querySelector('#sheetStatus')*/

win.addEventListener('load', async (event) => {
    //Pull in currently existing player characters
    /*const allUrl = '/user/all'
    const allResp = await fetch(allUrl)
    const allData = await allResp.json()*/
    const allUrl = '/pics/all/'
    const allResp = await fetch(allUrl)
    const allData = await allResp.json()

    allData.forEach((data) => {
        /*const linkNode = document.createElement('a')
        linkNode.className = 'link_' + data.username
        linkNode.innerHTML = data.characterName
        linkNode.href = '/saldere/genericChar?' + data._id
        const breakNode = document.createElement('br')

        sheets.appendChild(linkNode)
        sheets.appendChild(breakNode)*/

        console.log('pics data:')
        console.log(data)
    })

})
