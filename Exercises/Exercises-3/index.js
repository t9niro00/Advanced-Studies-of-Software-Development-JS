const { v4: uuidv4 } = require('uuid')
const express = require('express')
const app = express()
const port = 3000


app.use(express.json())


const cities = [
    { cityCode: "helsinki", cityName: 'Helsinki', temperature: "26.6"},
    { cityCode: "oulu", cityName: 'Oulu', temperature: "19.2"},
    { cityCode: "rovaniemi", cityName: 'Rovaniemi', temperature: "13.0"},
    { cityCode: "tampere", cityName: 'Tampere', temperature: "22.1"},
    { cityCode: "jyväskylä", cityName: 'Jyväskylä', temperature: "18.9"}
];

app.get('/weather', (req, res) => {
    res.json(cities)
})

app.get('/weather/:cityCode', (req, res) => {
    const city = cities.find(d => d.cityCode === req.params.cityCode)
    if(city === undefined)
    {
        res.sendStatus(404)
    } 
    else
    {
        res.json(city)
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})