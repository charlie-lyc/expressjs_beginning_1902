const moment = require('moment')


const logger = (req, res, next) => {
    // console.log('Logged...')
    ///////////////////////////
    console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.url} : ${moment().format()}`) // 'url' or 'originalUrl'
    next()
}

module.exports = logger