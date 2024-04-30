const express = require('express')
const cors = require('cors')

const app = express()
const port = 5000

app.use(cors())

const getMostAppearingWords = (text, num) => {
    const array = text.split(" ")
    const dict = {}
    array.forEach(word => {
        if (dict[word] == undefined)
            dict[word] = 1
        else
            dict[word] = dict[word] + 1
    });

    var items = Object.keys(dict).map(function (key) {
        return [key, dict[key]];
    });

    items.sort(function (first, second) {
        return second[1] - first[1];
    });

    return items.slice(0, num)
}
app.post('/mostAppear/', (req, res) => {
    const mostAppearanceData = getMostAppearingWords(req.headers.text, req.headers.number)
    const jsonData = mostAppearanceData.map(([word, appearance]) => ({ word, appearance }));

    res.send(jsonData)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})