const tos =  async (req, res, next) => {
    if (req.path == '/tos' || req.path.includes('/css') || req.path.includes('/js') || req.path.includes('uploads') || req.path.includes('/img')) {
        return next()
    }

    const tos = req.cookies.tosAgreement

    if (!tos) {
        return res.redirect('/tos') 
    }

    next()
}

export default tos
