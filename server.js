// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


//your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get('/api', (req,res)=>{
  const date = new Date();
  const unix = date.getTime();
  const utc = date.toUTCString();
  res.json({"unix":unix, "utc":utc});
});

app.get('/api/:date?', (req,res)=>{
  let date_string = req.params.date;
  // returns current date if empty date or white space parameter set
  if (/^\s*$/.test()){
    const date = new Date(date_string);
    const unix = date.getTime();
    const utc = date.toUTCString();
    return res.json({"unix":unix, "utc":utc});
  }
  if (isNaN(date_string)){
    const date = new Date(date_string);
    // checks if date is a valid date
    checkDate(date, res);
    

  }else{
      const date = new Date(Number(date_string));
      // checks if date is a valid date
      checkDate(date, res);
  }
});



// Date checker
function checkDate(date, res){
  if(isNaN(date)){
    return res.json({"error":"Invalid Date"});
  }
  unix = date.getTime();
  utc = date.toUTCString();
  return res.json({"unix":unix, "utc":utc});;
}







// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
