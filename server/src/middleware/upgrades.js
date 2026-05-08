const upgrades = (req, res, next) => {
    if (req.path == '/upgrades') {
        return next()
    }
    if (process.env.UPGRADES == true)
    {
        res.redirect('/upgrades')
    }
    next()
}

export default upgrades
