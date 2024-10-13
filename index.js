const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files (CSS, JS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Load the HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint to handle button creation and saving data
app.post('/addButton', (req, res) => {
    const { buttonText, savedString } = req.body;

    // Create the button HTML dynamically
    const buttonHTML = `<button onclick="saveData('${savedString}')">${buttonText}</button>`;

    // Append the button HTML to the buttons.txt file
    fs.appendFile('buttons.txt', buttonHTML + '\n', (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error occurred while saving the button.');
        } else {
            console.log('Button saved successfully!');
            res.status(200).send('Button saved successfully!');
        }
    });
});

// Function to save data to a log file
function saveData(data) {
    const currentDate = new Date().toISOString();
    const logData = `${currentDate}: ${data}\n`;
    fs.appendFile('log.txt', logData, (err) => {
        if (err) {
            console.error('Error occurred while saving data:', err);
        } else {
            console.log('Data saved successfully!');
        }
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



// const express = require('express');
// const fs = require('fs');
// const app = express();
// const PORT = 3000;

// // Middleware to parse JSON body
// app.use(express.json());

// // Serve static files
// app.use(express.static('public'));

// // Define route to handle button clicks
// app.post('/save', (req, res) => {
  // const { buttonName, data } = req.body;
  // const dateTime = new Date().toISOString();
  // const log = `${dateTime}: Button "${buttonName}" clicked, Data: ${data}\n`;

  // // Append the log to a file
  // fs.appendFile('button_logs.txt', log, (err) => {
    // if (err) {
      // console.error('Error appending to log file:', err);
      // res.status(500).send('Error saving data');
    // } else {
      // console.log('Data saved successfully');
      // res.send('Data saved successfully');
    // }
  // });
// });

// app.listen(PORT, () => {
  // console.log(`Server is running on http://localhost:${PORT}`);
// });


