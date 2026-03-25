const upgrades = (req, res, next) => {
    if (req.path == '/upgrades') {
        return next()
    }
    if (process.env.UPGRADES == true)
    {
        res.redirect('http://staging.tabletopsupercrew.net/upgrades')
    }
    next()
}

export default upgrades
