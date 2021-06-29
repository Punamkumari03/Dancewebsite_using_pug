const express = require("express");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', { useNewUrlParser: true, useUnifiedTopology: true });

const path = require("path");
const bodyparser = require("body-parser")

const app = express();
const port = 80;

//define mongoose scheme
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});
const contact = mongoose.model('contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {

    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res) => {

    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res) => {

  var myData = new contact(req.body);
  myData.save().then(()=>{
      res.send("This data has been saved to the database")
  }).catch(()=>{
      res.status(400).send("Item was not saved to te database")
  });

    // res.status(200).render('contact.pug');
})



// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});