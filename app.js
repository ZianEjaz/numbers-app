const express = require('express')
const xlsxFile = require('read-excel-file/node');
const bodyParcer = require('body-parser');
const app = express()

const port = 3000

app.use(express.urlencoded({
  extended: true
}))
app.use(express.static(__dirname + '/public'));


xlsxFile('./dummy.xlsx').then((rows) => {

//get requests

  app.get('/', (req, res) => {
    res.render("home.ejs");
  });
  app.get('/addDataBefore',(req,res)=>{
    res.render("text before.ejs");
  })
  app.get('/addDataAfter',(req,res)=>{
    res.render("text after.ejs");
  })
  app.get('/sortContacts',(req,res)=>{
    res.render("sort contacts.ejs");
  })

//post requests

app.post('/addDataBefore', (req, res) =>{
  const input = req.body.dataBefore;
  res.render("text before return.ejs", {numbers : rows, dataBefore : input });
})
app.post('/addDataAfter', (req, res) =>{
  const input = req.body.dataAfter;
  res.render("text after return.ejs", {numbers : rows, dataAfter : input });
})
app.post('/sortContacts', (req, res) =>{
  const totalDigits = req.body.totalDigits;
  const firstDigit = req.body.firstDigit;
  res.render("sort contacts return.ejs ", {numbers : rows, totalDigits : totalDigits, firstDigit : firstDigit });
})


  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });

}) 