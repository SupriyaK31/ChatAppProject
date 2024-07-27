const express=require('express');
const PORT=3000;
const userRoute=require('./routes/userRoute');
const path=require('path');
const sequalize=require('./utils/database');
const bodyParser = require('body-parser');

const app=express();


// Serve static files from the  directory
app.use(express.static(path.join(__dirname,'views')));
app.use(express.json());
app.use(bodyParser.json());
// For parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(userRoute);


sequalize.sync().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running on http://localhost:${PORT}`);
    });
});
