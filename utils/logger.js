const info = (...params) => {
    if (process.env.NODE_ENV !== 'test') {
        console.log(...params)
    }
}

const error = (...params) => {
    if (process.env.NODE_ENV !== 'test') {
        console.error(...params)
    }
}

const warning = (...params) => {
    if (process.env.NODE_ENV !== 'test') {
        console.warn(...params)
    }
}

module.exports = {
    info, error, warning
}