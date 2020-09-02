// installing request [npm install request@^2.*]
const express          = require('express');
const app              = express();
const http             = require('http').createServer(app);
const request          = require('request');
const host             = 'localhost' || '127.0.0.1';
const port             = process.env.PORT || 1234;
const io               = require('socket.io')(http);
const bodyParser       = require('body-parser');
const { urlencoded }   = require('body-parser');

// setting a template engine
app.set('view engine', 'ejs');
/*
EJS is accessed by default in the views directory. So we
must create a folder called views which will contain our ejs
file.
*/
// setting styles
app.use(express.static('public'))
// using a midware body-parser
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res)=>{
    res.render('index');
})
app.post('/', (req, res)=>{
    var city_name               = req.body.city_name;
    const apiKey                = 'dfa4a29b137df2f74b874084df368e93';
    var units                   = 'imperial' || 'degrees';
    var url                     = `http://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=${units}&appid=${apiKey}`
    request(url, (err, res, body)=>{
        if(err){
            io.emit('error', {weather: null, error: " Error Please Try again "});
        }else{
            var weather         = JSON.parse(body);
            if(weather.main == undefined){
                io.emit('error', {weather: null, error: " Error Please Try again "});
            }else{
                io.emit("data", weather);
            }
        }
    })
    res.render('index'); // rerender the index.ejs to avoid
})

// starting the server*/
const server           = http.listen(port, host, (err)=>{
    if(err){
       console.log("Error: " + err);
        return
    }
    var port_          = server.address().port;
    var host_          = server.address().address;
    console.log("The server is running on port: "+ port_);
    console.log(`URL: http://${host_}:${port_}/`);
})
