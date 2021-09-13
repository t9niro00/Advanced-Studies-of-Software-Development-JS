const { v4: uuidv4 } = require('uuid')
const express = require('express')
const app = express()
const port = 3000


app.use(express.json())

function demoMiddleware(req, res, next) {
    console.log("hello this is demoMiddleware")
    next()
}

app.use((req, res, next) => {
    console.log("hello this is middleware 1!")
    next()
})

app.use((req, res, next) => {
    console.log("hello this is middleware 2!")
    next()
})

app.use((req, res, next) => {
    console.log("hello this is middleware 3!")
    next()
})




const cities = [
    { cityCode: "helsinki", cityName: 'Helsinki', temperature: "26.6"},
    { cityCode: "oulu", cityName: 'Oulu', temperature: "19.2"},
    { cityCode: "rovaniemi", cityName: 'Rovaniemi', temperature: "13.0"},
    { cityCode: "tampere", cityName: 'Tampere', temperature: "22.1"},
    { cityCode: "jyväskylä", cityName: 'Jyväskylä', temperature: "18.9"}
];

app.get('/weather', demoMiddleware, (req, res) => {
    res.json(cities)
    console.log("This is GET weather")
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
//Näytetään konsolissa mitä porttia kuunnellaan.
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})