const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

let savedButtons = [];

app.get('/buttons', (req, res) => {
  res.json(savedButtons);
});

app.post('/buttons', (req, res) => {
  const { label, value } = req.body;
  savedButtons.push({ label, value, timestamp: new Date() });
  res.sendStatus(201);
});

/*
app.post('/save', (req, res) => {
  console.log('save');
});
*/

//define route to handle button clicks
app.post('/save', (req, res) => {
  const { buttonname, data } = req.body;
  console.log('save', req.body);
  const dateTime = new Date().toISOString();
  const log = `${dateTime}: button "${buttonname}" clicked, data: ${data}\n`;

  // Retrieve the current value from LocalStorage
  let existingValue = localStorage.getItem('key');

  // Check if the value exists; if not, initialize it as an empty string
  if (!existingValue) {
    existingValue = '';
  }

  // Append new text to the existing value
  let updatedValue = existingValue + log;

  // Save the updated value back to LocalStorage
  localStorage.setItem('key', updatedValue);

  // Log the new value (for debugging)
  console.log(localStorage.getItem('key'));


  localStorage.setItem('key', log);

  ////append the log to a file
  fs.appendFile('button_logs.txt', log, (err) => {
    if (err) {
      console.error('Error appending to log file:', err);
      res.status(500).send('Error saving data');
    } else {
      console.log('Data saved successfully');
      res.send('Data saved successfully');
    }
  });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
