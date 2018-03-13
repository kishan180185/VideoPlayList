const express = require('express');
const app= express();
const bodyParser = require('body-parser');
const path = require('path')
app.use(express.static(path.join(__dirname,'dist')));

const api=require('./server/routes/api');

const port=3000;
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/api',api);
app.get('*',(req,res)=>{
    res.sendfile(path.join(__dirname,'dist/index.html'));
});

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})