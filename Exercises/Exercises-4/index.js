const express = require('express')
const multer = require('multer')
const upload = multer({dest: 'uploads/'})

const app = express()

app.post('/profile', upload.single('avatar'), function (req, res, next) {
    console.log(req.file);
    console.log(req.body);
    res.sendStatus(200);
})

app.post('/photos/upload', upload.array('photos', 4), function (req, res, next) {
    console.log(req.files);
    res.sendStatus(200);
})


const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1}, {name: 'gallery', maxCount: 8}])
app.post('cool-profile', cpUpload, function (req, res, next){
  
    

})


app.listen(3000, () => {
    console.log('Server started on port 3000')
})