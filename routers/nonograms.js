const nonogramsHelper = require('../utils/nonogramsHelper')
const Nonogram = require('../models/nonogram')

const nonogramsRouter = require('express').Router()

nonogramsRouter.post('/', async(request, response) => {
    const nonogram_data = request.body    
    const nonogram = await Nonogram.create({
        title: nonogram_data.title,
        description: nonogram_data.description,
        clues: nonogramsHelper.generatePuzzleClues(nonogram_data.bitmap)
    })
    response.json(nonogram)
})

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

nonogramsRouter.get('/:id', async(request, response) => {
    const nonogram = await Nonogram.findById(request.params.id)
    response.json(nonogram)
})

module.exports = nonogramsRouter