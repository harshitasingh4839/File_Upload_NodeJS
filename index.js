const express = require('express');
const multer = require('multer');// Package used for Uploading files 
const path = require('path');

// Creating a server
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
// Setting up middleware for handling URL-encoded form data
app.use(express.urlencoded({ extended: false }));

// Uploading the file in 'uploads' folder and renaming the file using the date and time the file was uploaded
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
});


const upload = multer({ storage: storage })

app.get('/', (req, res) => {
    res.render(path.join(__dirname, '/views/index.ejs'));
});

app.post('/upload', upload.single('Upload'), (req, res) => {
    console.log(req.file);
    res.redirect('/');
});

app.listen(8080, () => {
    console.log('server started');
});