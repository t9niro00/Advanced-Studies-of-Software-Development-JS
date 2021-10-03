const express = require('express');
const app = express();
const port = 4000;
var fs = require('fs');


app.use((req, res, next) => {
    let date = new Date();
    let output = `${date.toISOString()} - ${req.method} ${req.path} - ${req.ip} - ${req.get('User-Agent')} \r`;
    console.log(output);
    fs.appendFile('logs.txt', output, function(err) {
        if (err) throw err;
        console.log('Saved log file');
    });
next();
})

app.get('/test', (req, res) => {
    res.send('Hello');
})


const users = [
    {
        id: 2354,
        name: "Zayaan Camacho",
        email: "zayaan@demo.com"
      },
      {
        id: 6553,
        name: "Eliza McCullough",
        email: "eliza@demo.com"
      },
      {
        id: 3248,
        name: "Eloisa Wade",
        email: "eloise@demo.com"
      },
      {
        id: 8729,
        name: "Ptolemy Cervanter",
        email: "ptolemy@demo.com"
      },
];


function headerDemoMW(req, res, next)
{
    const userId = parseInt(req.get('user-id'));
    const userInfo = users.find(user => user.id === userId);
    req.userInfo = userInfo;
    next();
}


app.get('/header-demo', headerDemoMW, (req, res) => {
    const userInfo = req.userInfo;
    res.json(userInfo);
  });
  

  app.listen(port, () => {
    console.log(`Example API listening on http://localhost:${port}\n`);
});