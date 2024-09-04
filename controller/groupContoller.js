
const sequelize=require('../utils/database');

const group=require('../model/chatGroupModel');
const GroupMember=require('../model/userChatGroupModel');

const createGroup=async(req,res)=>{
    const transaction = await sequelize.transaction();
    try{
        
        const created_by = req.user.user_id;
        const group_name=req.body.group_name;
        if(!group_name){
            res.status(400).json({message:"Please enter group name"});
        }
        const createGroup=await group.create({group_name,created_by},  
             { transaction });

        const addMembership=await GroupMember.create({group_id:createGroup.group_id,user_id:created_by,role:'admin',invited_by:created_by},
            {transaction} );

            await transaction.commit();
            res.status(200).json({ message: "Successfully created group" });
    }catch(error){
        await transaction.rollback();
        console.error(error);
        res.status(500).json({message:"Internal server issue"});
    }
};

const getGrouplist=async(req,res)=>{
 try{
    const userid = req.user.user_id;
        // console.log("userids>>>>",userid)
    const groupMembers = await GroupMember.findAll({
        where: { user_id: userid },
        attributes:['group_id']
    });
//   console.log("groupMembers>>>",groupMembers)
    const groupIds = groupMembers.map(member => member.group_id);
    // console.log("gtroup ids->>>>",groupIds)

    const groups = await group.findAll({
        where: { group_id: groupIds },
        attributes: ['group_id', 'group_name']
    });
    res.status(200).json({group:groups});
 }catch(err){
    res.status(500).json({error:"internl server issue"})
 }
};
const memberList=async(req,res)=>{

 const invited_by=req.user.user_id;
 const {group_id}=req.params;
 const { userIds }=req.body;
 console.log("invited by:",invited_by);
 console.log("group id:",group_id)
 console.log("userids",userIds);
  if(!userIds || !Array.isArray(userIds)){

    return res.status(400).json({message:'Invalid userids'});
  }
  try{
    const groupmembers=userIds.map(user_id=>({
        user_id,
        group_id:group_id,
        invited_by:invited_by
    }));
    console.log(groupmembers);
    await GroupMember.bulkCreate(groupmembers);
    res.status(200).json({message:'Users added to group successfully'})
  }
  catch(error){
    console.error('Error adding members to group:', error);
    res.status(500).json({error:'Internal Server Issue'})
  }
};
module.exports={
    createGroup,
    getGrouplist,
    memberList
}