const nonogramsHelper = require('../utils/nonogramsHelper')
const Nonogram = require('../models/nonogram')
const logger = require('../utils/logger')
const config = require('../utils/config')

const bcrypt = require('bcrypt')

const nonogramsRouter = require('express').Router()

const checkCode = async code => {    
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(config.CODE, saltRounds)
    
    const auth = await bcrypt.compare(code, passwordHash)
    return auth
}

nonogramsRouter.get('/summary', async(request, response) => {
    const nonograms = await Nonogram.find({})
    response.json(nonograms.map(non => ({
        title: non.title,
        description: non.description,
        size: {
            width: non.clues.vertical.length,
            height: non.clues.horizontal.length
        },
        id: non._id
    }))).status(202).end()
})

nonogramsRouter.post('/check', async (request, response) => {
    response.status(auth ? 200 : 403).end()
})

nonogramsRouter.get('/:id', async(request, response) => {
    const nonogram = await Nonogram.findById(request.params.id)
    response.json(nonogram)
})

nonogramsRouter.post('/bitmap', async(request, response) => {

    const { code, nonogram_data } = request.body

    const auth = await checkCode(code)
    !auth && response.status(403).end()
    
    const nonogram = await Nonogram.create({
        title: nonogram_data.title,
        description: nonogram_data.description,
        clues: nonogramsHelper.generatePuzzleClues(nonogram_data.bitmap)
    })
    response.json(nonogram)
})

nonogramsRouter.post('/clues', async(request, response) => {

    const { code, nonogram_data } = request.body

    const auth = await checkCode(code)
    !auth && response.status(403).end()
    
    const nonogram = await Nonogram.create({
        title: nonogram_data.title,
        description: nonogram_data.description,
        clues: nonogram_data.clues
    })
    response.json(nonogram)
})

module.exports = nonogramsRouter