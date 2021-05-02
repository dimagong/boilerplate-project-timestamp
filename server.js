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


// start a task
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:date?', function(req, res){
  let dateUser = req.params
  let currentDate = dateUser.date
  let properStringFormat = Date.parse(currentDate);
  console.log('dateUser', dateUser)
  console.log('checkTime(dateUser.date)', checkTime(currentDate))
  
  if (checkTime(currentDate)){
    let formatDate = new Date(+currentDate)
    res.json({
    unix: +currentDate, 
    utc: formatDate.toUTCString()
    })
  }else if(properStringFormat){
    let date = new Date(currentDate);
    let unixDate = properStringFormat;
    let formatDate = date.toUTCString();
    res.json({
      unix: unixDate, 
        utc: formatDate
    })
  }else if(!dateUser.date){
    res.json({
      unix: Date.parse(new Date()), 
        utc: new Date()
    })
  }else{
    res.json({
    error : "Invalid Date"
    })
  }
  
})

let checkTime = function(data){
  if(data){
    let fitNumber=/^\d+$/;
let found = data.match(fitNumber);
return found;
  }

}
// end


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
