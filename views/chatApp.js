const URL='http://localhost:3000';

const token=localStorage.getItem('token');

// alert('table added sucessfully');
// setInterval(() => {
//     loadChat();
// }, 1000);

document.addEventListener('DOMContentLoaded',async()=>{    

     await getChatGroup();
    const token=localStorage.getItem('token');
    const decodeToken=parseJwt(token);

    console.log("Decode Token:"+Object.values(decodeToken));
    
});
async function createGroup(event){
    const group_name=document.getElementById('gname').value;
    await axios.post('/group',{group_name:group_name},{ headers:{"Authorization": token}}).then((res)=>console.log(res));
}
function logOut(event){
        event.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('chats');
        localStorage.removeItem('groups');
        window.location.href="/login";
}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}   

function pushMessage(e){
    e.preventDefault();
    const form=document.getElementById('ChatForm');
    const chatMsg=e.target.msgtext.value;
    const gid=e.target.gidText.value;
//  console.log(gid);
    const token=localStorage.getItem('token');
 
    axios.post(`${URL}/chat`,{
        message:chatMsg,
        group_id:gid},{ headers:{"Authorization": token}}).then(async(res)=>{
            form.reset();
            await openGroupChat(res.group_id);
    })
}


async function  loadChat(gid){
    let AllChatMsg="";
    let groupName ="";
    let lastMsgid,group_id=gid;
    const div=document.getElementById('Chat-container');
    const title=document.getElementById('groupTitle');
    const token=localStorage.getItem('token');
    const group=JSON.parse(localStorage.getItem('groups')) || [];
    group.forEach(async(groups)=>{
        if(groups.group_id==gid){
            groupName=groups.group_name;
        }else{
            groupName="";
        }
    })
   
    const chats=JSON.parse(localStorage.getItem('chats')) || [];
   
    chats.forEach(async(chat)=>{
        const dateTime = new Date(chat.createdAt);
        const options = { hour: '2-digit', minute: '2-digit', hour12: false };
        const time = dateTime.toLocaleTimeString('en-US',options);
        groupName=chat.Group.group_name;
        group_id=chat.Group.group_id;
        AllChatMsg +=`
        <table class="table">
        <tr>
        <td>
        <p class="bg-primary text-white rounded float-left p-2 mt-2 mr-5 shadow-sm ">${chat.user.username}: ${chat.message}</p>
        </td>
        <td><p class="p-1 mt-2 mr-3 shadow-sm"><small>${time}</small></p></td>
        </tr>
    </table>`;

    console.log(groupName)
    if (chat.id > lastMsgid) {
            lastMsgid = chat.id;
        }
        })
        title.innerHTML=`<h1 style="margin-left:20px">${groupName}</h1><button onclick="addNewMember(${group_id})"><img src="add.png" class="profile-image rounded-circle" data-toggle="modal" data-target="#addGroupMember"></button></img>`;
        div.innerHTML =AllChatMsg;  
}
async function addNewMember(group_id) {
    const g_id=group_id;
    const token = localStorage.getItem('token');
    const modalBody = document.getElementById('addGroupMemberBody');
    const modelfbtn=document.getElementById('modelfooter');
   try{
     const response =await axios.get(`${URL}/users/${group_id}`, { headers:{"Authorization": token}});
     let modalContent=`<form id="addMemberForm"><ul class="list-group ">`;
     let modelfooter="";
     if (response) {
        const users = response.data.user || [];

        users.forEach(user => {
            modalContent += `
            <li class="list-group-item">
                <input class="form-check-input" type="checkbox" value="${user.user_id}" id="user-${user.user_id}">
                <label class="form-check-label" class="form-control"  for="user-${user.user_id}">
                    ${user.username}
                </label>`;
        });
        modalContent += `</ul></form>`;
        modalBody.innerHTML = modalContent;
        modelfbtn.innerHTML=`<button type="button" class="btn btn-primary" onclick="handleAddMember(${group_id})">Add Selected Members</button>`
    } else {
        console.log("failled");
        modalBody.innerHTML = "<p>Failed to load users</p>";
    }
    } catch (error) {
        console.error('Error fetching users:', error);
        modalBody.innerHTML = "<p>An error occurred</p>";
    }

    // Show the modal (using Bootstrap)
    $('#addGroupMember').modal('show');
   }
async function handleAddMember(group_id) { 
    const token = localStorage.getItem('token');
    const selectedUsers = [];
    document.querySelectorAll('#addMemberForm input[type="checkbox"]:checked').forEach(checkbox=>{
        selectedUsers.push(checkbox.value);
    });

    try{
        const response=await axios.post(`${URL}/group/${group_id}/add-members`,
        { userIds : selectedUsers},{ headers:{"Authorization": token}});
        if(response){
            alert("Members added Sucessfully");
            $('#addGroupMember').modal('hide');
        }else{
            alert('Failed to add members');
        }

    }catch(error){
        console.error(error);
    }
}
async function getNewItem(gid) {
    let lastMsgid = -1;
    try{
        const chats=JSON.parse(localStorage.getItem('chats')) || [];
        //console.log("group id:",gid);
        chats.forEach(async(chat)=>{
        if (chat.message_id > lastMsgid) {
                lastMsgid = chat.id;
            }
            })
        const response=await axios.get(`${URL}/chat?lastmsgid=${lastMsgid}&group_id=${gid}`,{ headers:{"Authorization": token}});
            const newMsg=response.data.data;
            //  console.log("new msg:",newMsg);
            mergedMsg=[...chats,...newMsg];
            localStorage.setItem('chats',JSON.stringify(mergedMsg));

    }catch(error){
        console.error(error);
    }
    
}
async function getChatGroup() {
    try {
        const divGroup = document.getElementById('GroupName-Container');
        
        const result = await axios.get(`${URL}/group`, { headers: { "Authorization": token } });
        const groups = result.data.group || [];
        
        localStorage.setItem('groups', JSON.stringify(groups));

        divGroup.innerHTML = "";

        groups.forEach(group => {
            const table = document.createElement('table');
            table.className = "table table-hover";
            const tr = document.createElement('tr');
            const gname = document.createElement('td');
            gname.textContent = group.group_name;
            gname.addEventListener('click', function() {
                openGroupChat(group.group_id);
            });
            tr.appendChild(gname);
            table.appendChild(tr);
            divGroup.appendChild(table);
        });
    } catch (error) {
        console.error("Error fetching groups:", error);
    }
}

async function openGroupChat(gId) {
    localStorage.removeItem('chats');
     await getNewItem(gId);
     await loadChat(gId);
    const msgbox=document.getElementById('msgBox-container');
    let form=`<form id="ChatForm" method="post" onsubmit="pushMessage(event)">
                <div class="row my-2">
                <div class="col-sm-2 mt-2"><input type="text" class="form-control" name="gidText" id="gidText" value="${gId}" hidden></div>
                <div class="col-sm-8 mt-2 mb-2"><input type="text" class="form-control" name="msgtext" id="msgtext" placeholder="write Message" ></div>
                <div class="col-sm-2 mt-2 mb-2"><button class="btn btn-success" id="btnSend">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
  <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
</svg> send</button></div>
                </div>
                </form>`;
        msgbox.innerHTML=form;
}