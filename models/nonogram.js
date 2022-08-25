const mongoose = require('mongoose')

const nonogramSchema = new mongoose.Schema({
    title: String,
    description: String,
    clues: {
        horizontal: [[Number]],
        vertical: [[Number]]
    }
})

nonogramSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Nonogram', nonogramSchema)