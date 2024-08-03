const express=require('express');
const PORT=3000;
const userRoute=require('./routes/userRoute');
const chatRoute=require('./routes/chatRoute');
const path=require('path');
const sequalize=require('./utils/database');
const bodyParser = require('body-parser');
const cors=require('cors');

const user=require('./model/userModel');
const chatMsg=require('./model/chatModel');
const Group=require('./model/chatGroupModel');
const { group } = require('console');
const { FORCE } = require('sequelize/lib/index-hints');

const app=express();

app.use(cors({
    origin:"*",
    credentials:true
}));


// Serve static files from the  directory
app.use(express.static(path.join(__dirname,'views')));
app.use(express.json());
app.use(bodyParser.json());
// For parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(userRoute);
app.use(chatRoute);

chatMsg.belongsTo(user, { foreignKey: 'userID' });
user.hasMany(chatMsg, { foreignKey: 'id' });



sequalize.sync().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running on http://localhost:${PORT}`);
    });
});
