const palindrome = (string) => {
    return string
    .split('')
    .reverse()
    .join('')
}

const average = (Array)=> {
    const reducer =(sum, item)=> {
        return sum + item
    }
    return array.reduce(reducer, 0) / array.length
}

module.exports = {
    palindrome,
    average,
}