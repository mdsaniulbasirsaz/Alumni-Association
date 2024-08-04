const express = require('express');
const path = require('path');
const multer = require('multer');
const bodyParser = require('body-parser');


const mongoose = require('mongoose');
const { Agent } = require('http');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://saniulcsejust:c7u8zL2odIXyS1px@saniul.e4hjgwh.mongodb.net/Alumni-Association',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


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


// Middleware for parsing JSON and handling form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());

  
//user info
const UserSchema = new mongoose.Schema({
  fullName: String,
  presentAddress: String,
  permanentAddress: String,
  passingYear: String,
  groupName: String,
  email: String,
  phone: String,
  currentJobName: String,
  jobPosition: String
});

  
  const UserModel = mongoose.model('users', UserSchema);

  app.post('/submit-form', async (req, res) => {
    try {
      const { fullName, presentAddress, permanentAddress, passingYear, groupName, email, phone, currentJobName, jobPosition } = req.body;
      
      const newUser = new UserModel({
        fullName,
        presentAddress,
        permanentAddress,
        passingYear,
        groupName,
        email,
        phone,
        currentJobName,
        jobPosition
      });
      
      await newUser.save();
      res.status(201).send('User data saved successfully!');
    } catch (error) {
      res.status(400).send('Error saving user data: ' + error.message);
    }
  });
  
  

app.get('/users', async (req, res) => {
    console.log("Received GET request on /users");

    try {
        const users = await UserModel.find();
        res.status(200).json(users); 
    } catch (error) {
        console.error("Error fetching users:", error.message); 
        res.status(500).send('Error fetching users: ' + error.message);
    }
});




app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});