
const express = require("express");
const fs = require('fs');
const app = express();

//*****************************************************/
//*******************ROUTAGE***************************/


app.get('/api/hello', function(req, res) {
    res.json({ result: 'ok'})
});

app.post('/api/writeFile/:fileName', function(req, res) {
    fs.writeFile(":fileName.txt", "Hello here", function(err) {
        if(err) {
            return console.log(err)
        }
    
    });
});

app.get('*', function (req, res) {
    res.send('Hello World')
});
/******************************************************/

app.listen(8000);
