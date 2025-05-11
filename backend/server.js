
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://mongo:27017/formdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Person = mongoose.model('Person', {
  name: String,
  email: String,
  phone: String,
});

app.post('/api/people', async (req, res) => {
  const person = new Person(req.body);
  await person.save();
  res.send(person);
});

app.get('/api/people', async (req, res) => {
  const people = await Person.find();
  res.send(people);
});

app.listen(5000, () => console.log('Server running on port 5000'));
