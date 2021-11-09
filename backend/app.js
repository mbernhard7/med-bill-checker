const fs = require('fs');
const path = require('path');
const multer = require('multer');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const imgModel = require('./bill.model');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.use(morgan('combined'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'bills')
  },
  filename: (req, file, cb) => {
    cb(null, path.parse(file.originalname).name + '-' + Date.now() + path.parse(file.originalname).ext)
  }
});

const upload = multer({ storage: storage });

app.get('/readBills', (req, res) => {
  imgModel.find({}, (err, items) => {
    if (err) {
      console.log(err);
      res.status(500).send('An error occurred'+err);
    }
    else {
      res.send(items);
    }
  });
});

app.post('/createBill', upload.single('image'), async (req, res, next) => {
  let obj = {
    name: req.body.name,
    desc: req.body.desc,
    img: {
      data: fs.readFileSync(path.join(__dirname + '/bills/' + req.file.filename)),
      contentType: 'image/'+path.extname(req.file.filename).replace('.','')
    }
  }
  try {
    const item = await imgModel.create(obj);
    const bill = await item.save();
    const id = bill._id.toString();
    fs.unlinkSync(path.join(__dirname + '/bills/' + req.file.filename));
    console.log('successfully deleted /tmp/hello');
    res.send({
      status: true,
      message: 'File is uploaded',
      data: {
        id: id,
      }
    });
  } catch (e) {
    console.log('Error saving image: '+e);
    res.status(500).send('An error occurred'+e);
  }
});

app.delete('/deleteBill/:id',(req,res) => {
  imgModel.deleteOne({ _id: req.params.id }, function (err) {
    if(err) {
      console.log(err);
      res.status(500).send('An error occurred'+err);
    } else {
      console.log("Successful deletion");
      res.status(200).send('Succesfully deleted.');
    }
  });
});

const uri = process.env.DATABASE_URL;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
  if (err) {
    throw err;
  }
  console.log('Connected to database...')
});

const port = 3001
app.listen(
  port,
  () => console.log(`App listening at http://localhost:${port}...`)
);