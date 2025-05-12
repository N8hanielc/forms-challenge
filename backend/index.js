const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/formdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const FormSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
});

const FormEntry = mongoose.model('FormEntry', FormSchema);

app.get('/api/entries', async (req, res) => {
  const entries = await FormEntry.find();
  res.json(entries);
});

app.post('/api/entries', async (req, res) => {
  const { name, email, phone } = req.body;
  const entry = new FormEntry({ name, email, phone });
  await entry.save();
  res.status(201).json(entry);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});