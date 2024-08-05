const express = require('express');
const path = require('path');
const multer = require('multer');
const bodyParser = require('body-parser');


const mongoose = require('mongoose');
const { Agent } = require('http');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://saniulsaz:12345@roktodin.abnxvco.mongodb.net/Alumni-Association',{
    useNewUrlParser: true,
    useUnifiedTopology: true
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
  fullName: String,
  presentAddress: String,
  permanentAddress: String,
  passingYear: String,
  groupName: String,
  email: String,
  phone: String,
  currentJobName: String,
  jobPosition: String
}, { timestamps: true });

const UserModel = mongoose.model('users', UserSchema);



// Create User Endpoint
app.post('/create-user', async (req, res) => {
  const { fullName, presentAddress, permanentAddress, passingYear, groupName, email, phone, currentJobName, jobPosition } = req.body;

  try {
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
      res.status(201).json({ success: true, message: 'User created successfully!' });
  } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ success: false, message: 'An error occurred while creating the user' });
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



// Define the Event schema
const eventSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true,
  },
  date: {
      type: String, 
      required: true,
  },
  registrationStart: {
      type: String, 
      required: true,
  },
  registrationEnd: {
      type: String, 
      required: true,
  },
  imageUrl: {
      type: String,
      default: 'others/events-img.png', 
  },
  
});

// Create a model from the schema
const Event = mongoose.model('events', eventSchema);
module.exports = Event;

// Route to handle POST request for creating a new event
app.post('/events', (req, res) => {
  const { name, date, registrationStart, registrationEnd, imageUrl } = req.body;

  const newEvent = new Event({
      name,
      date,
      registrationStart,
      registrationEnd,
      imageUrl
  });

  newEvent.save()
      .then(event => res.status(201).json(event))
      .catch(err => res.status(400).json({ error: err.message }));
});
// Retrieve all events
app.get('/event', (req, res) => {
  Event.find()
    .then(events => res.status(200).json(events))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});