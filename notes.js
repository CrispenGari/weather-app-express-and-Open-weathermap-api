/*
A SIMPLE EXPRESS SEVER THAT WILL SEND MESSAGES TO THE 
BROWSER
*/

const express          = require('express');
const http             = require('http');
const host             = 'localhost' || '127.0.0.1';
const port             = process.env.PORT || 1234;
const app              = express();
app.get('/', (req, res)=>{
    res.send("<h1> Hello World</h1>");
    res.end();
})

// starting the server
const server           = app.listen(port, host, (err)=>{
    if(err){
       console.log("Error: " + err);
        return
    }
    var port_          = server.address().port;
    var host_          = server.address().address;
    console.log("The server is running on port: "+ port_);
    console.log(`URL: http://${host_}:${port_}/`);
})


//---------------------------------------

// using static files in express
// setting styles
app.use(express.static('public'))

//--------- HANDLING FORM DATA WITH EXPRESS [GET/POST]
const bodyParser       = require('body-parser');
// midware 
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res)=>{
    res.render('index');
})

app.post('/', (req, res)=>{
    res.render('index') // rerendering the file
    console.log(req.body.city_name)
})
//----------------------------- installing module request
$npm install request@^2.*