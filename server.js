const express = require('express');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "src" directory
app.use(express.static(path.join(__dirname,'src')));
//Serve static files from the "images" directory
app.use(express.static(path.join(__dirname, 'images')));


//Handle the root route
app.get('/',(req,res) =>{
        res.sendFile(path.join(__dirname,'src','index.html'));
});

//Handle the about route
app.get('/about',(req,res)=>
{
    res.sendFile(path.join(__dirname,'src','about.html'));
});

//Handle the memberinfo route
app.get('/memberinfo',(req,res)=>{
    res.sendFile(path.join(__dirname,'src','memberinfo.html'));
});

// Handle the registration route
app.get('/registration', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'registration.html'));
});

// Handle the contact route
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});




app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});