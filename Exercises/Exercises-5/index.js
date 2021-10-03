const express = require('express')
const app = express()
const port = 3000
const passport = require('passport')
const BasicStrategy = require('passport-http').BasicStrategy;

app.use(express.json())
app.use(express.urlencoded({ extended:true}))

let userDb = []


passport.use(new BasicStrategy(
    (username, password, done) => {
        console.log('Basic strategy params, username ' + username + ' , password ' + password)


        //search userDb for matches
        const searchResult = userDb.find(user => ((username === user.username) && (password === user.password)))
        if(searchResult != undefined) {
            done(null, searchResult);
        }
        else{
            done(null, false);
        }
        
    }
))

app.get('/', (req, res) => {
    res.send('Welcome')
})

app.get('/protectedResource', passport.authenticate('basic', {session:false}), (req, res) => {
    res.send('Succesfully accessed resource')
})

/* Next route will receive this data structure
    {
        "username": "foo",
        "password": "bar",
        "email": "foo@bar.com"
    }
*/

app.post('/signup', (req, res)=>{
    const newUser = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
    }

    userDb.push(newUser)
    res.sendStatus(201)
})

app.listen(port, () => {
    console.log(`listening on port at http://localhost:${port}`)
})