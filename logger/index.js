const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(cors());

const PORT_NO = 3000;
const LOG_FILENAME = 'test-log.json';

app.post('/', (req, res) => {
  logData(req.body, () => res.send(true));
});

app.listen(PORT_NO, () => {
  console.log(`App running at http://localhost/${PORT_NO}`);
});

const loggedData = [];

function logData(data, cb) {
  console.log(data);
  loggedData.push(data);
  fs.writeFile(LOG_FILENAME, JSON.stringify(loggedData), cb);
}

