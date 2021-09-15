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
      fs.appendFile('./bills/bills.txt', '\n'+bill.name + '---'+req.body['bill-description'], function (err) {
        if (err) {
          res.send({
            status: false,
            message: 'Failed to save bill',
          });
        }
      })
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
    bills = bills.filter(file => file.endsWith('.JPG'));
    let bill_descriptions = await fs.readFile('./bills/bills.txt')
    let desc_list = bill_descriptions.toString().split('\n')
    let data =[]
    bills.forEach((file => {
      let bill_dict = {
        'url': '/bills/'+file,
        description: desc_list.filter(desc => desc.toString().startsWith(file)).map(desc => desc.split('---')[1])[0],
      };
      data.push(bill_dict);
    }))
    res.json({ 
      bills: data,
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