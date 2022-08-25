// converts a row into a lines sequence
const rowToClues = (row) => {
    let clues = []
    let last_was_empty = true

    for (let cell_index = 0; cell_index < row.length; cell_index++) {
        if (row[cell_index] === 1) {
            if (last_was_empty)
                clues.push(0)
            clues[clues.length - 1]++
            last_was_empty = false
        } else {
            last_was_empty = true
        }
    }

    return clues
}

// converts bit map into a list of clues
const generatePuzzleClues = (puzzle) => {
    const vertical = puzzle.map(column => rowToClues(column))
    const horizontal = Array.from({ length: puzzle[0].length }, (_, i) => rowToClues(puzzle.map(column => column[i])))

    return {
        horizontal,
        vertical
    }
}

module.exports = { generatePuzzleClues }