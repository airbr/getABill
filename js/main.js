

require('dotenv').config();

const express = require('express');
const request = require('request');
const path = require('path');
const port = 3000;
const app = express();

app.use(express.static('../'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
})

app.get('/bill', (req, res) => {
    request(
        { url: 'https://api.congress.gov/v3/bill?format=json&api_key='+ process.env.KEYSTOCONGRESS },
        (error, response, body) => {
          if (error || response.statusCode !== 200) {
            return res.status(500).json({ type: 'error', message: err.message });
          }        
          res.json(JSON.parse(body));
        // console.log(JSON.parse(body));
        }
      )
});

app.get('/summary/:congress/:type/:number', (req, res) => {
    request(
        { url: 'https://api.congress.gov/v3/bill/'+ req.params.congress + '/'+ req.params.type + '/'+ req.params.number + '/summaries?format=json&api_key='+process.env.KEYSTOCONGRESS },
        (error, response, body) => {
          if (error || response.statusCode !== 200) {
            return res.status(500).json({ type: 'error', message: err.message });
          }        
          res.json(JSON.parse(body));
        // console.log(JSON.parse(body));
        }
    )
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


    // fetch('https://api.congress.gov/v3/bill?format=json&api_key=bIGjQxkSIlNgX00498tiancQd2mJAEgs4rSaC8DB', {
    //     method: 'GET',
    //     headers: {
    //       'accept': 'application/xml',
    //       'Access-Control-Allow-Origin': 'https://api.congress.gov/'
    //     }
    //   })
    // .then(
    //     (response) => response.json())
    // .then((data) => console.log(data));



