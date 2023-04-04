require('dotenv').config();
const express = require("express");
const { body, validationResult } = require('express-validator');
const { multerUpload } = require('./middleware/multer');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require('./routes');
const { transporter } = require('./helper/transporter');

app.use('/api', routes)

app.post('/register', body('email').isEmail(), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) res.status(400).json({ errors: errors.array() });
})

app.post('/single-upload', multerUpload.single('file'), (req, res) => {
  let fileUploaded = req.file;
  console.log(fileUploaded);
  res.status(200).json({
    status: 'ok',
    message: 'sucessfully uploaded'
  });
})

app.post('/multiple-upload', multerUpload.array('file', 3), (req, res) => {
  let fileUploaded = req.files;
  console.log(fileUploaded);
  res.status(200).json({
    status: 'ok',
    message: 'sucessfully uploaded'
  });
})

app.post('/send-email', async (req, res) => {
  try {
    await transporter.sendMail({
      from: 'mdanangpriambodo@gmail.com',
      to: 'temansejatiweb@gmail.com',
      subject: 'Activate account',
      html: '<h1>Welcome at Purwadhika Digital School</h1>'
    });
    res.send('Success');
  } catch (err) {
    console.log(err);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}...`);
});

// let products = [{mon
//   id: 1,
//   name: "nasi goreng",
//   price: 15000
// }, {
//   id: 2,
//   name: "bakso",
//   price: 20000
// }]

// const users = [{
//   id: 1,
//   email: "danang@mail.com",
//   username: "mcdanang",
//   password: "Danang!@34",
//   api_key: "AFJGT-SGDHJ-LWAKD-AKJDN-SADNL",
//   secret_key: "akdnlakfnlaknwdadm83yhu29dhk328p9hcnbobaldh"
// }]

//params
// app.get("/api/:id?/:name?", (req, res) => {
//   console.log("GET using params", req.params);
//   res.json({
//     status: 'ok',
//     data: products
//   })
// });

// query
// app.get("/api", (req, res) => {
//   console.log("GET using query", req.query);
//   console.log(req.headers);
//   res.status(200).json({
//     status: 'ok',
//     data: users
//   })
// });