const express=require('express');
const PORT=3000;
const userRoute=require('./routes/userRoute');
const chatRoute=require('./routes/chatRoute');
const groupRoute=require('./routes/groupRoute');
const path=require('path');
const sequalize=require('./utils/database');
const bodyParser = require('body-parser');
const cors=require('cors');

const user=require('./model/userModel');
const chatMsg=require('./model/messageModel');
const ChatGroup=require('./model/chatGroupModel');
const UserChatGroup=require('./model/userChatGroupModel');

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
app.use(groupRoute);

chatMsg.belongsTo(user, { foreignKey: 'user_id' });
user.hasMany(chatMsg, { foreignKey: 'message_id' });

chatMsg.belongsTo(ChatGroup,{foreignKey:'group_id'});
ChatGroup.hasMany(chatMsg,{foreignKey:'message_id'});

user.belongsToMany(ChatGroup, { through: UserChatGroup, foreignKey: 'user_id', otherKey: 'group_id' });
ChatGroup.belongsToMany(user, { through: UserChatGroup, foreignKey: 'group_id', otherKey: 'user_id' });


sequalize.sync().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running on http://localhost:${PORT}`);
    });
});
