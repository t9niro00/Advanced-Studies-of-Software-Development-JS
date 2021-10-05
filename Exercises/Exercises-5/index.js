const express = require('express')
const app = express()
const port = 3000
const passport = require('passport')
const BasicStrategy = require('passport-http').BasicStrategy;
const bcrypt = require('bcryptjs')

app.use(express.json())
app.use(express.urlencoded({ extended:true}))

let userDb = []


passport.use(new BasicStrategy(
    (username, password, done) => {
        console.log('Basic strategy params, username ' + username + ' , password ' + password)


        //search userDb for matches in user and password

        
        const searchResult = userDb.find(user => {
            if(user.username === username) {
                if(bcrypt.compareSync(password, user.password)){
                    return true
                }
            }
            return false
        })

        if(searchResult != undefined) {
            done(null, searchResult); //succesful authentication
        }
        else{
            done(null, false); // no credentials found
        }
        
    }
))

app.get('/', (req, res) => {
    res.send('Welcome')
})

//this is protected resource with HTTP Basic

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

    console.log('Original password ' + req.body.password)
    const salt = bcrypt.genSaltSync(6)
    console.log('salt' + salt)
    const hashedPassword = bcrypt.hashSync(req.body.password, salt)
    console.log("Hashed password")
    console.log (hashedPassword)

    const newUser = {
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
    }
    userDb.push(newUser)  //store the new user in DB
    res.sendStatus(201)
})

// JWT implementation below //
const jwt = require('jsonwebtoken')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const jwtSecretKey = "mySecretKey"

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecretKey
}



passport.use(new JwtStrategy(options, (payload, done) => {
    //do something with the payload

    //pass the control to handler methods

    done(null, {})

}))

app.post('/login', passport.authenticate('basic', {session: false}), (req, res) => {

    // Create a JWT for the client
    const token = jwt.sign({foo: "bar"}, jwtSecretKey)


    // Send the JWT to the client

    res.json({token: token })

})

app.get('/jwtProtectedResource', passport.authenticate('jwt', {session: false}), (req, res) => {
    
    res.send('You succesfully accessed JWT protectede API resource')

})


app.listen(port, () => {
    console.log(`listening on port at http://localhost:${port}`)
})