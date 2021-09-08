const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');

const fs = require('fs').promises;

const app = express()

const port = 3000

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use('/bills',express.static('./bills'));

app.post('/upload-bill', async (req, res) => {
  try {
    if(!req.files) {
      res.send({
        status: false,
        message: 'No file uploaded',
      });
    } else {
      let bill = req.files.bill;
      bill.mv('./bills/'+bill.name);

      res.send({
        status: true,
        message: 'File is uploaded',
        data: {
          name: bill.name,
          mimetype: bill.mimetype,
          size: bill.size,
        }
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/get-bills', async (req, res) => {
  try{
    let bills = await fs.readdir('./bills/');
    bills = bills.map(file => '/bills/'+file);
    res.json({ 
      bills,
      error: false
    }); 
  } catch (err) {
    res.status(500);
    res.json({
      bills: null,
      error: true,
      errorMsg: err,
    })
  }
});

app.listen(
  port, 
  () => console.log(`app listening at http://localhost:${port}`)
);