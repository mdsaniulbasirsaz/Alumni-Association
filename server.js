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

  

// User Schema
const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true 
  },
  presentAddress: {
    type: String,
    required: true 
  },
  permanentAddress: {
    type: String,
    required: true 
  },
  passingYear: {
    type: String,
    required: true 
  },
  groupName: {
    type: String,
    required: true 
  },
  email: {
    type: String,
    required: true, 
    unique: true 
  },
  phone: {
    type: String,
    required: true 
  },
  currentJobName: {
    type: String
  },
  jobPosition: {
    type: String
  }
}, { timestamps: true }); 

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;


// Create User Endpoint
app.post('/create-user', async (req, res) => {
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

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).send('Error creating user: ' + error.message);
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